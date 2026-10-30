import type { LucideIcon } from "lucide-react";

export interface SectionIntro {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface AboutHighlight {
  readonly value: string;
  readonly label: string;
}

export interface AboutPrinciple {
  readonly title: string;
  readonly description: string;
}

export interface AboutContent {
  readonly intro: SectionIntro;
  readonly story: readonly string[];
  readonly principles: readonly AboutPrinciple[];
  readonly highlights: readonly AboutHighlight[];
}

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly deliverables: readonly string[];
  readonly icon: LucideIcon;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly skills: readonly string[];
  readonly icon: LucideIcon;
}

export interface ProcessStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly outcome: string;
}

export type ExperienceKind = "work" | "education" | "achievement";

export interface ExperienceEntry {
  readonly id: string;
  readonly kind: ExperienceKind;
  readonly period: string;
  readonly title: string;
  readonly organization: string;
  readonly description: string;
  readonly highlights: readonly string[];
}

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}
