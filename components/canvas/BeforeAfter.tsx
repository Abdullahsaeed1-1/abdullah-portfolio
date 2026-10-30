import { BeforeAfterSlider } from "@/components/canvas/BeforeAfterSlider";
import { beforeAfterShots } from "@/content/projects";
import { shotExists } from "@/lib/shots";

/** Server wrapper: decides at build time whether each side has a real screenshot yet. */
export function BeforeAfter() {
  return (
    <BeforeAfterSlider
      before={{ shot: beforeAfterShots.before, hasImage: shotExists(beforeAfterShots.before.src) }}
      after={{ shot: beforeAfterShots.after, hasImage: shotExists(beforeAfterShots.after.src) }}
    />
  );
}
