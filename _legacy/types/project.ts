export interface ProjectLink {
  readonly label: "Live Demo" | "Source Code" | "Case Study";
  readonly href: string;
}

export interface ProjectMetric {
  readonly value: string;
  readonly label: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly summary: string;
  readonly problem: string;
  readonly solution: string;
  readonly impact: string;
  readonly technologies: readonly string[];
  readonly metrics: readonly ProjectMetric[];
  readonly links: readonly ProjectLink[];
  readonly isFeatured: boolean;
}
