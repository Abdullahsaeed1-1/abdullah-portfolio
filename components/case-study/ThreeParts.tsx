"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { createExplodedScene, type ExplodedControls } from "@/components/canvas/explodedScene";
import { threeParts } from "@/content/three-parts";
import { useCanvasScene } from "@/lib/canvas";
import { loadScrollTools } from "@/lib/gsap";

/** The timetable system taken apart: three glass layers that separate as the section scrolls in. */
export function ThreeParts({ showCaseStudyLink = true }: { readonly showCaseStudyLink?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  // Fully open by default, so reduced motion and a failed GSAP load still show every label.
  const controlsRef = useRef<ExplodedControls>({ explode: 1 });
  const canvasRef = useCanvasScene(() =>
    createExplodedScene(controlsRef.current, threeParts.parts)
  );

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
          controlsRef.current,
          { explode: 0 },
          {
            explode: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 75%", end: "center 45%", scrub: 0.8 }
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
      data-theme="dark"
      data-section-theme="dark"
      aria-labelledby="three-parts-heading"
      className="relative -mt-10 overflow-hidden rounded-t-[40px] bg-paper py-26 text-ink md:-mt-12 md:rounded-t-[56px] md:py-32"
    >
      <div className="gutter mx-auto max-w-content">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-muted">{threeParts.eyebrow}</p>
            <h2
              id="three-parts-heading"
              className="mt-6 max-w-[16ch] font-display text-h1 text-ink"
            >
              {threeParts.heading}
            </h2>
          </div>
          <p aria-hidden="true" className="hidden font-mono text-mono text-muted md:block">
            03 parts
          </p>
        </div>

        <canvas
          ref={canvasRef}
          role="img"
          aria-label={threeParts.canvasLabel}
          width={1200}
          height={640}
          className="mt-10 block aspect-[5/4] w-full sm:aspect-[15/8]"
        >
          {threeParts.canvasLabel}
        </canvas>

        <ul className="mt-6 space-y-2 font-mono text-mono text-muted sm:sr-only">
          {threeParts.parts.map((part) => (
            <li key={part.name}>
              {part.name}: {part.value} — {part.caption}
            </li>
          ))}
        </ul>

        {showCaseStudyLink ? (
          <Link
            href={threeParts.link.href}
            className="group mt-6 inline-flex items-center gap-3 font-display text-h3 text-olive"
          >
            {threeParts.link.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
