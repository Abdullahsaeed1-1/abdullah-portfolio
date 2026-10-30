// The timetable system taken apart, layer by layer; every figure is from CONTENT.md.
export const threeParts = {
  eyebrow: "Inside the timetable system",
  heading: "Three parts, one conflict-free week.",
  canvasLabel:
    "The timetable system drawn as three stacked glass layers that separate as you scroll: the interface, the API and the solver, each labelled.",
  parts: [
    {
      name: "Interface",
      value: "React + Flutter",
      caption: "Web admin with granular locking · teacher app with a live countdown"
    },
    {
      name: "API",
      value: "40 endpoints",
      caption: "Zod-validated · JWT + RBAC · optimistic locking"
    },
    {
      name: "Solver",
      value: "4 stages",
      caption: "OR-Tools CP-SAT · zero double-booking"
    }
  ],
  link: { label: "Read the case study", href: "/work/timetable" }
} as const;

export type ThreePart = (typeof threeParts.parts)[number];
