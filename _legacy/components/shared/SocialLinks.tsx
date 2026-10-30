import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import { socialLinks } from "@/constants/social";
import type { SocialPlatform } from "@/types/social";
import { cn } from "@/utils/cn";

function SocialIcon({ platform }: { readonly platform: SocialPlatform }) {
  switch (platform) {
    case "github":
      return <GitHubIcon size={17} />;
    case "linkedin":
      return <LinkedInIcon size={16} />;
    case "email":
      return <Mail aria-hidden="true" size={17} />;
  }
}

interface SocialLinksProps {
  readonly className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <ul className={cn("flex items-center gap-2", className)} aria-label="Social profiles">
      {socialLinks.map((link) => {
        const isExternal = link.platform !== "email";

        return (
          <li key={link.platform}>
            <a
              href={link.href}
              aria-label={link.label}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground-secondary transition duration-fast hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:text-accent-cyan focus-visible:outline-accent-cyan"
            >
              <SocialIcon platform={link.platform} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
