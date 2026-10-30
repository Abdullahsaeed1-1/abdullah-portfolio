import type { AboutContent } from "@/types/content";

export const aboutContent: AboutContent = {
  intro: {
    eyebrow: "About",
    title: "An engineer who thinks like a product team.",
    description:
      "I care about the whole product: the architecture nobody sees, the interface everybody touches, and the outcome the business actually needs."
  },
  story: [
    "I started building for the web because I liked seeing ideas become something people can use. That curiosity turned into a discipline: understanding the problem first, then choosing the simplest system that solves it well.",
    "Today I work across the stack — React and Next.js on the front, Node.js and Python behind it, and AI services where they genuinely add value. Every project gets the same treatment: typed, tested, accessible, and fast."
  ],
  principles: [
    {
      title: "Clarity before code",
      description: "Requirements, risks, and success criteria are agreed before the first commit."
    },
    {
      title: "Performance is a feature",
      description: "Fast load times and smooth interactions are designed in, not patched on."
    },
    {
      title: "Built to be maintained",
      description: "Readable, documented code that the next engineer can extend with confidence."
    }
  ],
  highlights: [
    { value: "Full-stack", label: "Frontend to deployment" },
    { value: "TypeScript", label: "Strict, typed codebases" },
    { value: "AI", label: "LLM & vision integrations" },
    { value: "Remote", label: "Async-first collaboration" }
  ]
};
