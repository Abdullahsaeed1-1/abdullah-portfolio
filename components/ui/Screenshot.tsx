import Image from "next/image";

import type { ProjectAccent, Screenshot as ScreenshotData } from "@/content/types";
import { cn } from "@/lib/cn";
import { shotExists } from "@/lib/shots";

const accentPanelStyles: Record<ProjectAccent, string> = {
  signal: "bg-olive text-coal",
  cobalt: "bg-cream text-coal",
  acid: "bg-olive text-coal",
  night: "bg-night text-cream"
};

interface ScreenshotProps {
  readonly shot: ScreenshotData;
  readonly sizes: string;
  /** Colours the placeholder panel until the real screenshot is added. */
  readonly accent?: ProjectAccent;
  /** Large name printed on the placeholder panel. */
  readonly title?: string;
  readonly priority?: boolean;
  /** Keep the landscape frame even for portrait shots, so cards in a grid line up. */
  readonly isLandscapeFrame?: boolean;
  readonly className?: string;
  readonly imageClassName?: string;
}

/** A rounded frame with a fixed aspect ratio so nothing shifts while images load. */
export function Screenshot({
  shot,
  sizes,
  accent,
  title,
  priority = false,
  isLandscapeFrame = false,
  className,
  imageClassName
}: ScreenshotProps) {
  const hasImage = shotExists(shot.src);
  const isMatted = hasImage && shot.fit !== undefined;
  const isTall = shot.fit === "portrait" && !isLandscapeFrame;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-line",
        isTall ? "aspect-[3/4]" : "aspect-[16/10]",
        accent && !hasImage ? accentPanelStyles[accent] : isMatted ? "bg-night" : "bg-surface",
        className
      )}
    >
      {hasImage ? (
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            isMatted ? "object-contain p-4 md:p-6" : "object-cover object-top",
            imageClassName
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder — ${shot.alt}`}
          className={cn("flex size-full flex-col justify-between p-6 md:p-8", imageClassName)}
        >
          {title ? (
            <span className="max-w-[18ch] font-display text-h3 sm:text-h2">{title}</span>
          ) : (
            <span />
          )}
          <span className={cn("font-mono text-mono", accent ? "opacity-80" : "text-ink")}>
            {shot.label}
          </span>
        </div>
      )}
    </div>
  );
}
