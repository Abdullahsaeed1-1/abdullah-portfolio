import { Container } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import { TodoNote } from "@/components/ui/TodoNote";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { CaseStudyExtra } from "@/content/types";
import { cn } from "@/lib/cn";
import { shotExists } from "@/lib/shots";

/**
 * Work that does not fit the standard case-study sections — an app, a print piece, a campaign.
 * Blocks alternate between the light and dark themes so each reads as its own chapter.
 */
export function CaseStudyExtras({ extras }: { readonly extras: readonly CaseStudyExtra[] }) {
  return (
    <>
      {extras.map((extra, index) => {
        // Only screenshots that exist; a missing one is left out rather than shown as an empty frame.
        const gallery = extra.gallery?.filter((shot) => shotExists(shot.src)) ?? [];

        return (
          <ThemedSection
            key={extra.id}
            as="section"
            theme={index % 2 === 0 ? "dark" : "light"}
            labelledBy={`extra-${extra.id}`}
            className="section-rhythm"
          >
            <Container>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
                <Reveal>
                  <p className="eyebrow text-accent">{extra.eyebrow}</p>
                  <h2 id={`extra-${extra.id}`} className="mt-4 font-display text-h1 text-ink">
                    {extra.heading}
                  </h2>
                  {extra.links?.length ? (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {extra.links.map((link) => (
                        <ExternalLink key={link.href} href={link.href}>
                          {link.label}
                        </ExternalLink>
                      ))}
                    </div>
                  ) : null}
                </Reveal>

                <Reveal staggerIndex={1}>
                  <Prose paragraphs={extra.paragraphs} className="text-body-lg" />
                  {extra.items?.length ? (
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {extra.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line px-3.5 py-1.5 text-small text-ink"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {extra.todo ? (
                    <div className="mt-8">
                      <TodoNote>{extra.todo}</TodoNote>
                    </div>
                  ) : null}
                </Reveal>
              </div>

              {gallery.length ? (
                <div
                  className={cn(
                    "mt-16 grid grid-cols-1 gap-6",
                    gallery.length === 2 && "md:grid-cols-2",
                    gallery.length === 3 && "md:grid-cols-3",
                    gallery.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4"
                  )}
                >
                  {gallery.map((shot, shotIndex) => (
                    <Reveal key={shot.src} staggerIndex={shotIndex}>
                      <Screenshot shot={shot} sizes="(min-width: 768px) 600px, 100vw" />
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </Container>
          </ThemedSection>
        );
      })}
    </>
  );
}
