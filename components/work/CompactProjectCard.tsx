import { ExternalLink } from "@/components/ui/ExternalLink";
import { Screenshot } from "@/components/ui/Screenshot";
import type { CompactProject } from "@/content/types";

/** Smaller projects: no detail page, so the card is not a link. */
export function CompactProjectCard({ project }: { readonly project: CompactProject }) {
  return (
    <article className="h-full rounded-[20px] bg-surface p-6 md:p-8">
      {project.shot ? (
        <div className="mb-6 space-y-3">
          {[project.shot, ...(project.moreShots ?? [])].map((shot) => (
            <Screenshot key={shot.src} shot={shot} sizes="(min-width: 768px) 380px, 100vw" />
          ))}
        </div>
      ) : null}
      <h3 className="font-display text-h2 text-ink">{project.name}</h3>
      {project.descriptor || project.role ? (
        <p className="mt-2 text-small text-muted">
          {[project.descriptor, project.role].filter(Boolean).join(" · ")}
        </p>
      ) : null}
      <p className="mt-4 text-body text-ink">{project.description}</p>
      <p className="mt-4 font-mono text-mono text-muted">{project.stack.join(" · ")}</p>
      {project.links?.length ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      ) : null}
    </article>
  );
}
