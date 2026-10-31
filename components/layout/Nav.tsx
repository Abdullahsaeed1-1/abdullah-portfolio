"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// An underline that draws in from the left on hover, and stays drawn on the current page.
const linkClass =
  "relative py-3 text-[15px] tracking-[-0.01em] after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100";

/** True while the home page's pinned hero is under the top of the viewport. */
function useIsOverHero(pathname: string) {
  // Tagged with the page it was measured on, so a stale value never carries over to a new route.
  const [heroState, setHeroState] = useState({ pathname: "", isOver: false });

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");

    if (!hero) {
      return;
    }

    // A thin band along the top edge: the hero counts as "under the nav" while it fills that band.
    const observer = new IntersectionObserver(
      ([entry]) => setHeroState({ pathname, isOver: entry?.isIntersecting ?? false }),
      { rootMargin: "0px 0px -95% 0px" }
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, [pathname]);

  return heroState.pathname === pathname && heroState.isOver;
}

const socialLinks = [
  { label: "GitHub", href: site.github.href, isExternal: true },
  ...(site.linkedin ? [{ label: "LinkedIn", href: site.linkedin.href, isExternal: true }] : []),
  { label: "Email", href: `mailto:${site.businessEmail}`, isExternal: false }
];

/**
 * Over the home hero the nav is plain text blending with the portrait; everywhere else it sits on
 * a dark blurred strip so it can never land on top of body text.
 */
export function Nav() {
  const pathname = usePathname();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const isOverHero = useIsOverHero(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the panel whenever the route changes, so a tapped link never leaves it covering the page.
  const [panelPathname, setPanelPathname] = useState(pathname);
  if (panelPathname !== pathname) {
    setPanelPathname(pathname);
    setIsPanelOpen(false);
  }

  useEffect(() => {
    if (!isPanelOpen) {
      return;
    }

    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const menuButton = menuButtonRef.current;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPanelOpen(false);
      }
    }

    // Lock both roots (iOS Safari ignores a lock on <html> alone) and take the page out of reach.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [isPanelOpen]);

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-night/85 backdrop-blur-md transition-colors duration-300",
          isOverHero &&
            "md:border-transparent md:bg-transparent md:mix-blend-difference md:backdrop-blur-none"
        )}
      >
        <nav
          aria-label="Primary"
          className="gutter pointer-events-auto mx-auto flex h-14 max-w-[1440px] items-center justify-between text-cream md:h-20"
        >
          <Link href="/" className="-my-2 py-3 text-[17px] font-semibold tracking-[-0.02em]">
            {site.name}
          </Link>

          <ul className="hidden items-center gap-12 md:flex">
            {navigation.map((item) => {
              const isActive = isActiveRoute(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(linkClass, isActive && "after:scale-x-100")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            className="-m-3 p-3 text-[15px] md:hidden"
            aria-expanded={isPanelOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsPanelOpen((isOpen) => !isOpen)}
          >
            {isPanelOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {isPanelOpen ? (
        <div
          ref={panelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="gutter fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-night pb-10 pt-24 text-cream md:hidden"
        >
          <ul className="space-y-2">
            {[{ label: "Home", href: "/" }, ...navigation].map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : isActiveRoute(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsPanelOpen(false)}
                    className={cn(
                      "block py-1 font-display text-display",
                      isActive ? "text-olive" : "text-cream"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 border-t border-cream/10 pt-6">
            <ul className="flex flex-wrap gap-x-8">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex min-h-11 items-center text-body text-cream/80 hover:text-olive"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${site.businessEmail}`}
              className="mt-2 inline-flex min-h-11 items-center font-mono text-mono text-olive"
            >
              {site.businessEmail}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
