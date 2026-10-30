import type { ExperienceEntry, SectionIntro } from "@/types/content";

export const experienceIntro: SectionIntro = {
  eyebrow: "Experience",
  title: "How I got here.",
  description: "The work, learning, and milestones that shaped how I build software today."
};

// Replace with your real history; entries render top to bottom, newest first.
export const experienceEntries: readonly ExperienceEntry[] = [
  {
    id: "independent-engineer",
    kind: "work",
    period: "2024 — Present",
    title: "Independent Software Engineer",
    organization: "Freelance",
    description:
      "Building web applications, dashboards, and AI integrations for startups and small businesses.",
    highlights: ["End-to-end delivery", "Client communication", "Production deployments"]
  },
  {
    id: "ai-projects",
    kind: "achievement",
    period: "2024",
    title: "AI & Computer Vision Projects",
    organization: "Personal R&D",
    description:
      "Explored LLM tooling, retrieval pipelines, and vision models by shipping small, focused products.",
    highlights: ["LLM integrations", "Computer vision", "Evaluation"]
  },
  {
    id: "computer-science",
    kind: "education",
    period: "2022 — Present",
    title: "Computer Science",
    organization: "University",
    description:
      "Foundations in algorithms, data structures, databases, and software engineering practice.",
    highlights: ["Algorithms", "Databases", "Software engineering"]
  }
];
