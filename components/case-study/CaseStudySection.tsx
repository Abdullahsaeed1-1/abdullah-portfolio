import { Container } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface CaseStudySectionProps {
  readonly eyebrow: string;
  readonly id: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

/** Eyebrow in a narrow left column that stays in view; content in the reading column. */
export function CaseStudySection({ eyebrow, id, children, className }: CaseStudySectionProps) {
  return (
    <section aria-labelledby={id} className={cn("py-16 md:py-20", className)}>
      <Container className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10">
        <h2 id={id} className="eyebrow text-muted md:sticky md:top-26 md:self-start">
          {eyebrow}
        </h2>
        <Reveal>{children}</Reveal>
      </Container>
    </section>
  );
}
