import type { NavigationItem } from "@/types/navigation";

export const primaryNavigationItems: readonly NavigationItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Experience", href: "#timeline" },
  { label: "Contact", href: "#contact" }
];

export const navigationSectionIds = primaryNavigationItems.map((item) => item.href.slice(1));
