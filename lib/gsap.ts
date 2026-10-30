"use client";

import type { gsap as GsapInstance } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

export interface ScrollTools {
  readonly gsap: typeof GsapInstance;
  readonly ScrollTrigger: typeof ScrollTriggerPlugin;
}

let toolsPromise: Promise<ScrollTools> | null = null;

/**
 * Loads GSAP and ScrollTrigger once, on demand, so neither sits in front of the first paint.
 * Resolves to null when the visitor prefers reduced motion — callers then leave the static layout.
 */
export function loadScrollTools(): Promise<ScrollTools | null> {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return Promise.resolve(null);
  }

  toolsPromise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    }
  );

  return toolsPromise;
}
