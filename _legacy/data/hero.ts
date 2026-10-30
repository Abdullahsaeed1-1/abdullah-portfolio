import type { HeroContent } from "@/types/hero";

export const heroContent: HeroContent = {
  eyebrow: "Software engineer · Product builder",
  title: "Abdullah Saeed",
  role: "I design and engineer premium digital products.",
  description:
    "Web platforms, AI-powered tools, and dashboards built with strong architecture, thoughtful interfaces, and performance-minded execution.",
  availability: "Available for new projects",
  actions: [
    { label: "Start a Project", href: "#contact", variant: "primary" },
    { label: "View Work", href: "#projects", variant: "secondary" }
  ],
  signals: [
    { label: "Focus", value: "Product Engineering" },
    { label: "Stack", value: "Next.js + TypeScript" },
    { label: "Edge", value: "AI-Ready Systems" }
  ],
  capabilities: ["Frontend", "Backend", "AI Workflows", "Interfaces"]
};
