import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.author.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  keywords: [
    "Abdullah Saeed",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "AI Developer",
    "Dashboard Development",
    "Freelance Web Developer"
  ],
  alternates: {
    canonical: siteConfig.links.canonical
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  },
  robots: {
    index: true,
    follow: true
  },
  manifest: "/manifest.webmanifest"
};

const profileUrls = [siteConfig.links.github, siteConfig.links.linkedin].filter((url) => url.length > 0);

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.role,
  description: siteConfig.description,
  url: siteConfig.url,
  ...(profileUrls.length > 0 ? { sameAs: profileUrls } : {}),
  knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "Python", "Artificial Intelligence"]
} as const;
