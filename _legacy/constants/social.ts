import { siteConfig } from "@/config/site";
import type { SocialLink } from "@/types/social";

const allSocialLinks: readonly SocialLink[] = [
  { platform: "github", label: "GitHub", href: siteConfig.links.github },
  { platform: "linkedin", label: "LinkedIn", href: siteConfig.links.linkedin },
  {
    platform: "email",
    label: "Email",
    href: siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : ""
  }
];

// Unconfigured profiles are dropped so the UI never renders dead links.
export const socialLinks = allSocialLinks.filter((link) => link.href.length > 0);
