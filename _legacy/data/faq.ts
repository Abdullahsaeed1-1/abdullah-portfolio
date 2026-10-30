import type { FaqEntry, SectionIntro } from "@/types/content";

export const faqIntro: SectionIntro = {
  eyebrow: "FAQ",
  title: "Questions clients usually ask.",
  description: "If yours is not here, send a message — I am happy to talk it through."
};

export const faqEntries: readonly FaqEntry[] = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "Web applications, dashboards, AI-powered features, and automation. I work best on products where quality and long-term maintainability matter."
  },
  {
    question: "How do projects usually start?",
    answer:
      "With a short call to understand your goals. I then send a written scope with deliverables, timeline, and cost so there are no surprises."
  },
  {
    question: "Do you work with existing codebases?",
    answer:
      "Yes. I start by reading the code and documenting what is there, then improve it incrementally instead of rewriting for the sake of it."
  },
  {
    question: "How do we communicate during the project?",
    answer:
      "Async-first with regular written updates and preview links, plus calls whenever a decision needs a conversation."
  },
  {
    question: "What happens after launch?",
    answer:
      "You receive the source code, documentation, and a handover. Ongoing support and iteration are available if you need them."
  }
];
