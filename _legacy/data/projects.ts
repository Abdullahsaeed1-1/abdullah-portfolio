import type { SectionIntro } from "@/types/content";
import type { Project } from "@/types/project";

export const projectsIntro: SectionIntro = {
  eyebrow: "Selected Work",
  title: "Products, not assignments.",
  description:
    "Each project starts with a real problem. Here is what was broken, what I built, and what changed because of it."
};

// Replace these entries with your real projects; links render only when provided.
export const projects: readonly Project[] = [
  {
    slug: "ai-document-assistant",
    title: "AI Document Assistant",
    category: "AI Development",
    year: "2025",
    summary: "A workspace that lets teams ask questions across their PDFs and get cited answers.",
    problem: "Teams lost hours searching long policy and contract documents for specific answers.",
    solution:
      "A retrieval pipeline that chunks, embeds, and indexes documents, with an assistant that answers with source citations.",
    impact: "Answers that used to need a manual search arrive in seconds, with the source one click away.",
    technologies: ["Next.js", "TypeScript", "Python", "PostgreSQL", "OpenAI"],
    metrics: [
      { value: "Full-stack", label: "Role" },
      { value: "RAG", label: "Architecture" }
    ],
    links: [],
    isFeatured: true
  },
  {
    slug: "operations-dashboard",
    title: "Operations Dashboard",
    category: "Dashboard Development",
    year: "2025",
    summary: "A realtime dashboard that gives managers one view of orders, inventory, and team workload.",
    problem: "Operational data lived in spreadsheets, so decisions were made on yesterday's numbers.",
    solution:
      "A role-based dashboard backed by Supabase with live updates, filters, and exportable reports.",
    impact: "Managers review current numbers in one place instead of reconciling several spreadsheets.",
    technologies: ["React", "Next.js", "Supabase", "Tailwind CSS"],
    metrics: [
      { value: "Realtime", label: "Data" },
      { value: "RBAC", label: "Access" }
    ],
    links: [],
    isFeatured: true
  },
  {
    slug: "workflow-automation-suite",
    title: "Workflow Automation Suite",
    category: "Automation",
    year: "2024",
    summary: "Background jobs that sync leads, send follow-ups, and generate weekly reports automatically.",
    problem: "A small team spent part of every day copying data between tools and sending routine emails.",
    solution:
      "Scheduled Node.js workers with webhook triggers, retries, and a simple log so failures are never silent.",
    impact: "Routine data entry moved off the team's plate and into reliable, observable jobs.",
    technologies: ["Node.js", "Express", "PostgreSQL", "Docker", "GitHub Actions"],
    metrics: [
      { value: "Backend", label: "Role" },
      { value: "Scheduled", label: "Jobs" }
    ],
    links: [],
    isFeatured: true
  }
];

export const featuredProjects = projects.filter((project) => project.isFeatured);
