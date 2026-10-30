import { Award, Briefcase, GraduationCap, type LucideIcon } from "lucide-react";

import { Badge, Reveal, Section, SectionHeader } from "@/components/ui";
import { experienceEntries, experienceIntro } from "@/data/experience";
import type { ExperienceKind } from "@/types/content";

const experienceKindIcons: Record<ExperienceKind, LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Award
};

const experienceKindLabels: Record<ExperienceKind, string> = {
  work: "Work",
  education: "Education",
  achievement: "Milestone"
};

export function Timeline() {
  return (
    <Section id="timeline" labelledBy="timeline-title" className="bg-background-secondary/30">
      <SectionHeader intro={experienceIntro} titleId="timeline-title" />

      <ol className="relative mt-14 max-w-3xl space-y-10 border-l border-white/10 pl-8 md:pl-10">
        {experienceEntries.map((entry, index) => {
          const KindIcon = experienceKindIcons[entry.kind];

          return (
            <Reveal key={entry.id} as="li" staggerIndex={index} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[49px] top-0 inline-flex size-8 items-center justify-center rounded-full border border-accent-cyan/30 bg-background-primary text-accent-cyan md:-left-[57px]"
              >
                <KindIcon size={14} strokeWidth={1.75} />
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <time className="font-mono text-xs text-foreground-muted">{entry.period}</time>
                <Badge tone={index === 0 ? "accent" : "neutral"}>{experienceKindLabels[entry.kind]}</Badge>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-foreground-primary">{entry.title}</h3>
              <p className="mt-1 text-sm font-medium text-foreground-secondary">{entry.organization}</p>
              <p className="mt-3 text-sm leading-6 text-foreground-muted">{entry.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${entry.title} highlights`}>
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>
                    <Badge>{highlight}</Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
