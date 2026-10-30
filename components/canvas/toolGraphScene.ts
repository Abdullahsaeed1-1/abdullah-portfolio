import type { CanvasFrame, CanvasScene } from "@/lib/canvas";

/*
 * One Jarvis request traced end to end (CONTENT.md / DESIGN-SYSTEM.md §6.3). The other tools the
 * selector could have chosen sit beside the path in hairline grey and never light up.
 */

const PATH_LABELS = [
  "message",
  "memory retrieval",
  "Claude",
  "tool selection",
  "Gmail",
  "approval",
  "sent"
] as const;
const IDLE_TOOL_LABELS = ["Calendar", "Drive", "Canva"] as const;
const TOOL_SELECTION_INDEX = 3;
const APPROVAL_INDEX = 5;

const SEGMENT_MS = 520;
const APPROVAL_HOLD_MS = 700;
const NODE_SIZE = 9;
const NARROW_BREAKPOINT_PX = 640;
const SEGMENT_COUNT = PATH_LABELS.length - 1;

// Time at which the travelling head reaches each node; the approval gate holds the request.
const ARRIVAL_TIMES = new Float32Array(PATH_LABELS.length);
for (let index = 1; index < PATH_LABELS.length; index += 1) {
  ARRIVAL_TIMES[index] =
    ARRIVAL_TIMES[index - 1] + SEGMENT_MS + (index - 1 === APPROVAL_INDEX ? APPROVAL_HOLD_MS : 0);
}
const TOTAL_MS = ARRIVAL_TIMES[PATH_LABELS.length - 1] + 200;

export function createToolGraphScene(): CanvasScene {
  const nodeX = new Float32Array(PATH_LABELS.length);
  const nodeY = new Float32Array(PATH_LABELS.length);
  const idleX = new Float32Array(IDLE_TOOL_LABELS.length);
  const idleY = new Float32Array(IDLE_TOOL_LABELS.length);
  let cachedWidth = -1;
  let cachedHeight = -1;
  let isNarrow = false;
  let labelFont = "";

  // Positions are recomputed only on resize, never inside the frame loop.
  function layout(width: number, height: number, fonts: CanvasFrame["fonts"]) {
    cachedWidth = width;
    cachedHeight = height;
    isNarrow = width < NARROW_BREAKPOINT_PX;
    labelFont = `400 ${isNarrow ? 11 : 12}px ${fonts.mono}`;

    for (let index = 0; index < PATH_LABELS.length; index += 1) {
      if (isNarrow) {
        nodeX[index] = 24;
        nodeY[index] = 16 + (index * (height - 32)) / SEGMENT_COUNT;
      } else {
        nodeX[index] = 40 + (index * (width - 80)) / SEGMENT_COUNT;
        nodeY[index] = height * 0.38;
      }
    }

    for (let index = 0; index < IDLE_TOOL_LABELS.length; index += 1) {
      if (isNarrow) {
        idleX[index] = width * 0.62;
        idleY[index] = nodeY[TOOL_SELECTION_INDEX] + (index - 1) * 26;
      } else {
        idleX[index] = nodeX[TOOL_SELECTION_INDEX] + (nodeX[4] - nodeX[3]) * 0.55;
        idleY[index] = height * 0.66 + index * 26;
      }
    }
  }

  function drawNode(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    isLit: boolean,
    frame: CanvasFrame
  ) {
    context.fillStyle = isLit ? frame.palette.signal : frame.palette.paper;
    context.strokeStyle = isLit ? frame.palette.signal : frame.palette.ink;
    context.lineWidth = 1;
    context.fillRect(x - NODE_SIZE / 2, y - NODE_SIZE / 2, NODE_SIZE, NODE_SIZE);
    context.strokeRect(
      x - NODE_SIZE / 2 + 0.5,
      y - NODE_SIZE / 2 + 0.5,
      NODE_SIZE - 1,
      NODE_SIZE - 1
    );
  }

  function render(frame: CanvasFrame, elapsed: number) {
    const { context, width, height, palette, fonts } = frame;

    if (width !== cachedWidth || height !== cachedHeight) {
      layout(width, height, fonts);
    }

    // Branches to the tools that were not chosen.
    context.strokeStyle = palette.line;
    context.lineWidth = 1;
    context.beginPath();
    for (let index = 0; index < IDLE_TOOL_LABELS.length; index += 1) {
      context.moveTo(nodeX[TOOL_SELECTION_INDEX], nodeY[TOOL_SELECTION_INDEX]);
      context.lineTo(idleX[index], idleY[index]);
    }
    context.stroke();

    // The full route in ink, then the travelled portion over it in signal.
    context.strokeStyle = palette.ink;
    context.beginPath();
    context.moveTo(nodeX[0], nodeY[0]);
    for (let index = 1; index < PATH_LABELS.length; index += 1) {
      context.lineTo(nodeX[index], nodeY[index]);
    }
    context.stroke();

    context.strokeStyle = palette.signal;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(nodeX[0], nodeY[0]);
    for (let index = 1; index < PATH_LABELS.length; index += 1) {
      const departure =
        ARRIVAL_TIMES[index - 1] + (index - 1 === APPROVAL_INDEX ? APPROVAL_HOLD_MS : 0);
      const progress = Math.min(Math.max((elapsed - departure) / SEGMENT_MS, 0), 1);

      if (progress <= 0) {
        break;
      }

      context.lineTo(
        nodeX[index - 1] + (nodeX[index] - nodeX[index - 1]) * progress,
        nodeY[index - 1] + (nodeY[index] - nodeY[index - 1]) * progress
      );
    }
    context.stroke();

    context.font = labelFont;
    context.textBaseline = "middle";

    for (let index = 0; index < IDLE_TOOL_LABELS.length; index += 1) {
      context.fillStyle = palette.paper;
      context.fillRect(idleX[index] - 3, idleY[index] - 3, 6, 6);
      context.strokeStyle = palette.line;
      context.strokeRect(idleX[index] - 2.5, idleY[index] - 2.5, 5, 5);
      context.fillStyle = palette.muted;
      context.textAlign = "left";
      context.fillText(IDLE_TOOL_LABELS[index], idleX[index] + 10, idleY[index]);
    }

    for (let index = 0; index < PATH_LABELS.length; index += 1) {
      const isLit = elapsed >= ARRIVAL_TIMES[index];
      drawNode(context, nodeX[index], nodeY[index], isLit, frame);
      context.fillStyle = isLit ? palette.ink : palette.muted;

      if (isNarrow) {
        context.textAlign = "left";
        context.fillText(PATH_LABELS[index], nodeX[index] + 16, nodeY[index]);
      } else {
        context.textAlign = "center";
        // Alternate labels above and below so long names never collide.
        context.fillText(
          PATH_LABELS[index],
          nodeX[index],
          nodeY[index] + (index % 2 === 0 ? -20 : 22)
        );
      }
    }

    return elapsed >= TOTAL_MS;
  }

  return {
    draw: (frame) => render(frame, frame.elapsed),
    drawFinal: (frame) => {
      render(frame, Number.POSITIVE_INFINITY);
    }
  };
}
