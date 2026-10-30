import { cn } from "@/lib/cn";

interface ProseProps {
  readonly paragraphs: readonly string[];
  readonly className?: string;
}

export function Prose({ paragraphs, className }: ProseProps) {
  return (
    <div className={cn("max-w-prose space-y-6 text-body text-ink", className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}
