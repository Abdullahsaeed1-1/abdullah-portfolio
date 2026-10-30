"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The section currently under the fixed nav sets the theme on <html>, so the nav (which reads the
 * root colours) cross-fades to match whatever is scrolling beneath it.
 */
export function ScrollTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section-theme]");
    const root = document.documentElement;

    if (sections.length === 0) {
      return;
    }

    root.dataset.theme = sections[0].dataset.sectionTheme;

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        const theme = (active?.target as HTMLElement | undefined)?.dataset.sectionTheme;

        if (theme) {
          root.dataset.theme = theme;
        }
      },
      // A thin band level with the bottom of the fixed nav.
      { rootMargin: "-7% 0px -92% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
