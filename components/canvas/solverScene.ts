import type { CanvasFrame, CanvasScene } from "@/lib/canvas";

/*
 * A deterministic re-enactment of the timetable solver: priority subjects are placed in the early
 * periods first, then the rest of the day, with four clashes that flash and get moved. The whole
 * sequence is computed once; the draw loop only reads from typed arrays.
 */

const PERIODS = 7;
const DESKTOP_SECTIONS = 12;
const MOBILE_SECTIONS = 8;
const MOBILE_BREAKPOINT_PX = 420;
const PRIORITY_PERIODS = 3;

const PLACE_STEP_MS = 36;
const DROP_MS = 240;
const CONFLICT_MS = 320;
const CONFLICT_COUNT = 4;
const DROP_DISTANCE_PX = 6;

const PRIORITY_SUBJECTS = ["MATH", "ENG", "SCI", "URDU"] as const;
const LATER_SUBJECTS = ["ISL", "COMP", "SST", "GAMES", "ART", "PHY", "BIO", "CHEM"] as const;
const SUBJECTS = [...PRIORITY_SUBJECTS, ...LATER_SUBJECTS] as const;
const SECTION_LABELS = [
  "6A",
  "6B",
  "7A",
  "7B",
  "8A",
  "8B",
  "9A",
  "9B",
  "10A",
  "10B",
  "11A",
  "11B"
] as const;
const PERIOD_LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7"] as const;

function subjectIndexAt(period: number, section: number) {
  // Priority subjects rotate through the first three periods; the rest use a stride that never repeats within a column.
  if (period < PRIORITY_PERIODS) {
    return (period + section) % PRIORITY_SUBJECTS.length;
  }

  return PRIORITY_SUBJECTS.length + ((period * 3 + section * 5) % LATER_SUBJECTS.length);
}

interface SolveTimeline {
  readonly sectionCount: number;
  readonly periods: Uint8Array;
  readonly sections: Uint8Array;
  readonly subjects: Uint8Array;
  /** Index of the clashing subject shown first, or 255 when the placement is clean. */
  readonly clashSubjects: Uint8Array;
  readonly startTimes: Float32Array;
  readonly duration: number;
}

function buildTimeline(sectionCount: number): SolveTimeline {
  const cells: { period: number; section: number; order: number }[] = [];

  for (let period = 0; period < PERIODS; period += 1) {
    for (let section = 0; section < sectionCount; section += 1) {
      const stage = period < PRIORITY_PERIODS ? 0 : 1;
      cells.push({
        period,
        section,
        order: stage * 1000 + ((period * 7 + section * 11) % 17) * 20 + section
      });
    }
  }

  cells.sort((first, second) => first.order - second.order);

  const count = cells.length;
  const periods = new Uint8Array(count);
  const sections = new Uint8Array(count);
  const subjects = new Uint8Array(count);
  const clashSubjects = new Uint8Array(count).fill(255);
  const startTimes = new Float32Array(count);
  const clashPositions = new Set(
    Array.from({ length: CONFLICT_COUNT }, (_, index) =>
      Math.floor(((index + 0.5) / CONFLICT_COUNT) * count)
    )
  );

  let time = 0;
  cells.forEach((cell, index) => {
    periods[index] = cell.period;
    sections[index] = cell.section;
    subjects[index] = subjectIndexAt(cell.period, cell.section);
    startTimes[index] = time;
    time += PLACE_STEP_MS;

    if (clashPositions.has(index)) {
      // The clash re-uses a subject already placed earlier in the same column: a double-booking.
      clashSubjects[index] = subjectIndexAt((cell.period + 1) % PERIODS, cell.section);
      time += CONFLICT_MS;
    }
  });

  return {
    sectionCount,
    periods,
    sections,
    subjects,
    clashSubjects,
    startTimes,
    duration: time + CONFLICT_MS + DROP_MS
  };
}

function easeOutExpo(progress: number) {
  return progress >= 1 ? 1 : 1 - 2 ** (-10 * progress);
}

export function createSolverScene(): CanvasScene {
  const desktopTimeline = buildTimeline(DESKTOP_SECTIONS);
  const mobileTimeline = buildTimeline(MOBILE_SECTIONS);
  let cachedWidth = -1;
  let labelFont = "";
  let headerFont = "";

  function render(frame: CanvasFrame, elapsed: number) {
    const { context, width, height, palette, fonts } = frame;
    const timeline = width < MOBILE_BREAKPOINT_PX ? mobileTimeline : desktopTimeline;
    const headerHeight = 22;
    const labelColumnWidth = 26;
    const cellWidth = (width - labelColumnWidth) / timeline.sectionCount;
    const cellHeight = (height - headerHeight) / PERIODS;

    // Font strings are rebuilt only when the size changes, keeping the loop allocation-free.
    if (cachedWidth !== width) {
      cachedWidth = width;
      const labelSize = Math.max(8, Math.min(11, cellWidth * 0.24, cellHeight * 0.3));
      labelFont = `500 ${labelSize.toFixed(1)}px ${fonts.mono}`;
      headerFont = `400 ${Math.max(8, labelSize - 1).toFixed(1)}px ${fonts.mono}`;
    }

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = headerFont;
    context.fillStyle = palette.muted;

    for (let section = 0; section < timeline.sectionCount; section += 1) {
      context.fillText(
        SECTION_LABELS[section],
        labelColumnWidth + (section + 0.5) * cellWidth,
        headerHeight / 2
      );
    }

    for (let period = 0; period < PERIODS; period += 1) {
      context.fillText(
        PERIOD_LABELS[period],
        labelColumnWidth / 2,
        headerHeight + (period + 0.5) * cellHeight
      );
    }

    // Grid as shared hairlines, offset half a pixel so 1px strokes stay crisp.
    context.strokeStyle = palette.ink;
    context.lineWidth = 1;
    context.beginPath();

    for (let section = 0; section <= timeline.sectionCount; section += 1) {
      const x = Math.round(labelColumnWidth + section * cellWidth) + 0.5;
      context.moveTo(x, headerHeight);
      context.lineTo(x, height - 0.5);
    }

    for (let period = 0; period <= PERIODS; period += 1) {
      const y = Math.round(headerHeight + period * cellHeight) + 0.5;
      context.moveTo(labelColumnWidth, y);
      context.lineTo(width - 0.5, y);
    }

    context.stroke();
    context.font = labelFont;

    for (let index = 0; index < timeline.periods.length; index += 1) {
      const startTime = timeline.startTimes[index];

      if (elapsed < startTime) {
        continue;
      }

      const cellX = labelColumnWidth + timeline.sections[index] * cellWidth;
      const cellY = headerHeight + timeline.periods[index] * cellHeight;
      const centerX = cellX + cellWidth / 2;
      const centerY = cellY + cellHeight / 2;
      const clashSubject = timeline.clashSubjects[index];
      let settleStart = startTime;

      if (clashSubject !== 255) {
        settleStart = startTime + CONFLICT_MS;

        if (elapsed < settleStart) {
          context.strokeStyle = palette.signal;
          context.lineWidth = 2;
          context.strokeRect(cellX + 2, cellY + 2, cellWidth - 4, cellHeight - 4);
          context.fillStyle = palette.signal;
          context.fillText(SUBJECTS[clashSubject], centerX, centerY);
          continue;
        }
      }

      const progress = easeOutExpo(Math.min((elapsed - settleStart) / DROP_MS, 1));
      context.globalAlpha = progress;
      context.fillStyle = palette.ink;
      context.fillText(
        SUBJECTS[timeline.subjects[index]],
        centerX,
        centerY - (1 - progress) * DROP_DISTANCE_PX
      );
      context.globalAlpha = 1;
    }

    return elapsed >= timeline.duration;
  }

  return {
    draw: (frame) => render(frame, frame.elapsed),
    drawFinal: (frame) => {
      render(frame, Number.POSITIVE_INFINITY);
    }
  };
}
