import Link from "next/link";

import { Container } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { heroSequence } from "@/content/hero-sequence";
import { featuredProjects } from "@/content/projects";

// "Igris — voice-first AI agent" → "voice-first AI agent".
function describe(title: string) {
  const [, descriptor] = title.split(" — ");
  return descriptor ?? title;
}

const rowClass =
  "group flex min-h-14 items-center justify-between gap-4 border-b border-line py-4 transition-colors duration-200 hover:text-accent";

/**
 * Below 1280px the floating hero panels have no room, so the same work, clients and experience
 * render here as ordinary sections straight after the hero.
 */
export function HeroProof() {
  const { work, workedWith, experience, testimonial } = heroSequence;

  return (
    <ThemedSection
      theme="light"
      labelledBy="proof-work-heading"
      className="py-20 md:py-26 xl:hidden"
    >
      <Container className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
        <section aria-labelledby="proof-work-heading">
          <p className="eyebrow text-accent">{work.label}</p>
          <h2 id="proof-work-heading" className="mt-3 font-display text-h2 text-ink">
            {heroSequence.windowLine.strong} {heroSequence.windowLine.soft}
          </h2>
          <ul className="mt-6 border-t border-line">
            {featuredProjects.map((project, index) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className={rowClass}>
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-mono text-accent">0{index + 1}</span>
                    <span>
                      <span className="block font-display text-h3 text-ink">{project.name}</span>
                      <span className="block text-small text-muted">{describe(project.title)}</span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href={work.allHref}
              className="inline-flex min-h-11 items-center text-small font-medium text-accent"
            >
              {work.allLabel} →
            </Link>
            <Link
              href={work.moreHref}
              className="inline-flex min-h-11 items-center text-small text-muted hover:text-ink"
            >
              {work.moreNote} →
            </Link>
          </div>
        </section>

        <div className="space-y-16">
          <section aria-labelledby="proof-clients-heading">
            <p className="eyebrow text-accent">{workedWith.label}</p>
            <h2 id="proof-clients-heading" className="sr-only">
              {workedWith.label}
            </h2>
            <ul className="mt-6 border-t border-line">
              {workedWith.items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClass}
                  >
                    <span>
                      <span className="block font-display text-h3 text-ink">{item.name}</span>
                      <span className="block text-small text-muted">{item.role}</span>
                    </span>
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="proof-experience-heading"
            className="rounded-[24px] bg-surface p-6"
          >
            <p className="eyebrow text-accent">{experience.label}</p>
            <h2 id="proof-experience-heading" className="mt-3 flex items-baseline gap-3">
              <span className="font-display text-stat text-ink">{experience.value}</span>
              <span className="font-display text-h3 text-ink">{experience.unit}</span>
            </h2>
            <ul className="mt-4 space-y-2">
              {experience.lines.map((line) => (
                <li key={line} className="text-small text-ink">
                  — {line}
                </li>
              ))}
            </ul>
            <figure className="mt-6 border-t border-line pt-6">
              <blockquote className="font-display text-h3 text-ink">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-2 text-small text-muted">
                {testimonial.name}, {testimonial.role}
              </figcaption>
            </figure>
          </section>
        </div>
      </Container>
    </ThemedSection>
  );
}
