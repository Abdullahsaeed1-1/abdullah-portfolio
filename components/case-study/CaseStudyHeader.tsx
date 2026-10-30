import { Container } from "@/components/layout/PageShell";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { caseStudyLabels } from "@/content/case-study";
import type { FeaturedProject } from "@/content/types";
import { enterStyle } from "@/lib/motion";

export function CaseStudyHeader({ project }: { readonly project: FeaturedProject }) {
  const meta = [
    { label: caseStudyLabels.role, value: project.role },
    { label: caseStudyLabels.stack, value: project.stack.join(", ") },
    ...(project.year ? [{ label: caseStudyLabels.year, value: project.year }] : [])
  ];

  return (
    <header className="pb-16 pt-16 md:pb-26 md:pt-26">
      <Container>
        <p className="eyebrow animate-enter text-muted" style={enterStyle(0)}>
          {caseStudyLabels.eyebrow}
        </p>
        {/* The title runs wider than the reading column on purpose: the header breaks the grid. */}
        <h1 className="mt-6 max-w-[18ch] [overflow-wrap:anywhere] font-display text-display text-ink">
          {project.title}
        </h1>
        <p className="mt-10 max-w-[52ch] text-body-lg text-ink md:ml-[25%]">{project.oneLiner}</p>

        <dl
          className="mt-16 grid animate-enter grid-cols-1 gap-6 border-t border-line pt-6 font-mono text-mono md:grid-cols-[1fr_3fr_1fr] md:gap-10"
          style={enterStyle(1)}
        >
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="eyebrow text-muted">{item.label}</dt>
              <dd className="mt-2 text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        {project.links?.length ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
