"use client";

import { useEffect, useState } from "react";

export function useHasScrolled(thresholdPx: number) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let animationFrameId = 0;

    function updateScrolledState() {
      animationFrameId = 0;
      setHasScrolled(window.scrollY > thresholdPx);
    }

    // Batch scroll events into one update per frame to avoid re-render storms.
    function handleScroll() {
      if (animationFrameId === 0) {
        animationFrameId = window.requestAnimationFrame(updateScrolledState);
      }
    }

    updateScrolledState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [thresholdPx]);

  return hasScrolled;
}
