// Literal class names so Tailwind's compiler can see every stagger step.
const revealDelayClasses = [
  "delay-0",
  "delay-[60ms]",
  "delay-[120ms]",
  "delay-[180ms]",
  "delay-[240ms]",
  "delay-[300ms]"
] as const;

export function getRevealDelayClass(staggerIndex: number) {
  const lastIndex = revealDelayClasses.length - 1;

  return revealDelayClasses[Math.min(Math.max(staggerIndex, 0), lastIndex)];
}

export const SCROLLED_THRESHOLD_PX = 8;
