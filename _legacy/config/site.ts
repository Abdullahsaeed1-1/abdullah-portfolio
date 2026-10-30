import type { SiteConfig } from "@/types/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Personal links come from the environment so an unconfigured build never shows fake profiles.
export const siteConfig: SiteConfig = {
  name: "Abdullah Saeed Portfolio",
  title: "Abdullah Saeed | Software Engineer",
  description:
    "Abdullah Saeed builds premium web products, AI-powered tools, and dashboards with Next.js, TypeScript, and thoughtful product design.",
  url: siteUrl,
  locale: "en_US",
  author: {
    name: "Abdullah Saeed",
    role: "Software Engineer",
    location: "Pakistan · Working remotely worldwide"
  },
  links: {
    canonical: siteUrl,
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    resume: process.env.NEXT_PUBLIC_RESUME_URL ?? ""
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    responseTime: "Replies within 24 hours"
  }
};
