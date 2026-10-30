export type ShotPath = `/shots/${string}.png`;

export interface Screenshot {
  readonly src: ShotPath;
  /** Shown on the placeholder until the real file exists in public/shots. */
  readonly label: string;
  readonly alt: string;
  /**
   * "portrait" for phone screenshots and print pages, "small" for small windows such as an
   * installer: both are shown whole on a dark mat instead of being cropped to fill the frame.
   */
  readonly fit?: "portrait" | "small";
}

export interface Decision {
  readonly title: string;
  readonly paragraphs: readonly string[];
}

export interface Constraints {
  readonly intro: string;
  readonly items: readonly string[];
}

/** A titled block for work that does not fit the standard five sections (an app, a campaign...). */
export interface CaseStudyExtra {
  readonly id: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly items?: readonly string[];
  /** Real figures still to be supplied; rendered as a visible TODO. */
  readonly todo?: string;
  readonly gallery?: readonly Screenshot[];
  readonly links?: readonly LinkCopy[];
}

/** Sections are optional because CONTENT.md does not supply every section for every project. */
export interface CaseStudy {
  readonly problem: readonly string[];
  readonly constraints?: Constraints;
  readonly decisions: readonly Decision[];
  readonly built?: readonly string[];
  readonly honest?: readonly string[];
  readonly gallery?: readonly Screenshot[];
  readonly extras?: readonly CaseStudyExtra[];
  /** Show the exploded three-layer view of the system on this case study. */
  readonly showSystemLayers?: boolean;
}

/** Colour of the project's cover panel while no screenshot exists, and of its case-study header accent. */
export type ProjectAccent = "signal" | "cobalt" | "acid" | "night";

export type CaseStudyCanvas = "solver" | "voice" | "tool-graph" | "before-after";

export interface FeaturedProject {
  readonly slug: string;
  readonly name: string;
  readonly title: string;
  readonly oneLiner: string;
  readonly role: string;
  readonly stack: readonly string[];
  /** Omitted where CONTENT.md gives no confirmed date. */
  readonly year?: string;
  readonly cover: Screenshot;
  readonly accent: ProjectAccent;
  /** External places to see the work: the live site, the project page on Thinkova. */
  readonly links?: readonly LinkCopy[];
  /** Optional hand-drawn piece at the top of the case study. */
  readonly canvas?: CaseStudyCanvas;
  /** Accessible description of the canvas, also its fallback content. */
  readonly canvasLabel?: string;
  /** Visible text alternative printed beside the canvas, so the page reads without JavaScript. */
  readonly canvasCaption?: string;
  readonly caseStudy: CaseStudy;
}

export interface CompactProject {
  readonly name: string;
  readonly descriptor?: string;
  readonly role?: string;
  readonly stack: readonly string[];
  readonly description: string;
  readonly shot?: Screenshot;
  /** Further screenshots shown smaller under the main one. */
  readonly moreShots?: readonly Screenshot[];
  readonly links?: readonly LinkCopy[];
}

export interface Milestone {
  readonly id: string;
  readonly date: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  /** Rendered visibly; never replaced with invented copy. */
  readonly todo?: string;
}

export interface StatLine {
  /** Set very large. */
  readonly value: string;
  readonly unit: string;
  readonly detail: string;
}

export interface SectionCopy {
  readonly eyebrow: string;
  readonly heading: string;
}

export interface LinkCopy {
  readonly label: string;
  readonly href: string;
}
