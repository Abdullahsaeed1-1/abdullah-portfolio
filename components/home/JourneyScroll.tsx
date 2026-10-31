"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { createJourneyScene, type JourneyControls } from "@/components/canvas/journeyScene";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { TodoNote } from "@/components/ui/TodoNote";
import { journeyChapters } from "@/content/journey";
import { useCanvasScene } from "@/lib/canvas";
import { cn } from "@/lib/cn";
import { loadScrollTools } from "@/lib/gsap";

/**
 * The journey, told while scrolling. On desktop the canvas thread and the current year stay pinned
 * on the left while chapters pass on the right; the thread draws down as the page scrolls and the
 * chapter in the middle of the screen is the one in focus. Phones get the chapters as a plain list.
 */
export function JourneyScroll() {
  const rootRef = useRef<HTMLElement>(null);
  // Fully drawn by default, so reduced motion and a failed GSAP load still show the whole route.
  const controlsRef = useRef<JourneyControls>({ progress: 1, activeIndex: 0 });
  const canvasRef = useCanvasScene(() =>
    createJourneyScene(
      controlsRef.current,
      journeyChapters.map((chapter) => chapter.year)
    )
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollDriven, setIsScrollDriven] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    let cleanup: (() => void) | undefined;
    let isCancelled = false;

    void loadScrollTools().then((tools) => {
      if (isCancelled || !tools || !root) {
        return;
      }

      const { gsap, ScrollTrigger } = tools;
      const controls = controlsRef.current;
      controls.progress = 0;
      setIsScrollDriven(true);

      const context = gsap.context(() => {
        const chapters = root.querySelectorAll<HTMLElement>("[data-chapter]");

        ScrollTrigger.create({
          trigger: chapters[0],
          endTrigger: chapters[chapters.length - 1],
          start: "center center",
          end: "center center",
          onUpdate: (self) => {
            controls.progress = self.progress;
          },
          onLeaveBack: () => {
            controls.progress = 0;
          }
        });

        chapters.forEach((chapter, index) => {
          ScrollTrigger.create({
            trigger: chapter,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) {
                controls.activeIndex = index;
                setActiveIndex(index);
              }
            }
          });
        });
      }, root);

      cleanup = () => context.revert();
    });

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, []);

  const activeChapter = journeyChapters[activeIndex];

  return (
    <section
      ref={rootRef}
      data-theme="dark"
      data-section-theme="dark"
      aria-labelledby="journey-scroll-heading"
      className="relative bg-paper pb-26 text-ink max-xl:-mt-10 max-xl:rounded-t-[40px] max-xl:pt-10 md:pb-40 md:max-xl:-mt-12 md:max-xl:rounded-t-[56px]"
    >
      <div className="gutter mx-auto max-w-content">
        <h2 id="journey-scroll-heading" className="sr-only">
          My journey
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Pinned thread and year — desktop only. */}
          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-svh flex-col justify-center py-24">
              <div className="relative h-[62svh]">
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label="A thread drawing down through each year of the journey as the page scrolls."
                  width={560}
                  height={620}
                  className="absolute inset-0 size-full"
                />
              </div>
              <p
                aria-hidden="true"
                className="mt-6 font-display text-[clamp(3.5rem,6vw,6rem)] font-light leading-none tracking-[-0.05em] text-ink"
              >
                <span key={activeChapter.id} className="inline-block animate-enter">
                  {activeChapter.year}
                </span>
              </p>
            </div>
          </div>

          <ol>
            {journeyChapters.map((chapter, index) => {
              const isInFocus = !isScrollDriven || index === activeIndex;

              return (
                <li
                  key={chapter.id}
                  data-chapter=""
                  className={cn(
                    "flex items-center border-t border-line py-16 transition-opacity duration-500 first:border-t-0 lg:min-h-[85svh] lg:border-t-0",
                    isInFocus ? "opacity-100" : "lg:opacity-30"
                  )}
                >
                  <article>
                    <p className="font-mono text-mono text-accent">{chapter.date}</p>
                    <h3 className="mt-4 font-display text-h1 text-ink">{chapter.title}</h3>
                    <div className="mt-6 max-w-prose space-y-4 text-body-lg text-muted">
                      {chapter.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))}
                    </div>
                    {chapter.todo ? (
                      <div className="mt-6 max-w-prose">
                        <TodoNote>{chapter.todo}</TodoNote>
                      </div>
                    ) : null}
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {chapter.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-full border border-line px-3.5 py-1.5 text-small text-ink"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    {chapter.links.length > 0 ? (
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        {chapter.links.map((link) =>
                          link.isExternal ? (
                            <ExternalLink key={link.href} href={link.href}>
                              {link.label}
                            </ExternalLink>
                          ) : (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="group inline-flex min-h-11 items-center gap-2 text-small font-medium text-accent"
                            >
                              {link.label}
                              <span
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              >
                                →
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
