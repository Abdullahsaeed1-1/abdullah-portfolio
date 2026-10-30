import { Prose } from "@/components/ui/Prose";
import { TodoNote } from "@/components/ui/TodoNote";
import type { Milestone } from "@/content/types";

export function MilestoneEntry({ milestone }: { readonly milestone: Milestone }) {
  return (
    <article id={`milestone-${milestone.id}`} data-milestone="" className="relative pl-10 lg:pl-0">
      {/* On narrow screens each entry carries its own piece of the rail. */}
      <svg
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-4 lg:hidden"
        viewBox="0 0 16 100"
        preserveAspectRatio="none"
      >
        <line
          x1="8"
          y1="0"
          x2="8"
          y2="100"
          className="stroke-ink"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        aria-hidden="true"
        className={`absolute left-[3px] top-2 size-2.5 border lg:hidden ${milestone.todo ? "border-dashed border-muted bg-paper" : "border-ink bg-ink"}`}
      />

      <p className="font-mono text-mono text-muted">{milestone.date}</p>
      <h2 className="mt-2 font-display text-h1 text-ink">{milestone.title}</h2>
      <div className="mt-6">
        {milestone.todo ? (
          <TodoNote>{milestone.todo}</TodoNote>
        ) : (
          <Prose paragraphs={milestone.paragraphs} />
        )}
      </div>
    </article>
  );
}
