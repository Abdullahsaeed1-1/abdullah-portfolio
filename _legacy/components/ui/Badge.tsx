import { cn } from "@/utils/cn";

type BadgeTone = "neutral" | "accent" | "success";

const toneStyles: Record<BadgeTone, string> = {
  neutral: "border-white/10 bg-white/[0.04] text-foreground-secondary",
  accent: "border-accent-cyan/25 bg-accent-cyan/[0.08] text-accent-cyan",
  success: "border-status-success/25 bg-status-success/[0.08] text-status-success"
};

interface BadgeProps {
  readonly children: React.ReactNode;
  readonly tone?: BadgeTone;
  readonly className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
