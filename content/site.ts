import type { LinkCopy } from "@/content/types";

export const site = {
  name: "Abdullah Saeed",
  domain: "abdullahwork.me",
  // The live site is served from www (the apex redirects there), so www is the canonical host.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abdullahwork.me",
  title: "Abdullah Saeed — full-stack & AI automation developer",
  description:
    "I build AI agents and systems that do real work. Case studies: a constraint-solved school timetable, a voice agent, a business assistant, and an institutional website rebuild.",
  email: "abdullahuser052@gmail.com",
  businessEmail: "abdullah@thinkovatechnologies.com",
  github: { label: "github.com/Abdullahsaeed1-1", href: "https://github.com/Abdullahsaeed1-1" },
  linkedin: {
    label: "linkedin.com/in/abdullah-saeed-614a402bb",
    href: "https://www.linkedin.com/in/abdullah-saeed-614a402bb/"
  } as LinkCopy | null,
  copyright: "© 2026 Abdullah Saeed"
} as const;

/** Every live URL the site points to, checked live on 30 October 2026. */
export const externalLinks = {
  thinkova: "https://www.thinkovatechnologies.com",
  aliPublicSchool: "https://alipublicschool.com.pk",
  apsPremier: "https://www.apspremier.com",
  luxara: "https://www.luxara.website",
  timetableLive: "https://ali-school-main.vercel.app",
  thinkovaProjects: {
    apsPremier: "https://www.thinkovatechnologies.com/projects/aps-premier-campus",
    timetable: "https://www.thinkovatechnologies.com/projects/aps-management-system",
    timetableMobile: "https://www.thinkovatechnologies.com/projects/aps-timetable-mobile",
    digitalMarketing: "https://www.thinkovatechnologies.com/projects/aps-digital-marketing",
    caseStudyDeck: "https://www.thinkovatechnologies.com/projects/aps-portfolio-deck",
    igris: "https://www.thinkovatechnologies.com/projects/igris-agent",
    luxara: "https://www.thinkovatechnologies.com/projects/luxara",
    nutrix: "https://www.thinkovatechnologies.com/projects/nutrix",
    veldara: "https://www.thinkovatechnologies.com/projects/veldara-clone"
  }
} as const;

export const navigation: readonly LinkCopy[] = [
  { label: "Work", href: "/work" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" }
];
