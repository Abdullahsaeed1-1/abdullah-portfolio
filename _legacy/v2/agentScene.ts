import type { CanvasFrame, CanvasScene } from "@/lib/canvas";
import { colorTokens } from "@/lib/tokens";

/*
 * The home hero: an agent core dispatching work to the tools Abdullah's agents actually call.
 * Each task flies out to a tool, the tool flashes as it runs, and the result flies back. A short
 * log in the corner names what just happened. Everything is preallocated; the loop allocates nothing.
 */

interface Station {
  readonly label: string;
  readonly ring: number;
  readonly baseAngle: number;
  readonly task: string;
}

const STATIONS: readonly Station[] = [
  { label: "Gmail", ring: 0, baseAngle: 0.2, task: "draft reply → approval gate" },
  { label: "Telegram", ring: 0, baseAngle: 2.3, task: "morning brief delivered" },
  { label: "Whisper", ring: 0, baseAngle: 4.3, task: "Roman Urdu transcribed" },
  { label: "OR-Tools", ring: 1, baseAngle: 1.0, task: "33 sections · 0 conflicts" },
  { label: "Calendar", ring: 1, baseAngle: 3.0, task: "external invite held for approval" },
  { label: "ElevenLabs", ring: 1, baseAngle: 5.0, task: "reply spoken · barge-in on" },
  { label: "Canva", ring: 2, baseAngle: 0.6, task: "post previewed, not published" },
  { label: "Playwright", ring: 2, baseAngle: 2.2, task: "browser task finished" },
  { label: "WhatsApp", ring: 2, baseAngle: 3.8, task: "message routed to Jarvis" },
  { label: "Drive", ring: 2, baseAngle: 5.3, task: "file filed in the right brand" }
];

// Fixed dispatch order so every visit tells the same story.
const DISPATCH_ORDER = [3, 0, 6, 2, 4, 9, 1, 7, 5, 8] as const;
const RING_SCALE = [0.22, 0.34, 0.47] as const;
const RING_SPEED = [0.00009, -0.00006, 0.00004] as const; // radians per ms
const RING_TILT = 0.62;

const SPAWN_EVERY_MS = 650;
const TRAVEL_MS = 900;
const WORK_MS = 380;
const TASK_LIFETIME_MS = TRAVEL_MS * 2 + WORK_MS;
const MAX_TASKS = 8;
const LOG_LINES = 3;
const TRAIL_STEPS = 14;
const DASH = [3, 6];
const NO_DASH: number[] = [];

function easeInOut(progress: number) {
  return progress < 0.5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2;
}

export function createAgentScene(): CanvasScene {
  const stationX = new Float32Array(STATIONS.length);
  const stationY = new Float32Array(STATIONS.length);
  let cachedWidth = -1;
  let labelFont = "";
  let coreFont = "";
  let logFont = "";

  function placeStations(elapsed: number, centerX: number, centerY: number, size: number) {
    for (let index = 0; index < STATIONS.length; index += 1) {
      const station = STATIONS[index];
      const angle = station.baseAngle + elapsed * RING_SPEED[station.ring];
      const radius = size * RING_SCALE[station.ring];
      stationX[index] = centerX + Math.cos(angle) * radius;
      stationY[index] = centerY + Math.sin(angle) * radius * RING_TILT;
    }
  }

  function taskColor(frame: CanvasFrame, taskNumber: number) {
    const cycle = taskNumber % 3;
    return cycle === 0
      ? frame.palette.signal
      : cycle === 1
        ? frame.palette.cobalt
        : frame.palette.acid;
  }

  // Point on the curved route between the core and a station; the control point bows the path.
  function routePoint(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    progress: number,
    axis: 0 | 1
  ) {
    const controlX = (fromX + toX) / 2 - (toY - fromY) * 0.35;
    const controlY = (fromY + toY) / 2 + (toX - fromX) * 0.35;
    const inverse = 1 - progress;
    return axis === 0
      ? inverse * inverse * fromX + 2 * inverse * progress * controlX + progress * progress * toX
      : inverse * inverse * fromY + 2 * inverse * progress * controlY + progress * progress * toY;
  }

  function drawTrail(
    context: CanvasRenderingContext2D,
    route: { fromX: number; fromY: number; toX: number; toY: number },
    startProgress: number,
    endProgress: number
  ) {
    context.beginPath();
    for (let step = 0; step <= TRAIL_STEPS; step += 1) {
      const progress = startProgress + ((endProgress - startProgress) * step) / TRAIL_STEPS;
      const x = routePoint(route.fromX, route.fromY, route.toX, route.toY, progress, 0);
      const y = routePoint(route.fromX, route.fromY, route.toX, route.toY, progress, 1);
      if (step === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.stroke();
  }

  // Reused for every trail so the loop never creates objects.
  const route = { fromX: 0, fromY: 0, toX: 0, toY: 0 };

  function render(frame: CanvasFrame, elapsed: number) {
    const { context, width, height, palette, fonts } = frame;
    // Narrow screens shrink the orbits so the outer labels stay inside the canvas.
    const size = Math.min(width * (width < 480 ? 0.8 : 1), height * 1.1);
    const centerX = width / 2;
    const centerY = height * 0.44;
    const coreRadius = size * 0.065;

    if (cachedWidth !== width) {
      cachedWidth = width;
      const labelSize = width < 420 ? 10 : 12;
      labelFont = `500 ${labelSize}px ${fonts.mono}`;
      coreFont = `700 ${Math.round(coreRadius * 0.42)}px ${fonts.display}`;
      logFont = `400 ${labelSize}px ${fonts.mono}`;
    }

    placeStations(elapsed, centerX, centerY, size);

    // Orbits.
    context.lineWidth = 1;
    context.strokeStyle = palette.line;
    for (let ring = 0; ring < RING_SCALE.length; ring += 1) {
      context.setLineDash(ring === RING_SCALE.length - 1 ? DASH : NO_DASH);
      context.beginPath();
      context.ellipse(
        centerX,
        centerY,
        size * RING_SCALE[ring],
        size * RING_SCALE[ring] * RING_TILT,
        0,
        0,
        Math.PI * 2
      );
      context.stroke();
    }
    context.setLineDash(NO_DASH);

    // Tasks: out to the tool, a pause while it works, then the result back to the core.
    const newestTask = Math.floor(elapsed / SPAWN_EVERY_MS);
    const oldestTask = Math.max(0, newestTask - MAX_TASKS + 1);

    for (let taskNumber = oldestTask; taskNumber <= newestTask; taskNumber += 1) {
      const age = elapsed - taskNumber * SPAWN_EVERY_MS;
      if (age < 0 || age > TASK_LIFETIME_MS) {
        continue;
      }

      const stationIndex = DISPATCH_ORDER[taskNumber % DISPATCH_ORDER.length];
      const color = taskColor(frame, taskNumber);
      const isReturning = age > TRAVEL_MS + WORK_MS;
      const progress = isReturning
        ? easeInOut(Math.min((age - TRAVEL_MS - WORK_MS) / TRAVEL_MS, 1))
        : easeInOut(Math.min(age / TRAVEL_MS, 1));

      route.fromX = isReturning ? stationX[stationIndex] : centerX;
      route.fromY = isReturning ? stationY[stationIndex] : centerY;
      route.toX = isReturning ? centerX : stationX[stationIndex];
      route.toY = isReturning ? centerY : stationY[stationIndex];

      context.strokeStyle = color;
      context.lineWidth = isReturning ? 1.5 : 2;
      drawTrail(context, route, Math.max(progress - 0.35, 0), progress);

      const headX = routePoint(route.fromX, route.fromY, route.toX, route.toY, progress, 0);
      const headY = routePoint(route.fromX, route.fromY, route.toX, route.toY, progress, 1);
      context.fillStyle = color;
      context.beginPath();
      context.arc(headX, headY, isReturning ? 3 : 4.5, 0, Math.PI * 2);
      context.fill();

      // The tool "runs": an expanding ring while the task is at the station.
      if (age >= TRAVEL_MS && age <= TRAVEL_MS + WORK_MS + 300) {
        const workProgress = (age - TRAVEL_MS) / (WORK_MS + 300);
        context.strokeStyle = color;
        context.lineWidth = 1.5;
        context.globalAlpha = 1 - workProgress;
        context.beginPath();
        context.arc(
          stationX[stationIndex],
          stationY[stationIndex],
          10 + workProgress * 26,
          0,
          Math.PI * 2
        );
        context.stroke();
        context.globalAlpha = 1;
      }
    }

    // Stations.
    context.font = labelFont;
    context.textAlign = "center";
    context.textBaseline = "middle";
    for (let index = 0; index < STATIONS.length; index += 1) {
      const label = STATIONS[index].label;
      const labelWidth = context.measureText(label).width + 16;
      const x = stationX[index] - labelWidth / 2;
      const y = stationY[index] - 11;
      context.fillStyle = palette.surface;
      context.strokeStyle = palette.line;
      context.lineWidth = 1;
      context.beginPath();
      context.roundRect(x, y, labelWidth, 22, 11);
      context.fill();
      context.stroke();
      context.fillStyle = palette.ink;
      context.fillText(label, stationX[index], stationY[index] + 0.5);
    }

    // The core.
    context.fillStyle = palette.acid;
    context.beginPath();
    context.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = colorTokens.coal;
    context.font = coreFont;
    context.fillText("agent", centerX, centerY + 1);

    // Log of the three most recent completed tasks.
    context.font = logFont;
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
    const lastFinished = Math.floor((elapsed - TASK_LIFETIME_MS) / SPAWN_EVERY_MS);
    for (let line = 0; line < LOG_LINES; line += 1) {
      const taskNumber = lastFinished - line;
      if (taskNumber < 0) {
        break;
      }
      const station = STATIONS[DISPATCH_ORDER[taskNumber % DISPATCH_ORDER.length]];
      const y = height - 8 - line * 18;
      context.globalAlpha = 1 - line * 0.3;
      context.fillStyle = taskColor(frame, taskNumber);
      context.fillText("✓", 0, y);
      context.fillStyle = palette.ink;
      context.fillText(station.label, 16, y);
      context.fillStyle = palette.muted;
      context.fillText(station.task, 16 + context.measureText(station.label).width + 10, y);
    }
    context.globalAlpha = 1;
  }

  return {
    draw: (frame) => {
      render(frame, frame.elapsed + TASK_LIFETIME_MS * 2);
      return false;
    },
    drawFinal: (frame) => render(frame, 9 * SPAWN_EVERY_MS + TASK_LIFETIME_MS * 2 + 420)
  };
}
