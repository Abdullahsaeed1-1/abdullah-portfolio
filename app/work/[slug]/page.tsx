import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudyCanvas } from "@/components/case-study/CaseStudyCanvas";
import { CaseStudyExtras } from "@/components/case-study/CaseStudyExtras";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { DecisionList } from "@/components/case-study/DecisionList";
import { ThreeParts } from "@/components/case-study/ThreeParts";
import { Container, PageShell } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import { caseStudyLabels } from "@/content/case-study";
import { featuredProjects, getFeaturedProject } from "@/content/projects";
import { shotExists } from "@/lib/shots";

interface CaseStudyPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const project = getFeaturedProject((await params).slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.oneLiner,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.oneLiner,
      url: `/work/${project.slug}`,
      // A page-level openGraph replaces the root one, so the shared image is restated here.
      images: ["/opengraph-image"]
    }
  };
}

const SHOT_SIZES = "(min-width: 1200px) 1100px, 100vw";

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = getFeaturedProject((await params).slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;
  const gallery = caseStudy.gallery?.filter((shot) => shotExists(shot.src)) ?? [];
  const currentIndex = featuredProjects.indexOf(project);
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length];

  return (
    <PageShell>
      <article>
        <ThemedSection as="div" theme="dark" isFirst className="pb-26 md:pb-40">
          <CaseStudyHeader project={project} />
          <Container>
            <CaseStudyCanvas project={project} />
          </Container>
        </ThemedSection>

        <ThemedSection as="div" theme="light" className="py-10 md:py-16">
          <CaseStudySection eyebrow={caseStudyLabels.problem} id="the-problem">
            <Prose paragraphs={caseStudy.problem} className="text-body-lg" />
          </CaseStudySection>

          {caseStudy.constraints ? (
            <CaseStudySection eyebrow={caseStudyLabels.constraints} id="the-constraints">
              <p className="max-w-prose text-body text-ink">{caseStudy.constraints.intro}</p>
              <ol className="mt-10 grid max-w-prose grid-cols-1 gap-4">
                {caseStudy.constraints.items.map((item, index) => (
                  <li
                    key={item.slice(0, 40)}
                    className="flex gap-5 rounded-[20px] bg-surface p-6 text-body text-ink"
                  >
                    <span aria-hidden="true" className="font-display text-h3 text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </CaseStudySection>
          ) : null}
        </ThemedSection>

        <ThemedSection theme="dark" labelledBy="the-decisions" className="section-rhythm">
          <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
            <h2 id="the-decisions" className="eyebrow text-muted md:sticky md:top-26 md:self-start">
              {caseStudyLabels.decisions}
            </h2>
            <DecisionList decisions={caseStudy.decisions} />
          </Container>
        </ThemedSection>

        <ThemedSection as="div" theme="light" className="py-26 md:py-40">
          <Container>
            {/* Screenshots bleed past the reading column on wide screens to break the vertical rhythm. */}
            <Reveal className="lg:-mr-16 lg:ml-[25%]">
              <Screenshot shot={project.cover} accent={project.accent} sizes={SHOT_SIZES} />
            </Reveal>
          </Container>

          {caseStudy.built ? (
            <CaseStudySection eyebrow={caseStudyLabels.built} id="what-got-built">
              <Prose paragraphs={caseStudy.built} />
            </CaseStudySection>
          ) : null}

          {gallery.length ? (
            <Container className="pt-10 md:pt-16">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:-ml-16">
                {gallery.map((shot, index) => (
                  <Reveal
                    key={shot.src}
                    staggerIndex={index}
                    className={index % 2 === 1 ? "md:mt-26" : undefined}
                  >
                    <Screenshot shot={shot} sizes="(min-width: 768px) 560px, 100vw" />
                  </Reveal>
                ))}
              </div>
            </Container>
          ) : null}
        </ThemedSection>

        {caseStudy.showSystemLayers ? <ThreeParts showCaseStudyLink={false} /> : null}
        {caseStudy.extras?.length ? <CaseStudyExtras extras={caseStudy.extras} /> : null}

        {caseStudy.honest ? (
          <ThemedSection theme="signal" labelledBy="honestly" className="section-rhythm">
            <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
              <h2 id="honestly" className="eyebrow text-muted">
                {caseStudyLabels.honest}
              </h2>
              <Reveal>
                <Prose
                  paragraphs={caseStudy.honest}
                  className="max-w-[40ch] font-display text-h2"
                />
              </Reveal>
            </Container>
          </ThemedSection>
        ) : null}

        <ThemedSection as="div" theme="light" className="pb-26 pt-26 md:pb-40">
          <nav aria-label="Case studies">
            <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Link href={`/work/${nextProject.slug}`} className="group block">
                <span className="eyebrow text-muted">{caseStudyLabels.next}</span>
                <span className="mt-4 block font-display text-display text-ink transition-colors duration-150 group-hover:text-olive-deep">
                  {nextProject.name} →
                </span>
              </Link>
              <Link href="/work" className="text-small text-ink underline-offset-4 hover:underline">
                {caseStudyLabels.allWork}
              </Link>
            </Container>
          </nav>
        </ThemedSection>
      </article>
    </PageShell>
  );
}
