import { externalLinks } from "@/content/site";

// Every figure here comes from CONTENT.md; the cards are the proof that flies in on scroll.

export const heroSequence = {
  // Split around the face: the first half sits to its left, the second to its right.
  greeting: { left: "HELLO,", right: "I'M ABDULLAH" },
  portraitLabel:
    "A portrait made of thousands of dots in lavender and lime that scatter as the pointer moves through them.",
  windowLine: { strong: "Selected work,", soft: "built end to end." },

  // Phase two: who I am in four cards. Facts come from CONTENT.md and Abdullah's CV.
  work: {
    label: "Selected work",
    allHref: "/work",
    allLabel: "All work",
    moreNote: "A selection — more on request",
    moreHref: "/contact"
  },
  experience: {
    label: "Experience",
    value: "4",
    unit: "years shipping",
    lines: [
      "Freelance since January 2022",
      "2+ years with outside clients",
      "Backend internship at CodeAlpha, 2026",
      "35+ clients served through Thinkova"
    ],
    href: "/journey",
    linkLabel: "Read the journey"
  },
  workedWith: {
    label: "Worked with",
    // External rows open the client's live site in a new tab.
    items: [
      {
        name: "Ali Public School",
        role: "Tech & marketing, both campuses · since 2024",
        href: externalLinks.aliPublicSchool,
        isExternal: true
      },
      {
        name: "APS Premier Campus",
        role: "Website, domain & business email",
        href: externalLinks.apsPremier,
        isExternal: true
      },
      {
        name: "Thinkova Technologies",
        role: "Founder & CEO · 2026",
        href: externalLinks.thinkova,
        isExternal: true
      },
      {
        name: "Luxara",
        role: "My jewellery brand · since 2025",
        href: externalLinks.luxara,
        isExternal: true
      }
    ]
  },
  testimonial: {
    label: "Client",
    // A complete sentence from the verbatim testimonial in content/clients.ts.
    quote: "Exactly the kind of execution I look for.",
    name: "Ali Akbar Afridi",
    role: "Founder, Ali Public School & APS Premier",
    href: "#clients",
    linkLabel: "Read the full testimonial"
  },
  start: {
    label: "Start your project",
    href: "/contact",
    hint: "Tell me what you are trying to automate."
  },

  // Phase three: the camera flies into the face and the journey begins beside it.
  journeyIntro: {
    eyebrow: "My journey",
    heading: "From a first client to a company, in four years.",
    line: "It did not happen in a straight line. Keep scrolling — this is how it went.",
    cue: "Keep scrolling"
  },

  tagline: {
    eyebrow: "Full-stack & AI automation — Lahore, Pakistan",
    lines: ["I build AI agents and systems", "that do real work."]
  },
  scrollHint: "Scroll to learn more about me"
} as const;
