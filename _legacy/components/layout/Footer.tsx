import Link from "next/link";

import { SocialLinks } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { primaryNavigationItems } from "@/constants/layout/navigation";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background-primary">
      <div className="mx-auto grid grid-cols-1 max-w-shell gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
        <div className="max-w-sm">
          <p className="text-base font-semibold text-foreground-primary">{siteConfig.author.name}</p>
          <p className="mt-2 text-sm leading-6 text-foreground-muted">
            Premium web products, AI tools, and dashboards — engineered with care.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer navigation">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {primaryNavigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground-muted transition-colors duration-fast hover:text-foreground-primary focus-visible:outline-accent-cyan"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/[0.06]">
        <p className="mx-auto max-w-shell px-6 py-6 text-xs text-foreground-muted md:px-8">
          © {new Date().getFullYear()} {siteConfig.author.name}. Built with Next.js, TypeScript, and Three.js.
        </p>
      </div>
    </footer>
  );
}
