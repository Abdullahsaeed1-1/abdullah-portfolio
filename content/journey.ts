import { externalLinks } from "@/content/site";
import type { LinkCopy, Milestone } from "@/content/types";

export const journeyIntro = {
  eyebrow: "The route here",
  heading: "From a first client to a company, in four years."
} as const;

export interface JourneyChapter {
  readonly id: string;
  readonly date: string;
  /** Large label beside the canvas thread. */
  readonly year: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly highlights: readonly string[];
  readonly links: readonly (LinkCopy & { readonly isExternal?: boolean })[];
  /** Rendered visibly; never replaced with invented copy. */
  readonly todo?: string;
  /** Screenshots shown under the chapter; files must exist in public/shots. */
  readonly images?: readonly {
    readonly src: string;
    readonly alt: string;
    /** "contain" mats a tall phone shot instead of cropping it. */
    readonly fit?: "contain";
  }[];
}

// Facts from CONTENT.md and Abdullah's CV only. The home page scrolls through these one by one.
export const journeyChapters: readonly JourneyChapter[] = [
  {
    id: "2022",
    date: "January 2022",
    year: "2022",
    title: "The first paid work",
    paragraphs: [
      "I started taking freelance work — web platforms and automation systems for clients who needed something built, not just designed."
    ],
    highlights: ["Freelance developer", "Web platforms", "Automation"],
    // Later: add the first client's story and a photo — who it was, what was built, what went wrong.
    links: []
  },
  {
    id: "2024",
    date: "March 2024",
    year: "2024",
    title: "Ali Public School",
    paragraphs: [
      "It started with one website for the Premier campus. Then a 30-page prospectus. Then the social media, from zero. Then the ad campaigns for the school opening.",
      "Most of what I know about building things people actually depend on, I learned here — because when something broke, it broke for a real school on a real morning."
    ],
    highlights: [
      "apspremier.com",
      "30-page prospectus",
      "Social media from zero",
      "Meta ad campaigns"
    ],
    links: [
      { label: "Ali Public School case study", href: "/work/ali-public-school" },
      { label: "apspremier.com", href: externalLinks.apsPremier, isExternal: true }
    ],
    images: [
      {
        src: "/shots/aps-premier.png",
        alt: "apspremier.com, the website I built for the Ali Public School Premier campus."
      },
      {
        src: "/shots/aps-post-hiring.png",
        alt: "A hiring post I designed for Ali Public School's social media."
      }
    ]
  },
  {
    id: "2025",
    date: "January 2025",
    year: "2025",
    title: "Luxara",
    paragraphs: [
      "My own handmade and stainless-steel jewellery brand, run end to end: sourcing stock from Shah Alami, the e-commerce site on its own domain, packing every order and sending it by courier. It earned verified customer reviews."
    ],
    highlights: ["Own brand", "E-commerce", "Customer acquisition"],
    links: [
      { label: "Luxara case study", href: "/work/luxara" },
      { label: "Visit Luxara", href: externalLinks.luxara, isExternal: true }
    ],
    images: [
      {
        src: "/shots/luxara-home.png",
        alt: "The Luxara storefront: Everyday Shine — gold and silver stainless steel cuffs."
      },
      {
        src: "/shots/luxara-shop.png",
        alt: "The Luxara shop: handmade bead bracelets and the signature gold cuff, with prices."
      }
    ]
  },
  {
    id: "2026-agents",
    date: "2026",
    year: "2026",
    title: "Two agents",
    paragraphs: [
      "I built Igris, then Jarvis, because I wanted to see how far an agent could go past answering questions. Igris works from your voice; Jarvis runs my business operations, with approval gates on anything that leaves the building."
    ],
    highlights: ["Igris — voice agent", "Jarvis — 17 modules", "Both in daily use"],
    links: [
      { label: "Igris case study", href: "/work/igris" },
      { label: "Jarvis case study", href: "/work/jarvis" }
    ],
    images: [
      { src: "/shots/igris-orb.png", alt: "Igris mid-conversation, showing its voice interface." },
      {
        src: "/shots/jarvis-voice.png",
        alt: "Jarvis's voice app on an iPhone, with quick actions to plan the day, log an expense and add a task.",
        fit: "contain"
      }
    ]
  },
  {
    id: "2026-thinkova",
    date: "June 2026",
    year: "2026",
    title: "Thinkova Technologies",
    paragraphs: [
      "Around the same time, Irtaza and I founded Thinkova Technologies, a software and AI services company. I own the full company build: the brand system, a 14-service catalogue, tiered pricing for local and international markets, and the company platform."
    ],
    highlights: ["Co-founder & CEO", "35+ clients served", "14-service catalogue"],
    links: [{ label: "thinkovatechnologies.com", href: externalLinks.thinkova, isExternal: true }],
    images: [
      {
        src: "/shots/thinkova-home.png",
        alt: "The Thinkova Technologies homepage: Intelligence, engineered for the ambitious."
      }
    ]
  },
  {
    id: "2026-group",
    date: "October 2026",
    year: "Oct 2026",
    title: "Group analyst roles",
    paragraphs: [
      "The school group restructured into a matrix, and I was given two formal roles reporting to group leadership across its branches: Group Marketing Analyst and Group IT & Digital Services Analyst."
    ],
    highlights: ["Classster rollout", "Xero rollout", "Data governance", "AI in classrooms"],
    links: [{ label: "The work with the group", href: "/work/ali-public-school" }],
    images: [
      {
        src: "/shots/aps-meta-ads.png",
        alt: "Meta Business Suite ads summary for APS Premier over 90 days: 577.4K views and 5,458 link clicks."
      },
      {
        src: "/shots/timetable-dashboard.png",
        alt: "The timetable solver dashboard I built for the school group."
      }
    ]
  },
  {
    id: "now",
    date: "Today",
    year: "Now",
    title: "Still a student",
    paragraphs: [
      "Still in my final year of computer science. Everything above happened alongside it."
    ],
    highlights: ["BS Computer Science", "University of Central Punjab", "Final year"],
    links: [{ label: "Start a conversation", href: "/contact" }]
  }
];

/** The /journey page renders the same chapters as milestones; it has its own closing line instead of "now". */
export const milestones: readonly Milestone[] = journeyChapters
  .filter((chapter) => chapter.id !== "now")
  .map((chapter) => ({
    id: chapter.id,
    date: chapter.date,
    title: chapter.title,
    paragraphs: chapter.paragraphs,
    todo: chapter.todo
  }));

export const journeyClosing =
  "Still in my final year of computer science. Everything above happened alongside it.";
