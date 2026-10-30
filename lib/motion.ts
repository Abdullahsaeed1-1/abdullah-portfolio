import type { Transition, Variants } from "motion/react";

// DESIGN-SYSTEM.md §5 — the only easing and durations on the site.
export const ease = [0.16, 1, 0.3, 1] as const;
export const fast = 0.3;
export const base = 0.6;
export const slow = 1.1;

export const STAGGER_SECONDS = 0.06;
export const ENTRY_DISTANCE_PX = 20;

export const entryVariants: Variants = {
  hidden: { opacity: 0, y: ENTRY_DISTANCE_PX },
  visible: { opacity: 1, y: 0 }
};

export function entryTransition(staggerIndex: number): Transition {
  return { duration: base, ease, delay: staggerIndex * STAGGER_SECONDS };
}

/** Inline custom property for the CSS `animate-enter` utility, which staggers above-the-fold entries by 60ms. */
export function enterStyle(staggerIndex: number) {
  return { "--enter-index": staggerIndex } as React.CSSProperties;
}
