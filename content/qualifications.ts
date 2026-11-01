// From Abdullah's CV and his Coursera account.
export const qualifications = {
  eyebrow: "Qualifications",
  heading: "Formal training behind the work.",
  education: {
    label: "Education",
    degree: "BS Computer Science",
    institution: "University of Central Punjab",
    status: "Lahore"
  },
  // Coursera certificates as listed on the account (Certificates & Badges), with completion months.
  certifications: [
    { name: "Fundamentals of Building AI Agents", issuer: "IBM · Coursera", year: "Sep 2026" },
    { name: "Principles of UX/UI Design", issuer: "Meta · Coursera", year: "Aug 2026" },
    {
      name: "Build AI Chatbots with React and AI APIs",
      issuer: "SkillsBooster Academy · Coursera",
      year: "Aug 2026"
    },
    {
      name: "Backend Development Internship (virtual), 10 Jun – 10 Jul 2026",
      issuer: "CodeAlpha",
      year: "Jul 2026"
    },
    {
      name: "Introduction to Retrieval Augmented Generation (RAG)",
      issuer: "Duke University · Coursera",
      year: "Jul 2026"
    },
    { name: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services", year: "Completed" }
  ],
  languages: ["English", "Urdu"]
} as const;
