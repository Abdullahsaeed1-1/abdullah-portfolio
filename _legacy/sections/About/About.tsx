import { Card, Reveal, Section, SectionHeader } from "@/components/ui";
import { aboutContent } from "@/data/about";

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <SectionHeader intro={aboutContent.intro} titleId="about-title" />

          <div className="mt-8 space-y-5">
            {aboutContent.story.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 32)} staggerIndex={index + 1}>
                <p className="max-w-readable text-base leading-7 text-foreground-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08]">
            {aboutContent.highlights.map((highlight) => (
              <div key={highlight.label} className="bg-background-primary px-5 py-4">
                <dt className="sr-only">{highlight.label}</dt>
                <dd>
                  <span className="block text-lg font-semibold text-foreground-primary">{highlight.value}</span>
                  <span className="mt-1 block text-xs text-foreground-muted">{highlight.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="flex flex-col gap-4 lg:pt-16" aria-label="Working principles">
          {aboutContent.principles.map((principle, index) => (
            <Reveal key={principle.title} as="li" staggerIndex={index + 1}>
              <Card isInteractive className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-medium text-accent-cyan/80"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground-primary">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground-muted">{principle.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
