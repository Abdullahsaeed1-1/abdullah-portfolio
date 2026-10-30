import { ArrowUpRight } from "lucide-react";

import { Badge, Card } from "@/components/ui";
import type { Project } from "@/types/project";

interface ProjectStoryRowProps {
  readonly label: string;
  readonly text: string;
}

function ProjectStoryRow({ label, text }: ProjectStoryRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">{label}</dt>
      <dd className="text-sm leading-6 text-foreground-secondary">{text}</dd>
    </div>
  );
}

interface ProjectCardProps {
  readonly project: Project;
  readonly index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const titleId = `project-${project.slug}-title`;

  return (
    <Card as="article" isInteractive className="grid grid-cols-1 gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
          <span aria-hidden="true" className="font-mono text-accent-cyan/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <h3 id={titleId} className="mt-5 text-2xl font-semibold leading-tight text-foreground-primary md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-foreground-secondary">{project.summary}</p>

        <dl className="mt-8 grid grid-cols-2 gap-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-3">
              <dt className="text-xs text-foreground-muted">{metric.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-foreground-primary">{metric.value}</dd>
            </div>
          ))}
        </dl>

        {project.links.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3" aria-label={`${project.title} links`}>
            {project.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:text-foreground-primary focus-visible:outline-accent-cyan"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={15}
                    className="transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex flex-col justify-between gap-8 border-t border-white/[0.06] pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
        <dl className="space-y-5">
          <ProjectStoryRow label="Problem" text={project.problem} />
          <ProjectStoryRow label="Solution" text={project.solution} />
          <ProjectStoryRow label="Impact" text={project.impact} />
        </dl>

        <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Badge>{technology}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
