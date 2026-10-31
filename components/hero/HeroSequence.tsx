"use client";

import { useEffect, useRef } from "react";

import { createParticleControls, createParticleScene } from "@/components/canvas/particleScene";
import {
  ExperienceCard,
  JourneyIntroPanel,
  StartBar,
  TestimonialCard,
  WorkCard,
  WorkedWithCard
} from "@/components/hero/HeroCards";
import { heroSequence } from "@/content/hero-sequence";
import { site } from "@/content/site";
import { useCanvasScene } from "@/lib/canvas";
import { loadScrollTools } from "@/lib/gsap";

interface HeroSequenceProps {
  readonly portraitSrc: string | null;
}

/*
 * The pinned opening of the home page, scrubbed by scroll:
 *   1. the dot portrait in front of a giant greeting;
 *   2. the greeting blurs away, the scene shrinks into a window on a light page and proof cards fly in;
 *   3. the window opens back up, the camera flies into the face and dashboards slide in beside it.
 * The stage is sticky, so the browser does the pinning and GSAP only scrubs. The section is one
 * screen tall until GSAP starts; only then does it grow to 400svh of scroll, so visitors without
 * JavaScript or with reduced motion get a normal hero instead of three screens of empty scroll.
 */
export function HeroSequence({ portraitSrc }: HeroSequenceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const controlsRef = useRef(createParticleControls());
  const canvasRef = useCanvasScene(() => createParticleScene(controlsRef.current, portraitSrc));

  // The pointer blows the dots aside; coordinates are converted into the canvas's own space.
  useEffect(() => {
    const canvas = canvasRef.current;
    const controls = controlsRef.current;

    if (!canvas) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      // The window can be scaled down by the sequence, so map screen pixels back to canvas pixels.
      const bounds = canvas!.getBoundingClientRect();
      const scale = canvas!.clientWidth / Math.max(bounds.width, 1);
      controls.pointerX = (event.clientX - bounds.left) * scale;
      controls.pointerY = (event.clientY - bounds.top) * scale;
      controls.isPointerActive =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
    }

    function handlePointerLeave() {
      controls.isPointerActive = false;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [canvasRef]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let isCancelled = false;
    let cleanup: (() => void) | undefined;

    void loadScrollTools().then((tools) => {
      if (isCancelled || !tools) {
        return;
      }

      const { gsap } = tools;
      const controls = controlsRef.current;
      const select = (selector: string) => root.querySelectorAll<HTMLElement>(selector);
      const isNarrow = window.innerWidth < 768;

      root.style.height = "400svh";

      const context = gsap.context(() => {
        gsap.set(select("[data-seq]"), { autoAlpha: 0 });
        gsap.set(select('[data-seq="float"]'), {
          y: 90,
          scale: 0.92,
          rotate: (index) => (index % 2 ? 3 : -3)
        });
        gsap.set(select('[data-seq="dash"]'), { x: 140 });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.8 }
        });

        // 1 → 2: greeting blurs out, the stage shrinks into a window, proof floats in.
        timeline
          .to(
            select("[data-greeting]"),
            { filter: "blur(18px)", autoAlpha: 0, scale: 1.08, duration: 1 },
            0
          )
          .to(select("[data-tagline]"), { autoAlpha: 0, y: 30, duration: 0.6 }, 0)
          .to(controls, { zoom: 1.08, duration: 1 }, 0)
          .to(select("[data-backdrop]"), { autoAlpha: 1, duration: 1 }, 0.8)
          .to(
            select("[data-frame]"),
            { scale: isNarrow ? 0.82 : 0.5, borderRadius: isNarrow ? 28 : 48, duration: 1.2 },
            0.8
          )
          .to(select("[data-window-line]"), { autoAlpha: 1, y: 0, duration: 0.6 }, 1.4)
          .to(
            select('[data-seq="float"]'),
            { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 0.9, stagger: 0.12 },
            1.3
          )
          // Hold so the cards can be read.
          .to({}, { duration: 0.9 })
          // 2 → 3: cards lift away, the window opens, the camera flies into the face.
          .to(
            select('[data-seq="float"]'),
            { autoAlpha: 0, y: -70, duration: 0.6, stagger: 0.05 },
            ">"
          )
          .to(select("[data-window-line]"), { autoAlpha: 0, duration: 0.4 }, "<")
          .to(select("[data-frame]"), { scale: 1, borderRadius: 0, duration: 1 }, "<0.2")
          .to(select("[data-backdrop]"), { autoAlpha: 0, duration: 0.8 }, "<0.3")
          .to(
            controls,
            { zoom: isNarrow ? 2.2 : 3, offsetX: isNarrow ? 0 : -0.22, duration: 1.4 },
            "<"
          )
          // Phones have no room beside the face, so the dots dim behind the journey text instead.
          .to(select("[data-portrait]"), { opacity: isNarrow ? 0.18 : 1, duration: 0.8 }, "<0.4")
          .to(
            select('[data-seq="dash"]'),
            { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.15 },
            "<0.2"
          )
          .to({}, { duration: 0.8 });
      }, root);

      cleanup = () => {
        context.revert();
        root.style.height = "";
      };
    });

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-heading"
      data-theme="dark"
      data-section-theme="dark"
      className="relative h-svh bg-night text-cream"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Light page revealed around the window in phase two. */}
        <div data-backdrop="" className="invisible absolute inset-0 bg-mist opacity-0" />

        <div
          data-frame=""
          className="absolute inset-0 overflow-hidden bg-night will-change-transform"
        >
          <p
            data-greeting=""
            aria-hidden="true"
            // Phones stack the two halves above the head; wider screens frame the face with them,
            // leaving a centre column as wide as the head so no letter ever crosses it.
            className="gutter pointer-events-none absolute inset-x-0 top-[9%] grid select-none grid-cols-1 text-center font-display text-[clamp(2.25rem,9vw,3rem)] font-light uppercase leading-[1.05] tracking-[-0.04em] text-cream/85 md:top-[17%] md:grid-cols-[1fr_minmax(15rem,20vw)_1fr] md:items-center md:text-[clamp(2.5rem,4.6vw,5.75rem)] md:leading-none"
          >
            <span className="md:justify-self-end md:whitespace-nowrap">
              {heroSequence.greeting.left}
            </span>
            <span aria-hidden="true" className="hidden md:block" />
            <span className="md:justify-self-start md:whitespace-nowrap">
              {heroSequence.greeting.right}
            </span>
          </p>

          <canvas
            ref={canvasRef}
            data-portrait=""
            role="img"
            aria-label={heroSequence.portraitLabel}
            width={1280}
            height={800}
            className="absolute inset-0 size-full"
          >
            {heroSequence.portraitLabel}
          </canvas>

          <p
            data-window-line=""
            aria-hidden="true"
            className="invisible absolute inset-x-0 top-[6%] translate-y-4 text-center font-display text-h2 text-cream opacity-0"
          >
            {heroSequence.windowLine.strong}{" "}
            <span className="text-cream/50">{heroSequence.windowLine.soft}</span>
          </p>

          <div data-tagline="" className="gutter absolute inset-x-0 bottom-10 md:bottom-14">
            <p className="eyebrow inline-block rounded-full border border-cream/15 px-3 py-1.5 text-cream/60">
              {heroSequence.tagline.eyebrow}
            </p>
            <h1 id="hero-heading" className="mt-4 max-w-[22ch] font-display text-h2 text-cream">
              {heroSequence.tagline.lines[0]}{" "}
              <span className="text-olive">{heroSequence.tagline.lines[1]}</span>
            </h1>
          </div>
          <div
            data-tagline=""
            className="absolute bottom-14 right-12 hidden items-end gap-4 text-right md:flex"
          >
            <div>
              <p className="text-[15px] font-medium tracking-[-0.01em] text-cream">
                {heroSequence.scrollHint}
              </p>
              <p className="mt-2 flex justify-end gap-4 text-[13px] text-cream/50">
                <a
                  href={site.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 hover:text-olive"
                >
                  GitHub
                </a>
                <span aria-hidden="true">·</span>
                {site.linkedin ? (
                  <>
                    <a
                      href={site.linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150 hover:text-olive"
                    >
                      LinkedIn
                    </a>
                    <span aria-hidden="true">·</span>
                  </>
                ) : null}
                <a
                  href={`mailto:${site.businessEmail}`}
                  className="transition-colors duration-150 hover:text-olive"
                >
                  Email
                </a>
              </p>
            </div>
            {/* A thin track with a light travelling down it: the cue to scroll. */}
            <span aria-hidden="true" className="relative h-14 w-px overflow-hidden bg-cream/15">
              <span className="absolute inset-x-0 top-0 h-5 animate-scroll-cue bg-olive" />
            </span>
          </div>
        </div>

        {/* Phase two: who I am, around the window — every row links somewhere. */}
        <div className="pointer-events-none absolute inset-0 [&>*]:pointer-events-auto">
          {/* Two columns so no card can slide over another; the lower card in each column
              steps aside on short screens. */}
          <div className="absolute left-[2.5%] top-[11%] hidden flex-col gap-4 md:flex">
            <WorkCard />
            <TestimonialCard className="hidden lg:block [@media(max-height:860px)]:hidden" />
          </div>
          <div className="absolute right-[2.5%] top-[11%] hidden flex-col gap-4 md:flex">
            <WorkedWithCard />
            <ExperienceCard className="hidden lg:block [@media(max-height:860px)]:hidden" />
          </div>
          <div className="absolute inset-x-0 bottom-[3%] flex justify-center">
            <StartBar />
          </div>
        </div>

        {/* Phase three: the journey begins beside the face. */}
        <div className="pointer-events-none absolute inset-x-6 bottom-10 md:inset-x-auto md:bottom-auto md:right-[7%] md:top-1/2 md:-translate-y-1/2">
          <JourneyIntroPanel />
        </div>
      </div>
    </section>
  );
}
