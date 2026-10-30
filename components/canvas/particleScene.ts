import type { CanvasFrame, CanvasScene } from "@/lib/canvas";

/*
 * A portrait made of a few thousand dots. The shape is sampled from /portrait.png when it exists,
 * otherwise from the initials "AS". Dots spring back to their place, get blown aside by the
 * pointer like hair in wind, and the scroll sequence drives `zoom` and `offsetX` from outside.
 */

export interface ParticleControls {
  /** 1 = whole portrait in view; larger values fly the camera into the face. */
  zoom: number;
  /** Horizontal shift of the portrait as a fraction of the canvas width. */
  offsetX: number;
  pointerX: number;
  pointerY: number;
  isPointerActive: boolean;
}

export function createParticleControls(): ParticleControls {
  return { zoom: 1, offsetX: 0, pointerX: 0, pointerY: 0, isPointerActive: false };
}

const DESKTOP_MAX_PARTICLES = 13000;
const MOBILE_MAX_PARTICLES = 4500;
const SPRING = 0.045;
const DAMPING = 0.86;
const POINTER_RADIUS = 110;
const POINTER_FORCE = 2.4;
const COLOR_BUCKETS = 14;
// Height of the eyes in public/portrait.png, as a fraction from the top. Update if the photo changes.
const PORTRAIT_EYE_LINE = 0.2;
// Where the camera flies to while zooming on the initials: just above the middle of the letters.
const FOCAL_Y = -0.12;

// Off-white at the top fading into olive at the bottom.
const GRADIENT_STOPS = [
  [243, 242, 237],
  [200, 206, 168],
  [140, 154, 85]
] as const;

function gradientColor(position: number) {
  const scaled = position * (GRADIENT_STOPS.length - 1);
  const index = Math.min(Math.floor(scaled), GRADIENT_STOPS.length - 2);
  const mix = scaled - index;
  const from = GRADIENT_STOPS[index];
  const to = GRADIENT_STOPS[index + 1];
  const channel = (component: number) =>
    Math.round(from[component] + (to[component] - from[component]) * mix);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

const BUCKET_COLORS = Array.from({ length: COLOR_BUCKETS }, (_, bucket) =>
  gradientColor(bucket / (COLOR_BUCKETS - 1))
);

interface ShapeSample {
  readonly homeX: Float32Array;
  readonly homeY: Float32Array;
  readonly bucketStarts: Uint32Array;
  readonly count: number;
  /** Where the camera zooms to, in pixels from the shape's centre; null means "use the default". */
  readonly focusY: number | null;
}

/** Rasterises the source into an offscreen canvas and keeps one dot per bright grid cell. */
function sampleShape(
  source: CanvasImageSource | null,
  boxSize: number,
  maxParticles: number,
  displayFont: string
): ShapeSample {
  const size = Math.max(64, Math.round(boxSize));
  const offscreen = document.createElement("canvas");
  offscreen.width = size;
  offscreen.height = size;
  const context = offscreen.getContext("2d", { willReadFrequently: true })!;
  let imageFocusY: number | null = null;

  if (source) {
    const image = source as HTMLImageElement;
    const scale = Math.min(size / image.naturalWidth, size / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, (size - drawWidth) / 2, size - drawHeight, drawWidth, drawHeight);
    imageFocusY = size - drawHeight + PORTRAIT_EYE_LINE * drawHeight - size / 2;
  } else {
    context.fillStyle = "#fff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `700 ${Math.round(size * 0.62)}px ${displayFont}`;
    context.fillText("AS", size / 2, size * 0.52);
  }

  const pixels = context.getImageData(0, 0, size, size).data;
  // A fine grid first; if that yields too many dots they are thinned evenly afterwards.
  const step = size > 420 ? 2 : 3;
  const buckets: number[][] = Array.from({ length: COLOR_BUCKETS }, () => []);

  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const offset = (y * size + x) * 4;
      const brightness =
        ((pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / 765) *
        (pixels[offset + 3] / 255);

      // Deterministic jitter keeps the dots from reading as a rigid grid.
      const jitterSeed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const jitter = jitterSeed - Math.floor(jitterSeed);

      // A photo is sampled like a halftone — the chance of a dot follows brightness, so shading
      // survives and eyes, nose and lips read. Flat initials only need a clean edge.
      const threshold = source ? 0.06 + jitter * 0.88 : 0.18 + jitter * 0.25;

      if (brightness > threshold) {
        const bucket = Math.min(COLOR_BUCKETS - 1, Math.floor((y / size) * COLOR_BUCKETS));
        buckets[bucket].push(
          x - size / 2 + (jitter - 0.5) * step,
          y - size / 2 + (jitter - 0.5) * step
        );
      }
    }
  }

  const available = buckets.reduce((total, bucket) => total + bucket.length / 2, 0);
  const stride = Math.max(1, available / maxParticles);
  const count = Math.min(maxParticles, available);
  const homeX = new Float32Array(count);
  const homeY = new Float32Array(count);
  const bucketStarts = new Uint32Array(COLOR_BUCKETS + 1);
  let written = 0;
  let cursor = 0;

  buckets.forEach((bucket, bucketIndex) => {
    bucketStarts[bucketIndex] = written;
    for (let index = 0; index < bucket.length / 2; index += 1, cursor += 1) {
      // Keep every `stride`-th dot across the whole shape so thinning stays uniform.
      if (written < count && Math.floor(cursor / stride) !== Math.floor((cursor - 1) / stride)) {
        homeX[written] = bucket[index * 2];
        homeY[written] = bucket[index * 2 + 1];
        written += 1;
      }
    }
  });
  bucketStarts[COLOR_BUCKETS] = written;

  return { homeX, homeY, bucketStarts, count: written, focusY: imageFocusY };
}

export function createParticleScene(
  controls: ParticleControls,
  portraitSrc: string | null
): CanvasScene {
  let shape: ShapeSample | null = null;
  let positionX = new Float32Array(0);
  let positionY = new Float32Array(0);
  let velocityX = new Float32Array(0);
  let velocityY = new Float32Array(0);
  let sampledWidth = -1;
  let portrait: HTMLImageElement | null = null;
  let displayFont = "sans-serif";

  if (portraitSrc && typeof Image !== "undefined") {
    const image = new Image();
    image.onload = () => {
      portrait = image;
      sampledWidth = -1; // Resample; the dots then flow from the initials into the face.
    };
    image.src = portraitSrc;
  }

  // The initials are drawn with the display face; resample once it has actually loaded.
  void document.fonts?.ready.then(() => {
    if (!portrait) {
      sampledWidth = -1;
    }
  });

  function resample(width: number, height: number) {
    const isNarrow = width < 640;
    // The photo is taller than wide, so size it by its own aspect: as tall as the stage allows
    // without the face growing wider than the space between the side cards.
    const boxSize = portrait
      ? Math.min(
          height * (isNarrow ? 0.7 : 0.8),
          (width * (isNarrow ? 0.92 : width < 1280 ? 0.46 : 0.6) * portrait.naturalHeight) /
            portrait.naturalWidth
        )
      : Math.min(width * (isNarrow ? 0.95 : 0.62), height * 0.92);
    const next = sampleShape(
      portrait,
      boxSize,
      isNarrow ? MOBILE_MAX_PARTICLES : DESKTOP_MAX_PARTICLES,
      displayFont
    );
    const previousCount = shape?.count ?? 0;
    const nextX = new Float32Array(next.count);
    const nextY = new Float32Array(next.count);

    // Keep existing dots where they are so a resample animates instead of snapping.
    for (let index = 0; index < next.count; index += 1) {
      const source = previousCount > 0 ? index % previousCount : -1;
      nextX[index] = source >= 0 ? positionX[source] : width / 2 + next.homeX[index] * 1.6;
      nextY[index] = source >= 0 ? positionY[source] : height / 2 + next.homeY[index] * 1.6;
    }

    shape = next;
    positionX = nextX;
    positionY = nextY;
    velocityX = new Float32Array(next.count);
    velocityY = new Float32Array(next.count);
    sampledWidth = width;
  }

  function draw(frame: CanvasFrame, isStill: boolean) {
    const { context, width, height, fonts } = frame;
    displayFont = fonts.display;

    if (sampledWidth !== width) {
      resample(width, height);
    }

    if (!shape) {
      return;
    }

    const zoom = controls.zoom;
    const dotSize = Math.min(1.6 * Math.sqrt(zoom), 5);
    const centerX = width / 2 + controls.offsetX * width;
    // On phones the face sits higher so the tagline at the bottom does not cover the chin.
    const centerY = height * (width < 640 ? 0.45 : 0.53);
    // Zoom into the eyes of the portrait; the initials just need a small lift above centre.
    const focalY = shape.focusY ?? FOCAL_Y * height;

    for (let bucket = 0; bucket < COLOR_BUCKETS; bucket += 1) {
      context.fillStyle = BUCKET_COLORS[bucket];

      for (
        let index = shape.bucketStarts[bucket];
        index < shape.bucketStarts[bucket + 1];
        index += 1
      ) {
        const targetX = centerX + shape.homeX[index] * zoom;
        const targetY = centerY + focalY + (shape.homeY[index] - focalY) * zoom;

        if (isStill) {
          positionX[index] = targetX;
          positionY[index] = targetY;
        } else {
          let forceX = (targetX - positionX[index]) * SPRING;
          let forceY = (targetY - positionY[index]) * SPRING;

          if (controls.isPointerActive) {
            const deltaX = positionX[index] - controls.pointerX;
            const deltaY = positionY[index] - controls.pointerY;
            const distanceSquared = deltaX * deltaX + deltaY * deltaY;

            if (distanceSquared < POINTER_RADIUS * POINTER_RADIUS) {
              const falloff = 1 - Math.sqrt(distanceSquared) / POINTER_RADIUS;
              // Push outward with a sideways swirl so the dots stream like hair rather than bounce.
              forceX += (deltaX * 0.02 - deltaY * 0.012) * falloff * POINTER_FORCE;
              forceY += (deltaY * 0.02 + deltaX * 0.012) * falloff * POINTER_FORCE;
            }
          }

          velocityX[index] = (velocityX[index] + forceX) * DAMPING;
          velocityY[index] = (velocityY[index] + forceY) * DAMPING;
          positionX[index] += velocityX[index];
          positionY[index] += velocityY[index];
        }

        const x = positionX[index];
        const y = positionY[index];

        if (x > -dotSize && x < width && y > -dotSize && y < height) {
          context.fillRect(x, y, dotSize, dotSize);
        }
      }
    }
  }

  return {
    draw: (frame) => {
      draw(frame, false);
      return false;
    },
    drawFinal: (frame) => draw(frame, true)
  };
}
