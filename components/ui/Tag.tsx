import { cn } from "@/lib/cn";

interface TagProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span className={cn("eyebrow inline-block border border-line px-2 py-1 text-muted", className)}>
      {children}
    </span>
  );
}
