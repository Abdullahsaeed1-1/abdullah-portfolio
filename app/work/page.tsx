import type { Metadata } from "next";

import { Container, PageShell } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompactProjectCard } from "@/components/work/CompactProjectCard";
import { ProjectCard } from "@/components/work/ProjectCard";
import { featuredSection } from "@/content/home";
import { featuredProjects, otherProjects } from "@/content/projects";
import { workPage } from "@/content/work";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Work",
  description: featuredSection.heading,
  alternates: { canonical: "/work" }
};

export default function WorkPage() {
  return (
    <PageShell>
      <ThemedSection
        theme="dark"
        isFirst
        labelledBy="work-heading"
        className="pb-26 pt-16 md:pb-40 md:pt-26"
      >
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={featuredSection.eyebrow}
            heading={featuredSection.heading}
            headingId="work-heading"
          />

          <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:mt-26 md:grid-cols-2 md:gap-y-26">
            {featuredProjects.map((project, index) => (
              <li key={project.slug} className={cn(index % 2 === 1 && "md:mt-26")}>
                <Reveal staggerIndex={index % 2}>
                  <ProjectCard project={project} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </ThemedSection>

      <ThemedSection theme="light" labelledBy="other-work-heading" className="section-rhythm">
        <Container>
          <h2 id="other-work-heading" className="eyebrow text-muted">
            {workPage.otherEyebrow}
          </h2>
          <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, index) => (
              <li key={project.name}>
                <Reveal staggerIndex={index % 3}>
                  <CompactProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </ThemedSection>

      <ThemedSection theme="dark" labelledBy="more-work-heading" className="section-rhythm">
        <Container>
          <Reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-accent">{workPage.more.eyebrow}</p>
              <h2
                id="more-work-heading"
                className="mt-4 max-w-[20ch] font-display text-h1 text-ink"
              >
                {workPage.more.heading}
              </h2>
              <p className="mt-6 max-w-[52ch] text-body-lg text-muted">{workPage.more.line}</p>
            </div>
            <ButtonLink href={workPage.more.action.href} variant="primary" className="shrink-0">
              {workPage.more.action.label} →
            </ButtonLink>
          </Reveal>
        </Container>
      </ThemedSection>
    </PageShell>
  );
}
