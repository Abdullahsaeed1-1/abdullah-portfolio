import type { Milestone } from "@/content/types";

const RAIL_X = 12;
const TOP_Y = 24;
const STEP_Y = 120;
const NODE_SIZE = 10;

/** The static SVG timeline: the complete fallback for the 3D thread, and what renders without JavaScript. */
export function JourneyRail({ milestones }: { readonly milestones: readonly Milestone[] }) {
  const height = TOP_Y * 2 + STEP_Y * (milestones.length - 1);

  return (
    <svg
      viewBox={`0 0 240 ${height}`}
      width="240"
      height={height}
      className="h-auto w-full max-w-[240px]"
      role="img"
      aria-label={`Timeline: ${milestones.map((milestone) => `${milestone.date}, ${milestone.title}`).join("; ")}`}
    >
      <line
        x1={RAIL_X}
        y1={TOP_Y}
        x2={RAIL_X}
        y2={height - TOP_Y}
        className="stroke-ink"
        strokeWidth="1"
      />
      {milestones.map((milestone, index) => {
        const y = TOP_Y + index * STEP_Y;
        const isMissing = Boolean(milestone.todo);

        return (
          <g key={milestone.id}>
            <rect
              x={RAIL_X - NODE_SIZE / 2}
              y={y - NODE_SIZE / 2}
              width={NODE_SIZE}
              height={NODE_SIZE}
              className={isMissing ? "fill-paper stroke-muted" : "fill-ink stroke-ink"}
              strokeDasharray={isMissing ? "2 2" : undefined}
            />
            <text x={RAIL_X + 20} y={y - 4} className="fill-muted font-mono text-[11px]">
              {milestone.date}
            </text>
            <text x={RAIL_X + 20} y={y + 14} className="fill-ink font-sans text-[13px]">
              {milestone.title}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
