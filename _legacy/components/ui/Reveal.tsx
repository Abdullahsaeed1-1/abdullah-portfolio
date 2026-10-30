"use client";

import { getRevealDelayClass } from "@/constants/motion";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { cn } from "@/utils/cn";

interface RevealProps {
  readonly children: React.ReactNode;
  readonly staggerIndex?: number;
  readonly className?: string;
  readonly as?: "div" | "li" | "article";
}

export function Reveal({ children, staggerIndex = 0, className, as: Element = "div" }: RevealProps) {
  const { elementRef, revealState } = useRevealOnScroll<HTMLDivElement & HTMLLIElement>();

  return (
    <Element
      ref={elementRef}
      data-reveal={revealState}
      className={cn("reveal", getRevealDelayClass(staggerIndex), className)}
    >
      {children}
    </Element>
  );
}
