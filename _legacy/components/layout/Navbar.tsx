"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui";
import { navigationSectionIds, primaryNavigationItems } from "@/constants/layout/navigation";
import { SCROLLED_THRESHOLD_PX } from "@/constants/motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useHasScrolled } from "@/hooks/useHasScrolled";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasScrolled = useHasScrolled(SCROLLED_THRESHOLD_PX);
  const activeSectionId = useActiveSection(navigationSectionIds);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-normal",
        hasScrolled || isMenuOpen
          ? "border-white/10 bg-background-primary/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary navigation"
        className={cn(
          "mx-auto flex max-w-shell items-center justify-between px-6 transition-[height] duration-normal md:px-8",
          hasScrolled ? "h-14" : "h-16"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm text-sm font-semibold text-foreground-primary transition-colors duration-fast hover:text-accent-cyan focus-visible:outline-accent-cyan"
          onClick={() => setIsMenuOpen(false)}
        >
          <span
            aria-hidden="true"
            className="inline-flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-cyan to-accent-purple font-mono text-xs text-white"
          >
            AS
          </span>
          Abdullah Saeed
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {primaryNavigationItems.map((item) => {
            const isActive = activeSectionId === item.href.slice(1);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-fast hover:text-foreground-primary focus-visible:outline-accent-cyan",
                    isActive ? "bg-white/[0.06] text-foreground-primary" : "text-foreground-secondary"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <ButtonLink href="#contact" size="md">
            Hire Me
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-foreground-primary transition-colors duration-fast hover:border-accent-cyan/60 hover:text-accent-cyan focus-visible:outline-accent-cyan md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          {isMenuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        inert={!isMenuOpen}
        className={cn(
          "fixed inset-x-0 z-40 border-b border-white/10 bg-background-primary/96 px-6 pb-8 pt-4 backdrop-blur-xl transition duration-normal md:hidden",
          hasScrolled ? "top-14" : "top-16",
          isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <ul aria-label="Mobile navigation links" className="flex flex-col gap-2">
          {primaryNavigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-3 text-base font-medium text-foreground-secondary transition-colors duration-fast hover:bg-white/5 hover:text-foreground-primary focus-visible:outline-accent-cyan"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="#contact" className="mt-6 w-full">
          Start a Project
        </ButtonLink>
      </div>
    </header>
  );
}
