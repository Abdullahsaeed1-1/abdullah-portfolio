import type { ProcessStep, SectionIntro } from "@/types/content";

export const processIntro: SectionIntro = {
  eyebrow: "Process",
  title: "A predictable path from idea to launch.",
  description:
    "You always know what is happening, what comes next, and what you will receive at the end of each step."
};

export const processSteps: readonly ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    description: "We define the problem, users, constraints, and what success looks like.",
    outcome: "Clear scope"
  },
  {
    id: "design",
    title: "Design",
    description: "Architecture and interface are planned together so nothing is bolted on later.",
    outcome: "Technical plan"
  },
  {
    id: "build",
    title: "Build",
    description: "Iterative delivery with previews you can click through as the product takes shape.",
    outcome: "Working software"
  },
  {
    id: "launch",
    title: "Launch",
    description: "Performance, accessibility, and SEO checks, then a calm, monitored release.",
    outcome: "Production release"
  }
];
