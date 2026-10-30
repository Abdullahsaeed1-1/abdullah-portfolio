"use client";

import { useEffect, useState } from "react";

// A thin band across the middle of the viewport decides which section is "current".
const ACTIVE_SECTION_ROOT_MARGIN = "-45% 0px -50% 0px";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0 || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);

        if (intersectingEntry) {
          setActiveSectionId(intersectingEntry.target.id);
        }
      },
      { rootMargin: ACTIVE_SECTION_ROOT_MARGIN }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSectionId;
}
