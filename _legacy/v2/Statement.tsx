"use client";

import { useEffect, useRef } from "react";

import { loadScrollTools } from "@/lib/gsap";

interface StatementProps {
  readonly text: string;
  readonly eyebrow: string;
}

/**
 * A large statement whose words light up one by one as it scrolls through the viewport.
 * Rendered fully lit; the dimming is applied by GSAP only, so it reads fine without JavaScript.
 */
export function Statement({ text, eyebrow }: StatementProps) {
  const rootRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const root = rootRef.current;
    let cleanup: (() => void) | undefined;
    let isCancelled = false;

    void loadScrollTools().then((tools) => {
      if (isCancelled || !tools || !root) {
        return;
      }

      const context = tools.gsap.context(() => {
        tools.gsap.fromTo(
          root.querySelectorAll("[data-word]"),
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 60%", scrub: 0.6 }
          }
        );
      }, root);

      cleanup = () => context.revert();
    });

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      data-theme="light"
      data-section-theme="light"
      aria-label={eyebrow}
      className="relative -mt-10 rounded-t-[40px] bg-paper py-26 text-ink md:-mt-12 md:rounded-t-[56px] md:py-40"
    >
      <div className="gutter mx-auto max-w-content">
        <p className="eyebrow text-muted">{eyebrow}</p>
        <p className="mt-10 max-w-[22ch] font-display text-h1 text-ink md:ml-[18%]">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} data-word="">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
