import { Reveal, Section, SectionHeader } from "@/components/ui";
import { processIntro, processSteps } from "@/data/process";

export function Process() {
  return (
    <Section id="process" labelledBy="process-title">
      <SectionHeader intro={processIntro} titleId="process-title" />

      <ol className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-accent-cyan/50 via-accent-blue/30 to-accent-purple/40 lg:block"
        />

        {processSteps.map((step, index) => (
          <Reveal key={step.id} as="li" staggerIndex={index} className="relative">
            <span className="relative inline-flex size-10 items-center justify-center rounded-full border border-accent-cyan/30 bg-background-primary font-mono text-sm text-accent-cyan">
              {index + 1}
            </span>
            <h3 className="mt-6 text-lg font-semibold text-foreground-primary">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground-muted">{step.description}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-foreground-secondary">
              <span className="sr-only">Outcome: </span>→ {step.outcome}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
