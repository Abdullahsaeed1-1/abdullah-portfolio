// The short journey strip on the home page. Facts from CONTENT.md and the CV; the full story is /journey.

export const lifeJourney = {
  eyebrow: "The journey so far",
  heading: "2022 to today, one step at a time.",
  stops: [
    {
      year: "2022",
      title: "First freelance clients",
      detail: "Web platforms and automation for paying clients."
    },
    {
      year: "2024",
      title: "Ali Public School",
      detail: "One campus website became the whole group's tech and marketing."
    },
    {
      year: "2025",
      title: "Luxara",
      detail: "Built and ran my own jewellery brand, storefront to customers."
    },
    {
      year: "2026",
      title: "Igris, Jarvis & Thinkova",
      detail: "Two AI agents in daily use, and a company founded with Irtaza."
    },
    {
      year: "Oct 2026",
      title: "APS Group analyst",
      detail: "Two formal roles in the group's new matrix structure."
    }
  ],
  link: { label: "Read the full journey", href: "/journey" }
} as const;
