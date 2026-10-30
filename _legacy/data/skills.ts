import { BrainCircuit, Cloud, Database, Monitor, Server } from "lucide-react";

import type { SectionIntro, SkillGroup } from "@/types/content";

export const skillsIntro: SectionIntro = {
  eyebrow: "Technology Stack",
  title: "Tools chosen for reliability, not hype.",
  description: "A focused stack I know deeply, so projects move quickly without trading away quality."
};

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Fast, accessible interfaces.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
    icon: Monitor
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs and services that scale.",
    skills: ["Node.js", "Express", "Python", "REST APIs", "Webhooks"],
    icon: Server
  },
  {
    id: "data",
    title: "Data",
    description: "Structured, secure storage.",
    skills: ["PostgreSQL", "Supabase", "Firebase", "Prisma"],
    icon: Database
  },
  {
    id: "ai",
    title: "AI",
    description: "Useful intelligence in products.",
    skills: ["OpenAI", "Gemini", "Computer Vision", "Machine Learning"],
    icon: BrainCircuit
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "Shipping with confidence.",
    skills: ["Vercel", "Railway", "Docker", "GitHub Actions"],
    icon: Cloud
  }
];
