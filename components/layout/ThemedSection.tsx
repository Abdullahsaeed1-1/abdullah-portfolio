import { cn } from "@/lib/cn";
import type { SectionTheme } from "@/lib/tokens";

interface ThemedSectionProps {
  readonly theme: SectionTheme;
  readonly children: React.ReactNode;
  readonly as?: "section" | "header" | "footer" | "div";
  readonly id?: string;
  readonly labelledBy?: string;
  /** The first block on a page sits flush under the nav; every later one overlaps as a divider. */
  readonly isFirst?: boolean;
  readonly className?: string;
}

/**
 * A full-bleed block with its own colour theme. Each one after the first rides up over the
 * previous block with a rounded top edge, so the colour change reads as a divider while scrolling.
 */
export function ThemedSection({
  theme,
  children,
  as: Element = "section",
  id,
  labelledBy,
  isFirst = false,
  className
}: ThemedSectionProps) {
  return (
    <Element
      id={id}
      aria-labelledby={labelledBy}
      data-theme={theme}
      data-section-theme={theme}
      className={cn(
        "relative bg-paper text-ink",
        !isFirst && "-mt-10 rounded-t-[40px] md:-mt-12 md:rounded-t-[56px]",
        className
      )}
    >
      {children}
    </Element>
  );
}
