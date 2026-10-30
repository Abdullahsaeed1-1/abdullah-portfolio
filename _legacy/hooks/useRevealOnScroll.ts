"use client";

import { useEffect, useRef, useState } from "react";

// "static" is the server-rendered state: content stays visible until JavaScript decides otherwise.
export type RevealState = "static" | "hidden" | "visible";

const REVEAL_ROOT_MARGIN = "0px 0px -10% 0px";

export function useRevealOnScroll<TElement extends HTMLElement>() {
  const elementRef = useRef<TElement>(null);
  const [revealState, setRevealState] = useState<RevealState>("static");

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealState("visible");
          observer.disconnect();
          return;
        }

        // Only hide elements that start off-screen, so nothing visible ever flickers.
        setRevealState((currentState) => (currentState === "static" ? "hidden" : currentState));
      },
      { rootMargin: REVEAL_ROOT_MARGIN }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { elementRef, revealState };
}
