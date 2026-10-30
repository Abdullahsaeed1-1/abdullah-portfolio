import { BeforeAfter } from "@/components/canvas/BeforeAfter";
import { SolverGrid } from "@/components/canvas/SolverGrid";
import { ToolGraph } from "@/components/canvas/ToolGraph";
import { VoiceOrb } from "@/components/canvas/VoiceOrb";
import type { CaseStudyCanvas as CanvasKind, FeaturedProject } from "@/content/types";
import { cn } from "@/lib/cn";

function CanvasPiece({ kind, label }: { readonly kind: CanvasKind; readonly label: string }) {
  switch (kind) {
    case "solver":
      return <SolverGrid label={label} />;
    case "voice":
      return <VoiceOrb label={label} />;
    case "tool-graph":
      return <ToolGraph label={label} />;
    case "before-after":
      return <BeforeAfter />;
  }
}

// Narrower pieces sit off-centre to the right; the comparison and the graph use the full column.
const widthByCanvas: Record<CanvasKind, string> = {
  solver: "md:ml-auto md:w-[72%]",
  voice: "md:ml-auto md:w-[56%]",
  "tool-graph": "w-full",
  "before-after": "w-full"
};

/** The project's hand-drawn piece, if it has one; projects without a canvas render nothing. */
export function CaseStudyCanvas({ project }: { readonly project: FeaturedProject }) {
  if (!project.canvas) {
    return null;
  }

  return (
    <figure className={cn(widthByCanvas[project.canvas])}>
      <CanvasPiece kind={project.canvas} label={project.canvasLabel ?? project.title} />
      {project.canvasCaption ? (
        <figcaption className="mt-4 font-mono text-mono text-ink">
          {project.canvasCaption}
        </figcaption>
      ) : null}
    </figure>
  );
}
