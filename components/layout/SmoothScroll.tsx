"use client";

import { useEffect } from "react";

const LENIS_LERP = 0.1;

/** Lenis at lerp 0.1, never loaded for visitors who ask for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let isCancelled = false;
    let animationFrameId = 0;
    let destroyLenis: (() => void) | undefined;

    // Imported lazily so smooth scrolling never competes with the first paint.
    void import("lenis").then(({ default: Lenis }) => {
      if (isCancelled) {
        return;
      }

      const lenis = new Lenis({ lerp: LENIS_LERP, anchors: true });
      destroyLenis = () => lenis.destroy();
      animationFrameId = requestAnimationFrame(function raf(time: number) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      });
    });

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      destroyLenis?.();
    };
  }, []);

  return null;
}
