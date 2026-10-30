"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId = 0;

    // Writes the transform directly so scrolling never triggers React renders.
    function paintProgress() {
      animationFrameId = 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      barRef.current?.style.setProperty("transform", `scaleX(${Math.min(Math.max(progress, 0), 1)})`);
    }

    function handleScroll() {
      if (animationFrameId === 0) {
        animationFrameId = window.requestAnimationFrame(paintProgress);
      }
    }

    paintProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple"
      />
    </div>
  );
}
