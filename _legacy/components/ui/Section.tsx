import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";

interface SectionProps {
  readonly id: string;
  readonly labelledBy: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Section({ id, labelledBy, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={-1}
      className={cn("relative scroll-mt-20 py-24 focus:outline-none md:py-32", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
