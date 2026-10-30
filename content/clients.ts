import { externalLinks } from "@/content/site";

// Client work outside my own products. Quote is verbatim from thinkovatechnologies.com
// ("Client Stories"); engagement details come from CONTENT.md and Abdullah's CV.

export const clientsSection = {
  eyebrow: "Clients",
  heading: "Two years and counting with the same client — because the work kept growing.",
  testimonial: {
    quote:
      "Thinkova didn't just hand us a website; they set up our domain, our email, everything, end to end, without us having to manage a single technical detail ourselves. Exactly the kind of execution I look for.",
    name: "Ali Akbar Afridi",
    role: "Founder — Ali Public School, APS Premier Campus and the APS Group",
    source: { label: "via thinkovatechnologies.com", href: externalLinks.thinkova },
    tags: ["Web development", "Domain & hosting", "Business email"]
  },
  engagements: [
    {
      period: "March 2024 — today",
      title: "Ali Public School & APS Premier Campus",
      summary:
        "Started with one website for the Premier campus. Two years later I handle technology and marketing for the whole group across both campuses.",
      items: [
        "apspremier.com — website, domain and hosted business email, end to end",
        "alipublicschool.com.pk — rebuilt from WordPress without losing a search ranking",
        "Timetable system — conflict-free timetables across three campuses",
        "30-page institutional prospectus and a five-pillar marketing strategy",
        "Social media for both campuses, grown from zero"
      ],
      links: [
        { label: "Full case study", href: "/work/ali-public-school" },
        { label: "alipublicschool.com.pk", href: externalLinks.aliPublicSchool },
        { label: "apspremier.com", href: externalLinks.apsPremier }
      ]
    },
    {
      period: "October 2026 — today",
      title: "APS Group — matrix analyst roles",
      summary:
        "When the group restructured into a matrix, I was given two formal roles reporting to group leadership across its branches: Group IT & Digital Services Analyst and Group Marketing Analyst.",
      items: [
        "Leading the Classster (student CRM) rollout across the group",
        "Leading the Xero (accounting) rollout across the group",
        "Cyber security, data governance and digital infrastructure policy",
        "Researching and planning AI adoption for classroom use"
      ],
      links: [{ label: "Full case study", href: "/work/ali-public-school" }]
    },
    {
      period: "Ongoing",
      title: "Paid growth on Meta",
      summary:
        "Campaigns planned and run end to end in Meta Ads Manager. APS Premier, last 90 days: 10 ads, Rs78.76K spend.",
      items: [
        "577.4K views and 204.3K people reached",
        "69,188 post engagements and 5,458 link clicks",
        "Hiring campaign: 41,581 reached and 1,260 link clicks from one post",
        "An 8-sheet marketing system: content calendar, budget, lead tracking, reporting"
      ],
      links: [
        {
          label: "Digital marketing on Thinkova",
          href: externalLinks.thinkovaProjects.digitalMarketing
        }
      ]
    }
  ],
  tools: ["Classster", "Xero", "Meta Ads Manager", "Notion", "Next.js", "Vercel", "Cloudflare"]
} as const;
