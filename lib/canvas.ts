"use client";

import { useEffect, useRef, type RefObject } from "react";

import { colorTokens, type SectionTheme, themePalettes } from "@/lib/tokens";

const MAX_PIXEL_RATIO = 2;

export interface CanvasPalette {
  readonly paper: string;
  readonly ink: string;
  readonly muted: string;
  readonly surface: string;
  readonly line: string;
  readonly accent: string;
  readonly signal: string;
  readonly cobalt: string;
  readonly acid: string;
}

export interface CanvasFonts {
  /** Font-family lists resolved from next/font, ready to append to a size in `context.font`. */
  readonly mono: string;
  readonly display: string;
}

export interface CanvasFrame {
  readonly context: CanvasRenderingContext2D;
  readonly width: number;
  readonly height: number;
  readonly palette: CanvasPalette;
  readonly fonts: CanvasFonts;
  /** Milliseconds of visible, running time — it does not advance while the canvas is paused. */
  readonly elapsed: number;
}

export interface CanvasScene {
  /** Draws one frame. Return true once the scene has reached its resting state to stop the loop. */
  readonly draw: (frame: CanvasFrame) => boolean;
  /** Draws the finished state. Used for reduced motion and after the scene has settled. */
  readonly drawFinal: (frame: CanvasFrame) => void;
}

// The page cross-fades between themes, so a canvas draws with its own section's fixed palette
// rather than the live (possibly mid-transition) CSS values.
function readPalette(element: HTMLElement): CanvasPalette {
  const sectionTheme = element.closest<HTMLElement>("[data-section-theme]")?.dataset.sectionTheme;
  const theme =
    themePalettes[(sectionTheme as SectionTheme | undefined) ?? "dark"] ?? themePalettes.dark;

  return {
    paper: theme.bg,
    ink: theme.fg,
    muted: theme.muted,
    surface: theme.card,
    line: theme.edge,
    accent: theme.accent,
    signal: colorTokens.signal,
    cobalt: colorTokens.cobalt,
    acid: colorTokens.acid
  };
}

function readFonts(element: Element): CanvasFonts {
  const styles = getComputedStyle(element);

  // Read next/font's own variables: Tailwind's inline theme does not guarantee --font-* at runtime.
  const mono = styles.getPropertyValue("--font-jetbrains-mono").trim();
  const display = styles.getPropertyValue("--font-inter-tight").trim();

  return {
    mono: mono ? `${mono}, monospace` : "monospace",
    display: display ? `${display}, sans-serif` : "sans-serif"
  };
}

/**
 * Runs a canvas scene with DPR capping, offscreen and hidden-tab pausing, and a reduced-motion
 * still frame. Returns a cleanup function.
 */
export function runCanvasScene(canvas: HTMLCanvasElement, scene: CanvasScene) {
  const context = canvas.getContext("2d");

  if (!context) {
    return () => undefined;
  }

  const palette = readPalette(canvas);
  const fonts = readFonts(canvas);
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let elapsed = 0;
  let lastTimestamp = 0;
  let animationFrameId = 0;
  let isOnScreen = false;
  let isSettled = reducedMotionQuery.matches;

  function frame(): CanvasFrame {
    return { context: context!, width, height, palette, fonts, elapsed };
  }

  function paintStill() {
    context!.clearRect(0, 0, width, height);
    scene.drawFinal(frame());
  }

  function tick(timestamp: number) {
    animationFrameId = 0;
    elapsed += lastTimestamp === 0 ? 0 : Math.min(timestamp - lastTimestamp, 100);
    lastTimestamp = timestamp;

    context!.clearRect(0, 0, width, height);

    if (scene.draw(frame())) {
      isSettled = true;
      return;
    }

    if (shouldRun()) {
      animationFrameId = requestAnimationFrame(tick);
    }
  }

  function shouldRun() {
    return !isSettled && isOnScreen && document.visibilityState === "visible";
  }

  function updateLoop() {
    if (shouldRun() && animationFrameId === 0) {
      lastTimestamp = 0;
      animationFrameId = requestAnimationFrame(tick);
    } else if (!shouldRun() && animationFrameId !== 0) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    }
  }

  function resize() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    // A resize clears the bitmap, so repaint immediately instead of waiting for the next tick.
    if (isSettled) {
      paintStill();
    } else {
      context!.clearRect(0, 0, width, height);
      scene.draw(frame());
    }
  }

  function handleReducedMotionChange() {
    if (reducedMotionQuery.matches) {
      isSettled = true;
      updateLoop();
      paintStill();
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    isOnScreen = entry?.isIntersecting ?? false;
    updateLoop();
  });

  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);
  document.addEventListener("visibilitychange", updateLoop);
  reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
  resize();

  // The first paint can happen before the web fonts arrive; repaint a resting scene once they do.
  let isDisposed = false;
  void document.fonts.ready.then(() => {
    if (!isDisposed && isSettled) {
      paintStill();
    }
  });

  return () => {
    isDisposed = true;
    cancelAnimationFrame(animationFrameId);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", updateLoop);
    reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
  };
}

/** Binds a scene to a canvas ref for the lifetime of the component. */
export function useCanvasScene(
  createScene: () => CanvasScene
): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const createSceneRef = useRef(createScene);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    return runCanvasScene(canvas, createSceneRef.current());
  }, []);

  return canvasRef;
}
