"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// An underline that draws in from the left on hover, and stays drawn on the current page.
const linkClass =
  "relative py-1 text-[15px] tracking-[-0.01em] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100";

/**
 * Plain text, no bar: the name on the left, the pages on the right. mix-blend-difference keeps
 * the text legible over both the black and the off-white sections without a background.
 */
export function Nav() {
  const pathname = usePathname();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPanelOpen(false);
      }
    }

    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPanelOpen]);

  return (
    <>
      {/* The blend sits on the fixed header itself: it is the stacking context, so the text
          differences against the page underneath rather than against a transparent box. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <nav
          aria-label="Primary"
          className="gutter pointer-events-auto mx-auto flex h-20 max-w-[1440px] items-center justify-between text-cream"
        >
          <Link href="/" className="text-[17px] font-semibold tracking-[-0.02em]">
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
            type="button"
            className="text-[15px] md:hidden"
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
          id="mobile-navigation"
          className="gutter fixed inset-0 z-40 bg-night pt-28 text-cream md:hidden"
        >
          <ul className="space-y-4">
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
                      "font-display text-display",
                      isActive ? "text-olive" : "text-cream"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
