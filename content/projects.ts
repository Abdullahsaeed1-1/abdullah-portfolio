import { externalLinks } from "@/content/site";
import type { CompactProject, FeaturedProject } from "@/content/types";

const timetable: FeaturedProject = {
  slug: "timetable",
  name: "Timetable",
  title: "School timetable automation system",
  oneLiner: "A constraint solver that generates conflict-free timetables across three campuses.",
  role: "Sole developer",
  stack: [
    "Node.js",
    "TypeScript",
    "Express",
    "Prisma",
    "PostgreSQL",
    "Python",
    "FastAPI",
    "Google OR-Tools",
    "React",
    "Vite",
    "Flutter",
    "Electron",
    "SQLite"
  ],
  cover: {
    src: "/shots/timetable-grid.png",
    label: "screenshot: timetable grid",
    alt: "The filled timetable grid for 33 sections."
  },
  accent: "signal",
  links: [
    { label: "Live system", href: externalLinks.timetableLive },
    { label: "On Thinkova", href: externalLinks.thinkovaProjects.timetable }
  ],
  canvas: "solver",
  canvasLabel:
    "A school timetable grid filling itself in: subjects drop into empty periods, a few clashes flash and are moved, and the grid settles into a complete, conflict-free week.",
  canvasCaption: "3 campuses · 33 sections · zero conflicts",
  caseStudy: {
    problem: [
      "Ali Public School built its timetables by hand. Three campuses, 33 sections, seven periods a day, and a set of rules nobody had ever written down: important subjects early, every teacher fully loaded, nobody double-booked, and a weekly ceiling no teacher may exceed. It took weeks, and it was never quite right."
    ],
    constraints: {
      intro: "The rules were harder than they sounded.",
      items: [
        "Junior, Girls and Boys campuses run on completely different models — Junior has one homeroom teacher per section, the others are subject specialists.",
        "Games periods need two supervising teachers per slot regardless of how many classes share the ground, and the frequency changes by grade.",
        "Teacher weekly ceilings — 30 periods for Girls and Boys, 35 for Junior homerooms — can never be exceeded. Not “should rarely be.” Never.",
        "Friday periods are shorter than Monday to Thursday."
      ]
    },
    decisions: [
      {
        title: "A constraint solver, not a scheduling algorithm.",
        paragraphs: [
          "I used Google OR-Tools CP-SAT rather than writing heuristics. Heuristics produce a timetable that is mostly right and fails in ways you cannot explain. A solver either satisfies the hard constraints or tells you it cannot — and that difference matters when a principal asks why a teacher has a gap."
        ]
      },
      {
        title: "Four sequential stages, not one weighted objective.",
        paragraphs: [
          "My first version optimised everything at once with weights, and the weights fought each other. I rebuilt it as four stages: fix shortfalls, then subject priority placement, then teacher load, then fairness — each stage hard-fixed before the next begins, with fairness isolated last so it can never undo earlier work."
        ]
      },
      {
        title: "I proved the gaps were real.",
        paragraphs: [
          "Some tier violations would not go away. Rather than keep tuning, I checked the arithmetic: Boys campus has 116 periods of excess demand, Girls 143. The roster is mathematically short. No solver can fix a staffing shortage — so I built a Capacity Advisor that shows exactly where and why, instead of silently producing a worse timetable."
        ]
      },
      {
        title: "Then the client asked for it offline.",
        paragraphs: [
          "After the whole system was deployed to Vercel and Railway with Supabase, Ali Uncle said he wanted it installed on his own computer, not accessed online. I copied the project into a separate repository and rebuilt the data layer: Postgres to SQLite, seven enums to validated strings, the Python solver packaged as a standalone executable with PyInstaller, and the whole thing wrapped in an Electron NSIS installer that serves over the LAN so other machines in the school can reach it.",
          "The cloud version still exists, untouched, in its own repo. Neither build was wasted."
        ]
      }
    ],
    built: [
      "Web admin in React with full CRUD across teachers, classes and subjects; timetable generation with granular locking — a whole class, a single day, or one period; a warnings page; a Capacity Advisor; a gaps view with a root-cause breakdown for every empty slot; and a Flutter app for teachers with their own timetable and a live countdown to the next period.",
      "Production hardening that I did not skip: JWT with role-based access control, bcrypt, rate limiting on the expensive endpoints, Zod validation across all 40 endpoints in 9 controllers, optimistic locking so two people editing at once get a clear conflict instead of silent data loss, and a security baseline checked item by item before launch."
    ],
    honest: [
      "The installer is unsigned while it is still being tested — Windows shows a warning. Code signing is on the list, not done. And the offline build is a single-concurrent-user system; it was never designed to be a multi-tenant product."
    ],
    gallery: [
      {
        src: "/shots/timetable-warnings.png",
        label: "screenshot: warnings and gaps page",
        alt: "The warnings page listing every empty slot with its root cause."
      },
      {
        src: "/shots/timetable-capacity.png",
        label: "screenshot: capacity advisor",
        alt: "The Capacity Advisor showing excess period demand per campus."
      }
    ],
    showSystemLayers: true,
    extras: [
      {
        id: "desktop-app",
        eyebrow: "The offline desktop app",
        heading: "The same system, installed on the school's own computer.",
        paragraphs: [
          "When the client asked for it offline, I rebuilt the data layer in a separate repository: Postgres to SQLite, seven enums to validated strings, and the Python solver packaged as a standalone executable with PyInstaller.",
          "The whole thing ships as an Electron NSIS installer for Windows that serves over the LAN, so other machines in the school can reach it. The cloud version still exists, untouched, in its own repo."
        ],
        items: [
          "Electron + NSIS installer",
          "SQLite",
          "PyInstaller-packaged OR-Tools solver",
          "LAN access for other machines"
        ],
        gallery: [
          {
            src: "/shots/timetable-desktop-installer.png",
            label: "screenshot: windows installer",
            alt: "The Electron NSIS installer for the offline Ali Public School app, mid-install.",
            fit: "small"
          },
          {
            src: "/shots/timetable-desktop-app.png",
            label: "screenshot: desktop app running offline",
            alt: "The desktop app's first start, updating its local database before opening.",
            fit: "small"
          }
        ]
      },
      {
        id: "mobile-app",
        eyebrow: "The teacher app",
        heading: "Every teacher's timetable in their pocket.",
        paragraphs: [
          "A Flutter app for teachers with their own timetable and a live countdown to the next period. It reads the same data as the web system, so a change made by the office shows up on phones without a separate sync."
        ],
        items: ["Flutter", "Live countdown to the next period", "Same data as the web admin"],
        gallery: [
          {
            src: "/shots/timetable-mobile.png",
            label: "screenshot: teacher app",
            alt: "The Flutter teacher app showing a personal timetable and the next-period countdown."
          }
        ],
        links: [
          { label: "Mobile app on Thinkova", href: externalLinks.thinkovaProjects.timetableMobile }
        ]
      }
    ]
  }
};

const igris: FeaturedProject = {
  slug: "igris",
  name: "Igris",
  title: "Igris — voice-first AI agent",
  oneLiner: "Speak to it, and it actually does the thing.",
  role: "Sole developer",
  stack: [
    "Node.js",
    "Express",
    "React",
    "Vite",
    "Tailwind",
    "Framer Motion",
    "Gemini",
    "Groq Whisper",
    "ElevenLabs"
  ],
  year: "2026",
  cover: {
    src: "/shots/igris-orb.png",
    label: "screenshot: igris mid-conversation",
    alt: "Igris mid-conversation, showing its voice interface."
  },
  accent: "night",
  links: [{ label: "On Thinkova", href: externalLinks.thinkovaProjects.igris }],
  canvas: "voice",
  canvasLabel:
    "A ring of thin strokes cycling through three states — idle, listening, speaking. One stroke turns orange at the moment a tool call fires.",
  canvasCaption: "idle → listening → speaking · the orange stroke marks a tool call",
  caseStudy: {
    problem: [
      "Voice assistants answer questions. I wanted one that performs work — reads and writes files, runs commands, searches the web, opens what I need — from a spoken sentence, with no typing."
    ],
    decisions: [
      {
        title: "Three providers, each for what it is best at.",
        paragraphs: [
          "Groq Whisper for transcription because it is fast and handles Roman Urdu mixed with English, which is how I actually speak. Gemini for reasoning and deciding which tool to call. ElevenLabs for a voice that does not sound like a screen reader. One provider for all three would have been simpler and worse at every step."
        ]
      },
      {
        title: "Tool-calling, not intent matching.",
        paragraphs: [
          "The model decides which tool a request needs rather than matching against a list of phrases. This is why “check what is in the config file and tell me if the port is right” works without anyone having written a rule for it."
        ]
      },
      {
        title: "Barge-in.",
        paragraphs: [
          "You can interrupt it mid-sentence. Without this, every slightly wrong answer costs you the full length of the reply, and the assistant becomes annoying to use. It is a small feature that decides whether the thing is usable at all."
        ]
      },
      {
        title: "Security boundaries from the first commit.",
        paragraphs: [
          "File access is confined to the workspace directory. Terminal commands run against an allowlist — npm, node, git, dir, cd, echo — and nothing else. An agent that can run arbitrary shell commands is not a feature, it is a liability."
        ]
      },
      {
        title: "Provider fallback.",
        paragraphs: [
          "API quotas run out at the worst moment. When a provider fails, it falls through to an alternative rather than dying."
        ]
      }
    ],
    honest: [
      "It is a voice assistant first. Command execution is deliberately narrow, and which spoken languages work well depends on the configured Whisper and ElevenLabs models."
    ]
  }
};

const jarvis: FeaturedProject = {
  slug: "jarvis",
  name: "Jarvis",
  title: "Jarvis — private AI assistant and digital operator",
  oneLiner:
    "It runs my business operations, with approval gates on anything that leaves the building.",
  role: "Sole developer",
  stack: [
    "Python",
    "FastAPI",
    "Uvicorn",
    "Claude API",
    "Playwright",
    "ReportLab",
    "Google Workspace APIs",
    "Meta",
    "LinkedIn",
    "Canva",
    "Telegram",
    "WhatsApp",
    "Twilio"
  ],
  year: "2026",
  cover: {
    src: "/shots/jarvis-telegram.png",
    label: "screenshot: jarvis in telegram",
    alt: "Jarvis in Telegram: the day's priorities, pending approvals, API spend against budget and deadline reminders.",
    fit: "portrait"
  },
  accent: "signal",
  canvas: "tool-graph",
  canvasLabel:
    "One request traced through Jarvis: message, memory retrieval, Claude, tool selection, Gmail, approval, sent. Calendar, Drive and Canva were available but not chosen.",
  canvasCaption: "message → memory retrieval → Claude → tool selection → Gmail → approval → sent",
  caseStudy: {
    problem: [
      "I run a company, handle technology and marketing for a school group, and run my own brand. The work is not hard — it is scattered. Email in one place, calendar in another, social posts somewhere else, invoices nowhere."
    ],
    decisions: [
      {
        title: "Approval-first, not autonomy-first.",
        paragraphs: [
          "Nothing leaves without me saying yes. Emails are drafted, never sent. Social posts are previewed, never published. External calendar invites wait. An assistant that acts on your behalf without a gate will eventually send something embarrassing to a client — and one such incident costs more than the automation ever saved."
        ]
      },
      {
        title: "Memory that curates itself.",
        paragraphs: [
          "It remembers people, projects, preferences and dates, retrieves what is relevant before each conversation, and learns afterwards. A weekly self-review removes duplicates and resolves contradictions. Memory that only grows becomes noise within a month."
        ]
      },
      {
        title: "Credentials are never stored.",
        paragraphs: [
          "Passwords, PINs, OTPs and card numbers are excluded from memory by design, not by filtering after the fact."
        ]
      },
      {
        title: "Effort routing to control cost.",
        paragraphs: [
          "Simple messages get low reasoning effort, normal tasks medium, strategy and analysis high — with an Opus-level advisor available for genuinely hard decisions. Running everything at maximum effort is how an assistant like this becomes too expensive to keep using."
        ]
      },
      {
        title: "Strict brand separation.",
        paragraphs: [
          "APS, Thinkova, Luxara and personal are separate areas. No content, account, memory or Drive folder crosses between them. When you handle several brands, one mixed-up post is the thing that ends a client relationship."
        ]
      },
      {
        title: "Reachable where I already am.",
        paragraphs: [
          "Web app, Telegram, WhatsApp, browser voice, and Twilio phone calls for urgent alerts. In voice mode replies are one to three sentences, in Roman Urdu or English."
        ]
      }
    ],
    built: [
      "17 modules covering the agent loop, tools, personal tracking, effort routing, learning, diary, Google integration, social publishing, Canva workflows, three messaging channels, phone calls, browser automation, privacy locks and scheduling. Daily morning brief on Telegram. Sunday memory review. Watchers on Gmail, payments and deadlines. Runs 24/7 on a VPS; usable from an iPhone home screen over HTTPS."
    ],
    gallery: [
      {
        src: "/shots/jarvis-voice.png",
        label: "screenshot: jarvis voice app",
        alt: "Jarvis's voice app on an iPhone, with quick actions to plan the day, log an expense, add a task and write Luxara captions.",
        fit: "portrait"
      },
      {
        src: "/shots/jarvis-telegram.png",
        label: "screenshot: jarvis in telegram",
        alt: "Jarvis in Telegram: priorities, pending approvals, API spend and deadline reminders.",
        fit: "portrait"
      }
    ]
  }
};

const apsWebsite: FeaturedProject = {
  slug: "aps-website",
  name: "APS website",
  title: "alipublicschool.com.pk — institutional website rebuild",
  oneLiner: "Replaced a legacy WordPress site without losing a single search ranking.",
  role: "Sole developer and designer",
  stack: [
    "Next.js 15",
    "App Router",
    "static site generation",
    "TypeScript",
    "Tailwind",
    "Vercel",
    "Cloudflare"
  ],
  year: "Launched 25 October 2026",
  cover: {
    src: "/shots/aps-after.png",
    label: "screenshot: the next.js rebuild",
    alt: "The rebuilt alipublicschool.com.pk home page: Quality in Everything, over an aerial view of the Badabher campus."
  },
  accent: "night",
  links: [{ label: "Live site", href: externalLinks.aliPublicSchool }],
  canvas: "before-after",
  canvasLabel: "The old WordPress site and the Next.js rebuild, compared with a draggable divider.",
  canvasCaption:
    "Drag the divider: the old WordPress site (Internet Archive, May 2026) on the left, the rebuild on the right. The old body was rendered in the browser, so even the archive saw a blank page.",
  caseStudy: {
    problem: [
      "The school's main site was an aging WordPress install, client-side rendered, and invisible to search engines in the ways that mattered. It also looked nothing like an institution that has been running for decades."
    ],
    decisions: [
      {
        title: "Static generation, specifically for the SEO problem.",
        paragraphs: [
          "The old site rendered on the client, so crawlers saw very little. Next.js with App Router and SSG delivers the content in the HTML."
        ]
      },
      {
        title: "Preserving rankings was the hard requirement, not the launch.",
        paragraphs: [
          "The school ranks for searches that bring in admissions. A rebuild that lost those rankings would have been a net loss no matter how good it looked. I kept the URL structure, carried over the real content — the principal's message, the BISE and PSRA registration numbers — and kept the launch steps written down so the DNS cutover could be done carefully rather than quickly."
        ]
      },
      {
        title: "A brand system from the crest, not from a trend.",
        paragraphs: [
          "Six colour tokens pulled from the school's own crest, and a three-typeface hierarchy — Fraunces, Manrope and Amiri — so the Urdu and English sit together properly. A school founded generations ago should not look like a startup."
        ]
      }
    ]
  }
};

const aliPublicSchool: FeaturedProject = {
  slug: "ali-public-school",
  name: "Ali Public School",
  title: "Ali Public School — technology and marketing for a school group",
  oneLiner:
    "From one campus website to the whole group's technology and marketing, across both campuses.",
  role: "Digital growth partner, then Group IT & Marketing Analyst",
  stack: ["Meta Ads Manager", "Instagram", "Facebook", "LinkedIn", "Next.js", "Classster", "Xero"],
  year: "March 2024 — today",
  cover: {
    src: "/shots/aps-meta-ads.png",
    label: "screenshot: meta ads summary",
    alt: "Meta Business Suite ads summary for APS Premier over 90 days: 577.4K views, 204.3K viewers, 69,188 engagements and 5,458 link clicks."
  },
  accent: "signal",
  links: [
    { label: "alipublicschool.com.pk", href: externalLinks.aliPublicSchool },
    { label: "apspremier.com", href: externalLinks.apsPremier },
    { label: "On Thinkova", href: externalLinks.thinkovaProjects.digitalMarketing }
  ],
  caseStudy: {
    problem: [
      "It started with one website for the Premier campus. Then a 30-page prospectus. Then the social media, from zero. Then the ad campaigns for the school opening. Two years later I handle technology and marketing for the whole group across both campuses.",
      "Most of what I know about building things people actually depend on, I learned here — because when something broke, it broke for a real school on a real morning."
    ],
    decisions: [
      {
        title: "A content calendar, not one-off posts.",
        paragraphs: [
          "The school's social presence needed regular, consistent content — announcements, admissions updates, campus life — instead of sporadic posts. I set up a recurring calendar kept consistent with the school's branding across Instagram, Facebook and LinkedIn."
        ]
      },
      {
        title: "Marketing run as a system.",
        paragraphs: [
          "A five-pillar marketing strategy presented to ownership, and an 8-sheet marketing system covering the content calendar, campaign budget, lead tracking and reporting — so every rupee and every lead can be traced."
        ]
      },
      {
        title: "Paid campaigns planned and run end to end.",
        paragraphs: [
          "Meta ad campaigns for admissions drives, and Special Ad Category recruitment campaigns for hiring — set up, run and reported in Meta Ads Manager."
        ]
      }
    ],
    extras: [
      {
        id: "prospectus",
        eyebrow: "Print",
        heading: "A 30-page institutional prospectus.",
        paragraphs: [
          "Designed end to end for the school and laid out in the school's own branding."
        ],
        gallery: [
          {
            src: "/shots/aps-prospectus-cover.png",
            label: "photo: prospectus cover",
            alt: "The Ali Public School Premier Campus prospectus cover, with the campus under an open sky.",
            fit: "portrait"
          },
          {
            src: "/shots/aps-prospectus-spread.png",
            label: "photo: prospectus inside spread",
            alt: "The prospectus's Welcome to APS Premier page, with the school's four pillars.",
            fit: "portrait"
          }
        ]
      },
      {
        id: "social",
        eyebrow: "Social media",
        heading: "Both campuses, run every week.",
        paragraphs: [
          "I run the school group's pages on Facebook and Instagram: the main Ali Public School page, with 17K followers and a 96% recommendation rate from 15 reviews, and the Premier campus accounts, which I started from nothing.",
          "In the last 30 days the Premier campus Instagram alone reached 16,868 views from 214 posts and 146 followers."
        ],
        items: ["Facebook", "Instagram", "Content calendar", "Insights reporting"],
        gallery: [
          {
            src: "/shots/aps-facebook.png",
            label: "screenshot: ali public school facebook",
            alt: "The Ali Public School Facebook page: 17K followers, 96% recommend from 15 reviews.",
            fit: "portrait"
          },
          {
            src: "/shots/aps-facebook-premier.png",
            label: "screenshot: aps premier facebook",
            alt: "The Ali Public School – APS Premier Facebook page.",
            fit: "portrait"
          },
          {
            src: "/shots/aps-instagram.png",
            label: "screenshot: apspremier.official instagram",
            alt: "The apspremier.official Instagram profile: 214 posts and 146 followers.",
            fit: "portrait"
          },
          {
            src: "/shots/aps-instagram-insights.png",
            label: "screenshot: instagram insights",
            alt: "Instagram insights for the last 30 days: 16,868 views.",
            fit: "portrait"
          }
        ],
        links: [
          {
            label: "Digital marketing on Thinkova",
            href: externalLinks.thinkovaProjects.digitalMarketing
          }
        ]
      },
      {
        id: "designs",
        eyebrow: "Design",
        heading: "Every post designed in the school's own brand.",
        paragraphs: [
          "Hiring drives, events and classroom moments — each one designed in the school's crest colours and typefaces, for both campuses."
        ],
        gallery: [
          {
            src: "/shots/aps-post-hiring.png",
            label: "image: hiring post",
            alt: "Join Our Premium Faculty — the APS Premier hiring post for English, Business Studies and Geography teachers."
          },
          {
            src: "/shots/aps-post-career.png",
            label: "image: career counselling post",
            alt: "Career Counselling Session with Ali Afridi, FCA, founder of Ali Public School — the main campus event post."
          },
          {
            src: "/shots/aps-post-five-senses.png",
            label: "image: classroom post",
            alt: "Know Your Five Senses — an illustrated classroom post for the Premier campus."
          }
        ]
      },
      {
        id: "meta-ads",
        eyebrow: "Meta ads",
        heading: "577.4K views from ten ads.",
        paragraphs: [
          "Over 90 days (2 August – 30 October 2026) APS Premier ran 10 ads for Rs78.76K: 577.4K views, 204.3K people reached, 69,188 post engagements and 5,458 link clicks.",
          "The hiring campaign for new faculty did the most work — one boosted post alone reached 41,581 people and drove 1,260 link clicks; another brought 73 phone calls."
        ],
        items: ["Meta Ads Manager", "Special Ad Category hiring", "Admissions drives"],
        gallery: [
          {
            src: "/shots/aps-meta-ads.png",
            label: "screenshot: meta ads summary",
            alt: "Meta Business Suite ads summary for APS Premier over 90 days, with the two hiring ads and their results."
          },
          {
            src: "/shots/aps-insights-30-days.png",
            label: "screenshot: 30-day performance",
            alt: "A 30-day performance dashboard: 23,993 views and 548 viewers.",
            fit: "portrait"
          }
        ]
      },
      {
        id: "group-roles",
        eyebrow: "APS Group",
        heading: "Two formal roles in a matrix structure.",
        paragraphs: [
          "In October 2026 the group restructured, and I was given two roles reporting to group leadership across its branches: Group Marketing Analyst and Group IT & Digital Services Analyst."
        ],
        items: [
          "Leading the Classster (student CRM) rollout across the group",
          "Leading the Xero (accounting) rollout across the group",
          "Cyber security, data governance and digital infrastructure policy",
          "Researching and planning AI adoption for classroom use"
        ]
      }
    ],
    gallery: [
      {
        src: "/shots/aps-premier.png",
        label: "screenshot: apspremier.com",
        alt: "apspremier.com — Explore Our Programs: early years, junior primary, co-curricular and campus."
      },
      {
        src: "/shots/aps-after.png",
        label: "screenshot: alipublicschool.com.pk",
        alt: "alipublicschool.com.pk — the main campus site."
      }
    ]
  }
};

export const featuredProjects: readonly FeaturedProject[] = [
  igris,
  jarvis,
  timetable,
  aliPublicSchool,
  apsWebsite
];

export const otherProjects: readonly CompactProject[] = [
  {
    links: [{ label: "On Thinkova", href: externalLinks.thinkovaProjects.nutrix }],
    name: "NutriX",
    descriptor: "AI nutrition analyzer",
    role: "Backend and database lead",
    stack: ["Node.js", "MongoDB", "computer vision"],
    description:
      "Pakistani food recognition across 50–60 dish classes. Built the API and nutrition calculation engine; evaluated YOLOv8-seg against an EfficientNet and U-Net pipeline. Final year project, group S26CS044."
  },
  {
    links: [{ label: "Live site", href: externalLinks.apsPremier }],
    name: "apspremier.com",
    stack: ["React"],
    description:
      "The Premier campus site — the first thing I built for the school group, two years ago.",
    shot: {
      src: "/shots/aps-premier.png",
      label: "screenshot: apspremier.com",
      alt: "The apspremier.com home page."
    }
  },
  {
    links: [
      { label: "Live store", href: externalLinks.luxara },
      { label: "On Thinkova", href: externalLinks.thinkovaProjects.luxara }
    ],
    name: "Luxara",
    stack: ["React", "e-commerce"],
    description:
      "My own handmade and stainless-steel jewellery brand. Built the storefront, the brand and the customer side of it."
  },
  {
    name: "Hangout",
    stack: ["Next.js", "GSAP", "Lenis"],
    description:
      "A layered parallax mountain valley with a scroll-driven car path across six illustrated layers."
  },
  {
    links: [{ label: "On Thinkova", href: externalLinks.thinkovaProjects.veldara }],
    name: "Veldara",
    stack: ["Vanilla JavaScript", "Canvas"],
    description:
      "Scroll-scrubbed video using canvas frame extraction, with no animation library at all."
  }
];

export function getFeaturedProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export const beforeAfterShots = {
  before: {
    src: "/shots/aps-before.png",
    label: "screenshot: old wordpress site",
    // Captured from the Internet Archive (16 May 2026); the body was rendered client-side and
    // never loaded in the archive — which is exactly the problem crawlers had.
    alt: "The old WordPress alipublicschool.com.pk, archived on 16 May 2026: the header loads, but the client-rendered page body stays blank."
  },
  after: apsWebsite.cover
} as const;
