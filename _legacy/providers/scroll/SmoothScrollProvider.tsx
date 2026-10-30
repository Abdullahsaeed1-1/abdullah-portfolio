"use client";

import { useEffect } from "react";

interface SmoothScrollProviderProps {
  readonly children: React.ReactNode;
}

function shouldIgnoreClick(event: MouseEvent) {
  return event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleDocumentClick(event: MouseEvent) {
      if (shouldIgnoreClick(event)) {
        return;
      }

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!link || link.hash.length <= 1) {
        return;
      }

      const target = document.querySelector<HTMLElement>(link.hash);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
      target.focus({ preventScroll: true });
      window.history.pushState(null, "", link.hash);
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return children;
}
