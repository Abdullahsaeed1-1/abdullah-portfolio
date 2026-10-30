"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { lifeJourney } from "@/content/life-journey";
import { loadScrollTools } from "@/lib/gsap";
import { colorTokens } from "@/lib/tokens";

/**
 * The divider after the hero: a timeline whose line draws itself across as the section scrolls in,
 * lighting each year as it passes. Rendered complete on the server; GSAP only adds the drawing.
 */
export function JourneyStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    let cleanup: (() => void) | undefined;
    let isCancelled = false;

    void loadScrollTools().then((tools) => {
      if (isCancelled || !tools || !root) {
        return;
      }

      const { gsap } = tools;
      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 75%", scrub: 0.7 }
        });
        timeline
          .fromTo(
            "[data-journey-line]",
            { scaleX: 0, scaleY: 0 },
            { scaleX: 1, scaleY: 1, ease: "none", duration: 1 },
            0
          )
          .fromTo(
            "[data-journey-stop]",
            { autoAlpha: 0.15, y: 24 },
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.4, stagger: 0.15 },
            0.05
          )
          .fromTo(
            "[data-journey-dot]",
            { backgroundColor: "rgba(11, 11, 10, 0)" },
            { backgroundColor: colorTokens.oliveDeep, duration: 0.2, stagger: 0.15 },
            0.1
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
      aria-labelledby="journey-strip-heading"
      className="relative -mt-10 rounded-t-[40px] bg-paper py-26 text-ink md:-mt-12 md:rounded-t-[56px] md:py-32"
    >
      <div className="gutter mx-auto max-w-content">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-muted">{lifeJourney.eyebrow}</p>
            <h2
              id="journey-strip-heading"
              className="mt-4 max-w-[20ch] font-display text-h1 text-ink"
            >
              {lifeJourney.heading}
            </h2>
          </div>
          <Link
            href={lifeJourney.link.href}
            className="group inline-flex items-center gap-2 text-small font-medium text-ink"
          >
            {lifeJourney.link.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <ol className="relative mt-16 grid grid-cols-1 gap-10 pl-8 md:mt-20 md:grid-cols-5 md:gap-6 md:pl-0 md:pt-10">
          {/* Track and the line that draws over it: horizontal on desktop, vertical on phones. */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-0 w-px bg-line md:inset-x-0 md:bottom-auto md:top-[5px] md:h-px md:w-auto"
          />
          <span
            aria-hidden="true"
            data-journey-line=""
            className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent md:inset-x-0 md:bottom-auto md:top-[5px] md:h-px md:w-auto md:origin-left"
          />

          {lifeJourney.stops.map((stop) => (
            <li key={stop.year} data-journey-stop="" className="relative">
              <span
                aria-hidden="true"
                data-journey-dot=""
                className="absolute -left-8 top-1 size-[11px] rounded-full border border-accent bg-accent md:-top-10 md:left-0"
              />
              <p className="font-mono text-mono text-accent">{stop.year}</p>
              <h3 className="mt-2 font-display text-h3 text-ink">{stop.title}</h3>
              <p className="mt-2 text-small text-muted">{stop.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
