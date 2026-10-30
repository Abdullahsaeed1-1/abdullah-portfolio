import { Bot, Code, LayoutDashboard, PanelsTopLeft, Plug, Workflow } from "lucide-react";

import type { SectionIntro, Service } from "@/types/content";

export const servicesIntro: SectionIntro = {
  eyebrow: "Services",
  title: "What I can build for you.",
  description:
    "Focused engagements with clear deliverables. Each one is scoped around the outcome you need, not the hours it takes."
};

export const services: readonly Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    summary: "Production-grade web applications and marketing sites built on Next.js and TypeScript.",
    deliverables: ["App Router architecture", "SEO & Core Web Vitals", "CMS-ready content"],
    icon: Code
  },
  {
    id: "ai-development",
    title: "AI Development",
    summary: "Practical AI features — assistants, document processing, and vision — wired into real products.",
    deliverables: ["LLM integrations", "Retrieval pipelines", "Evaluation & guardrails"],
    icon: Bot
  },
  {
    id: "dashboard-development",
    title: "Dashboard Development",
    summary: "Data-dense admin panels and analytics dashboards that stay fast and readable.",
    deliverables: ["Role-based access", "Charts & reporting", "Realtime updates"],
    icon: LayoutDashboard
  },
  {
    id: "automation",
    title: "Automation",
    summary: "Scripts and workflows that remove repetitive manual work from your team's day.",
    deliverables: ["Workflow automation", "Scheduled jobs", "Data syncing"],
    icon: Workflow
  },
  {
    id: "api-integration",
    title: "API Integration",
    summary: "Reliable connections between your product and payment, email, CRM, or AI providers.",
    deliverables: ["REST & webhook design", "Error handling & retries", "Typed SDK layers"],
    icon: Plug
  },
  {
    id: "ui-development",
    title: "UI Development",
    summary: "Design systems and interfaces that are accessible, responsive, and pleasant to use.",
    deliverables: ["Component libraries", "Motion & interaction", "WCAG AA accessibility"],
    icon: PanelsTopLeft
  }
];
