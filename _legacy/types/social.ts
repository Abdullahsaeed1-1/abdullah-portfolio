export type SocialPlatform = "github" | "linkedin" | "email";

export interface SocialLink {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly href: string;
}
