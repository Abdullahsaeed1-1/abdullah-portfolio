import type { LinkCopy, SectionCopy } from "@/content/types";

export const hero = {
  eyebrow: "Full-stack & AI automation — Lahore, Pakistan",
  // Split so the page can colour exactly one word without parsing markup.
  heading: { before: "I build AI agents and systems that do ", signal: "real", after: " work." },
  body: "Not chatbots that answer questions — agents that send the email, run the command, publish the post, and solve the schedule. Four years of shipping things businesses actually run on.",
  actions: [
    { label: "See the work", href: "/work" },
    { label: "Start a conversation", href: "/contact" }
  ] satisfies readonly LinkCopy[],
  canvasLabel:
    "An agent core sending tasks out to the tools Abdullah's agents call — Gmail, Telegram, Whisper, OR-Tools, Calendar, ElevenLabs, Canva, Playwright, WhatsApp, Drive — and the results coming back.",
  canvasCaption: "Tasks out, results back — the tools Igris and Jarvis actually call."
} as const;

export const featuredSection: SectionCopy = {
  eyebrow: "Selected work",
  heading: "Five projects, built end to end."
};

export const finalCta = {
  heading: "Tell me what you are trying to automate.",
  line: "I will tell you honestly whether it is worth building — and if it is not, I will say so.",
  action: { label: "Start a conversation", href: "/contact" }
} as const;
