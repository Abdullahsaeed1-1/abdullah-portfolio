import Link from "next/link";

import { Container } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { clientsSection } from "@/content/clients";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
}

export function Clients() {
  const { testimonial, engagements, tools } = clientsSection;

  return (
    <ThemedSection
      theme="dark"
      id="clients"
      labelledBy="clients-heading"
      className="section-rhythm scroll-mt-20"
    >
      <Container>
        <p className="eyebrow text-muted">{clientsSection.eyebrow}</p>
        <h2 id="clients-heading" className="mt-4 max-w-[24ch] font-display text-h1 text-ink">
          {clientsSection.heading}
        </h2>

        <Reveal className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-16 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <figure>
            <span aria-hidden="true" className="font-display text-[5rem] leading-none text-accent">
              “
            </span>
            <blockquote className="-mt-6 font-display text-h2 font-normal leading-snug text-ink">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent font-display text-small font-semibold text-coal"
              >
                {initials(testimonial.name)}
              </span>
              <span>
                <span className="block font-medium text-ink">{testimonial.name}</span>
                <span className="block text-small text-muted">{testimonial.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-end gap-6">
            <ul className="flex flex-wrap gap-2">
              {testimonial.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3 py-1.5 text-small text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <a
              href={testimonial.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-mono text-muted underline-offset-4 hover:text-accent hover:underline"
            >
              {testimonial.source.label} ↗
            </a>
          </div>
        </Reveal>

        <ul className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {engagements.map((engagement, index) => (
            <li key={engagement.title}>
              <Reveal
                staggerIndex={index}
                className="flex h-full flex-col rounded-[24px] bg-surface p-6 md:p-8"
              >
                <p className="font-mono text-mono text-accent">{engagement.period}</p>
                <h3 className="mt-3 font-display text-h3 text-ink">{engagement.title}</h3>
                <p className="mt-3 text-small text-muted">{engagement.summary}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {engagement.items.map((item) => (
                    <li key={item} className="flex gap-3 text-small text-ink">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                {engagement.links.length > 0 ? (
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
                    {engagement.links.map((link) =>
                      link.href.startsWith("http") ? (
                        <ExternalLink key={link.href} href={link.href}>
                          {link.label}
                        </ExternalLink>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 text-small font-medium text-accent"
                        >
                          {link.label}
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </Link>
                      )
                    )}
                  </div>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ul>

        <ul
          className="mt-10 flex flex-wrap items-center gap-2"
          aria-label="Platforms used for clients"
        >
          {tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full bg-surface px-3.5 py-1.5 font-mono text-mono text-muted"
            >
              {tool}
            </li>
          ))}
        </ul>
      </Container>
    </ThemedSection>
  );
}
