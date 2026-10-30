export interface HeroAction {
  readonly label: string;
  readonly href: `#${string}` | `mailto:${string}`;
  readonly variant: "primary" | "secondary";
}

export interface HeroSignal {
  readonly label: string;
  readonly value: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly role: string;
  readonly description: string;
  readonly availability: string;
  readonly actions: readonly HeroAction[];
  readonly signals: readonly HeroSignal[];
  readonly capabilities: readonly string[];
}
