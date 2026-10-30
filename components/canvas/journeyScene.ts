import type { CanvasFrame, CanvasScene } from "@/lib/canvas";

/*
 * The journey thread: a winding line that draws itself down the canvas as the visitor scrolls.
 * Each chapter is a node — passed ones filled, the current one pulsing — and the head of the line
 * trails a few sparks. A faint field of drifting dots keeps the canvas alive between scrolls.
 */

export interface JourneyControls {
  /** 0 at the first chapter, 1 at the last. */
  progress: number;
  activeIndex: number;
}

const AMBIENT_DOTS = 70;
const TRAIL_SPARKS = 10;
const PATH_STEPS = 160;
const DASH = [2, 6];
const NO_DASH: number[] = [];

export function createJourneyScene(
  controls: JourneyControls,
  labels: readonly string[]
): CanvasScene {
  const nodeCount = labels.length;
  // Deterministic ambient field so every visit looks the same.
  const ambientX = new Float32Array(AMBIENT_DOTS);
  const ambientY = new Float32Array(AMBIENT_DOTS);
  const ambientSpeed = new Float32Array(AMBIENT_DOTS);
  for (let index = 0; index < AMBIENT_DOTS; index += 1) {
    const seed = Math.sin(index * 91.7) * 10000;
    ambientX[index] = seed - Math.floor(seed);
    const seedY = Math.sin(index * 47.3) * 10000;
    ambientY[index] = seedY - Math.floor(seedY);
    ambientSpeed[index] = 0.00001 + (index % 7) * 0.000004;
  }

  let easedProgress = controls.progress;
  let cachedWidth = -1;
  let labelFont = "";

  // Point on the winding thread at t ∈ [0, 1].
  function pointX(t: number, width: number) {
    return width * 0.5 + Math.sin(t * Math.PI * 2.4) * width * 0.22;
  }
  function pointY(t: number, height: number) {
    return height * 0.1 + t * height * 0.8;
  }

  function render(frame: CanvasFrame, elapsed: number, isStill: boolean) {
    const { context, width, height, palette, fonts } = frame;

    if (cachedWidth !== width) {
      cachedWidth = width;
      labelFont = `500 12px ${fonts.mono}`;
    }

    // Ease towards the scroll position so the line glides rather than jumps.
    easedProgress = isStill
      ? controls.progress
      : easedProgress + (controls.progress - easedProgress) * 0.08;

    // Ambient drifting dots.
    context.fillStyle = palette.line;
    for (let index = 0; index < AMBIENT_DOTS; index += 1) {
      const y = (ambientY[index] - elapsed * ambientSpeed[index]) % 1;
      context.fillRect(ambientX[index] * width, (y < 0 ? y + 1 : y) * height, 1.5, 1.5);
    }

    // The full route, dashed and quiet.
    context.strokeStyle = palette.line;
    context.lineWidth = 1;
    context.setLineDash(DASH);
    context.beginPath();
    for (let step = 0; step <= PATH_STEPS; step += 1) {
      const t = step / PATH_STEPS;
      if (step === 0) {
        context.moveTo(pointX(t, width), pointY(t, height));
      } else {
        context.lineTo(pointX(t, width), pointY(t, height));
      }
    }
    context.stroke();
    context.setLineDash(NO_DASH);

    // The travelled part, solid olive.
    context.strokeStyle = palette.accent;
    context.lineWidth = 2;
    context.beginPath();
    const drawnSteps = Math.round(easedProgress * PATH_STEPS);
    for (let step = 0; step <= drawnSteps; step += 1) {
      const t = step / PATH_STEPS;
      if (step === 0) {
        context.moveTo(pointX(t, width), pointY(t, height));
      } else {
        context.lineTo(pointX(t, width), pointY(t, height));
      }
    }
    context.stroke();

    // Chapter nodes and their year labels.
    context.font = labelFont;
    context.textBaseline = "middle";
    for (let index = 0; index < nodeCount; index += 1) {
      const t = nodeCount > 1 ? index / (nodeCount - 1) : 0;
      const x = pointX(t, width);
      const y = pointY(t, height);
      const isPassed = easedProgress >= t - 0.001;
      const isActive = index === controls.activeIndex;

      if (isActive && !isStill) {
        const pulse = (elapsed % 1600) / 1600;
        context.strokeStyle = palette.accent;
        context.globalAlpha = 1 - pulse;
        context.lineWidth = 1.5;
        context.beginPath();
        context.arc(x, y, 8 + pulse * 18, 0, Math.PI * 2);
        context.stroke();
        context.globalAlpha = 1;
      }

      context.fillStyle = isPassed ? palette.accent : palette.paper;
      context.strokeStyle = isPassed ? palette.accent : palette.muted;
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(x, y, isActive ? 7 : 5, 0, Math.PI * 2);
      context.fill();
      context.stroke();

      // Labels sit on the outside of each bend so they never cross the line.
      const isRightSide = Math.sin(t * Math.PI * 2.4) >= 0;
      context.textAlign = isRightSide ? "left" : "right";
      context.fillStyle = isActive ? palette.ink : palette.muted;
      context.fillText(labels[index], x + (isRightSide ? 18 : -18), y);
    }

    // Sparks trailing the head of the line.
    if (!isStill) {
      for (let spark = 0; spark < TRAIL_SPARKS; spark += 1) {
        const t = Math.max(easedProgress - spark * 0.006, 0);
        context.globalAlpha = (1 - spark / TRAIL_SPARKS) * 0.9;
        context.fillStyle = spark === 0 ? palette.ink : palette.accent;
        const size = spark === 0 ? 4 : 2.5;
        context.fillRect(pointX(t, width) - size / 2, pointY(t, height) - size / 2, size, size);
      }
      context.globalAlpha = 1;
    }
  }

  return {
    draw: (frame) => {
      render(frame, frame.elapsed, false);
      return false;
    },
    drawFinal: (frame) => render(frame, 0, true)
  };
}
