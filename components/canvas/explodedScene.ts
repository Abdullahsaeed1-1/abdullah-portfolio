import type { CanvasFrame, CanvasScene } from "@/lib/canvas";

/*
 * An exploded view of a three-layer system: isometric glass plates that separate as `explode`
 * goes from 0 to 1, each with a callout line to its label. Drawn bottom plate first so the upper
 * plates overlap the ones beneath, like the product shots this borrows from.
 */

export interface ExplodedControls {
  explode: number;
}

export interface ExplodedPart {
  readonly name: string;
  readonly value: string;
  readonly caption: string;
}

type PlateDetail = "grid" | "lines" | "ring";

const DETAILS: readonly PlateDetail[] = ["grid", "lines", "ring"];
const PLATE_THICKNESS = 12;
const FACE_FILL = "rgba(140, 154, 85, 0.12)";
const SIDE_FILL = "rgba(140, 154, 85, 0.06)";
const EDGE_STROKE = "rgba(243, 242, 237, 0.5)";
const DETAIL_COLORS: Record<PlateDetail, string> = {
  grid: "rgba(243, 242, 237, 0.7)",
  lines: "rgba(243, 242, 237, 0.7)",
  ring: "rgba(140, 154, 85, 1)"
};

function easeInOut(progress: number) {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
}

export function createExplodedScene(
  controls: ExplodedControls,
  parts: readonly ExplodedPart[]
): CanvasScene {
  let cachedWidth = -1;
  let nameFont = "";
  let valueFont = "";
  let captionFont = "";

  function drawPlateDetail(context: CanvasRenderingContext2D, detail: PlateDetail) {
    context.strokeStyle = DETAIL_COLORS[detail];
    context.fillStyle = DETAIL_COLORS[detail];
    context.lineWidth = 0.012;

    if (detail === "grid") {
      for (let row = 0; row < 3; row += 1) {
        for (let column = 0; column < 3; column += 1) {
          context.strokeRect(0.14 + column * 0.25, 0.14 + row * 0.25, 0.2, 0.2);
        }
      }
    } else if (detail === "lines") {
      for (let line = 0; line < 6; line += 1) {
        const v = 0.18 + line * 0.13;
        context.beginPath();
        context.moveTo(0.16, v);
        context.lineTo(0.84, v);
        context.stroke();
        context.beginPath();
        context.arc(0.16, v, 0.025, 0, Math.PI * 2);
        context.fill();
      }
    } else {
      context.lineWidth = 0.03;
      context.beginPath();
      context.arc(0.5, 0.5, 0.22, 0, Math.PI * 2);
      context.stroke();
      context.lineWidth = 0.012;
      for (let spoke = 0; spoke < 12; spoke += 1) {
        const angle = (spoke / 12) * Math.PI * 2;
        context.beginPath();
        context.moveTo(0.5 + Math.cos(angle) * 0.26, 0.5 + Math.sin(angle) * 0.26);
        context.lineTo(0.5 + Math.cos(angle) * 0.4, 0.5 + Math.sin(angle) * 0.4);
        context.stroke();
      }
    }
  }

  function drawPlate(
    context: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    halfWidth: number,
    halfDepth: number,
    detail: PlateDetail
  ) {
    const top = centerY - halfDepth;
    const bottom = centerY + halfDepth;
    const left = centerX - halfWidth;
    const right = centerX + halfWidth;

    // Visible sides: the two front faces below the top diamond.
    context.fillStyle = SIDE_FILL;
    context.strokeStyle = EDGE_STROKE;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(left, centerY);
    context.lineTo(centerX, bottom);
    context.lineTo(right, centerY);
    context.lineTo(right, centerY + PLATE_THICKNESS);
    context.lineTo(centerX, bottom + PLATE_THICKNESS);
    context.lineTo(left, centerY + PLATE_THICKNESS);
    context.closePath();
    context.fill();
    context.stroke();

    // Top face.
    context.fillStyle = FACE_FILL;
    context.beginPath();
    context.moveTo(centerX, top);
    context.lineTo(right, centerY);
    context.lineTo(centerX, bottom);
    context.lineTo(left, centerY);
    context.closePath();
    context.fill();
    context.stroke();

    // Details are drawn in the plate's own unit square, mapped onto the isometric top face.
    context.save();
    context.transform(halfWidth, halfDepth, -halfWidth, halfDepth, centerX, top);
    drawPlateDetail(context, detail);
    context.restore();
  }

  function render(frame: CanvasFrame, explode: number) {
    const { context, width, height, palette, fonts } = frame;
    const isNarrow = width < 640;
    const progress = easeInOut(Math.min(Math.max(explode, 0), 1));
    const halfWidth = Math.min(width * (isNarrow ? 0.24 : 0.2), 210);
    const halfDepth = halfWidth * 0.5;
    const centerX = width * (isNarrow ? 0.3 : 0.36);
    const closedGap = PLATE_THICKNESS + 6;
    const openGap = Math.min(halfDepth * 1.9, (height - halfDepth * 2) / 2.4);
    const gap = closedGap + (openGap - closedGap) * progress;
    const middleY = height / 2;
    const labelX = width * (isNarrow ? 0.6 : 0.66);

    if (cachedWidth !== width) {
      cachedWidth = width;
      nameFont = `500 ${isNarrow ? 10 : 11}px ${fonts.mono}`;
      valueFont = `600 ${isNarrow ? 16 : 22}px ${fonts.display}`;
      captionFont = `400 ${isNarrow ? 10 : 12}px ${fonts.mono}`;
    }

    // Bottom plate first, so each upper plate overlaps the one under it.
    for (let index = parts.length - 1; index >= 0; index -= 1) {
      const plateY = middleY + (index - (parts.length - 1) / 2) * gap;
      drawPlate(context, centerX, plateY, halfWidth, halfDepth, DETAILS[index % DETAILS.length]);

      // Callout: from the plate's right corner out to the label, fading in as the stack opens.
      context.globalAlpha = progress;
      context.strokeStyle = palette.muted;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(centerX + halfWidth + 6, plateY);
      context.lineTo(labelX - 12, plateY);
      context.stroke();
      context.fillStyle = palette.ink;
      context.beginPath();
      context.arc(centerX + halfWidth + 6, plateY, 2.5, 0, Math.PI * 2);
      context.fill();

      const part = parts[index];
      context.textAlign = "left";
      context.textBaseline = "alphabetic";
      context.font = nameFont;
      context.fillStyle = palette.accent;
      context.fillText(part.name.toUpperCase(), labelX, plateY - (isNarrow ? 22 : 30));
      context.font = valueFont;
      context.fillStyle = palette.ink;
      context.fillText(part.value, labelX, plateY + (isNarrow ? 0 : 2));
      // On narrow screens the captions move out of the canvas into the list below it.
      if (!isNarrow) {
        context.font = captionFont;
        context.fillStyle = palette.muted;
        context.fillText(part.caption, labelX, plateY + 24, width - labelX - 8);
      }
      context.globalAlpha = 1;
    }
  }

  return {
    draw: (frame) => {
      render(frame, controls.explode);
      return false;
    },
    drawFinal: (frame) => render(frame, 1)
  };
}
