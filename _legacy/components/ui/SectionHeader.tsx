import { Reveal } from "@/components/ui/Reveal";
import type { SectionIntro } from "@/types/content";
import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  readonly intro: SectionIntro;
  readonly titleId: string;
  readonly align?: "start" | "center";
  readonly className?: string;
}

export function SectionHeader({ intro, titleId, align = "start", className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-readable", align === "center" && "mx-auto text-center", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-cyan">{intro.eyebrow}</p>
      <h2
        id={titleId}
        className="mt-4 text-3xl font-semibold leading-[1.1] text-foreground-primary sm:text-4xl lg:text-5xl"
      >
        {intro.title}
      </h2>
      <p className="mt-5 text-base leading-7 text-foreground-secondary sm:text-lg sm:leading-8">
        {intro.description}
      </p>
    </Reveal>
  );
}
