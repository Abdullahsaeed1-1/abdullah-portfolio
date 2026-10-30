import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly heading?: string;
  readonly headingId?: string;
  readonly as?: "h1" | "h2";
  readonly className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  headingId,
  as: Heading = "h2",
  className
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <p className="eyebrow shrink-0 text-muted">{eyebrow}</p>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      {heading ? (
        <Heading
          id={headingId}
          className={cn(
            "mt-6 max-w-[26ch] font-display text-ink",
            Heading === "h1" ? "text-h1" : "text-h2"
          )}
        >
          {heading}
        </Heading>
      ) : null}
    </div>
  );
}
