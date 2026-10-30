import Link from "next/link";

import { Screenshot } from "@/components/ui/Screenshot";
import type { FeaturedProject } from "@/content/types";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  readonly project: FeaturedProject;
  /** h3 under a section heading (home), h2 directly under the page title (/work). */
  readonly headingLevel?: "h2" | "h3";
  readonly className?: string;
}

/** Hover darkens the frame edge and nudges the cover up 4px; the arrow slides to invite the click. */
export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
  className
}: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className={cn("group block", className)}>
      <Screenshot
        shot={project.cover}
        accent={project.accent}
        title={project.oneLiner}
        isLandscapeFrame
        sizes="(min-width: 768px) 600px, 100vw"
        className="transition-colors duration-150 group-hover:border-ink"
        imageClassName="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
      />
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <Heading className="font-display text-h2 text-ink">{project.name}</Heading>
        <span
          aria-hidden="true"
          className="text-h3 text-ink transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
      <p className="mt-2 font-mono text-mono text-muted">{project.stack.slice(0, 5).join(" · ")}</p>
    </Link>
  );
}
