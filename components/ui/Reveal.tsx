"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { entryTransition, entryVariants } from "@/lib/motion";

// "static" is the server render: fully visible, so content never depends on JavaScript and
// anything already on screen at load counts towards the largest contentful paint.
type RevealState = "static" | "hidden" | "visible";

const REVEAL_ROOT_MARGIN = "0px 0px -8% 0px";

interface RevealProps {
  readonly children: React.ReactNode;
  readonly staggerIndex?: number;
  readonly className?: string;
}

/** Scroll entry: up 20px and fade, once. Only elements that start below the fold animate. */
export function Reveal({ children, staggerIndex = 0, className }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [revealState, setRevealState] = useState<RevealState>("static");

  useEffect(() => {
    const element = elementRef.current;

    if (!element || prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealState((state) => (state === "hidden" ? "visible" : state));
          observer.disconnect();
          return;
        }

        // Only content still below the fold waits to animate. Anything already scrolled past —
        // a deep link, a restored scroll position, a fast flick — stays fully visible.
        if ((entry?.boundingClientRect.top ?? 0) > 0) {
          setRevealState((state) => (state === "static" ? "hidden" : state));
        }
      },
      { rootMargin: REVEAL_ROOT_MARGIN }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <m.div
      ref={elementRef}
      data-reveal={revealState}
      className={className}
      variants={entryVariants}
      initial={false}
      animate={revealState === "static" ? undefined : revealState}
      transition={revealState === "hidden" ? { duration: 0 } : entryTransition(staggerIndex)}
    >
      {children}
    </m.div>
  );
}
