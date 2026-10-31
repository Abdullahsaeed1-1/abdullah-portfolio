import type { Metadata } from "next";

import { HeroSequence } from "@/components/hero/HeroSequence";
import { Clients } from "@/components/home/Clients";
import { HeroProof } from "@/components/home/HeroProof";
import { JourneyScroll } from "@/components/home/JourneyScroll";
import { Qualifications } from "@/components/home/Qualifications";
import { Container, PageShell } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/content/home";
import { qualifications } from "@/content/qualifications";
import { site } from "@/content/site";
import { shotExists } from "@/lib/shots";

const PORTRAIT_SRC = "/portrait.png";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

// Person + ProfilePage structured data: name, role, skills and profiles for search engines.
const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: site.url,
  mainEntity: {
    "@type": "Person",
    name: site.name,
    jobTitle: "Full-stack & AI automation developer",
    url: site.url,
    email: `mailto:${site.businessEmail}`,
    image: `${site.url}${PORTRAIT_SRC}`,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    worksFor: {
      "@type": "Organization",
      name: "Thinkova Technologies",
      url: "https://www.thinkovatechnologies.com"
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: qualifications.education.institution },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "AI agents",
      "Constraint solving",
      "Meta Ads"
    ],
    sameAs: [site.github.href, ...(site.linkedin ? [site.linkedin.href] : [])]
  }
};

// Order: hero (dark) → work and clients below 1280px (light) → journey (dark)
// → qualifications (light) → clients (dark) → call to action (light) → footer (dark).
export default function HomePage() {
  return (
    <PageShell className="pt-0">
      <script
        type="application/ld+json"
        // Static data from our own content files, so serialising it directly is safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <HeroSequence portraitSrc={shotExists(PORTRAIT_SRC) ? PORTRAIT_SRC : null} />
      <HeroProof />
      <JourneyScroll />
      <Qualifications />
      <Clients />

      <ThemedSection theme="light" labelledBy="final-cta-heading" className="section-rhythm">
        <Container>
          <Reveal>
            <h2 id="final-cta-heading" className="max-w-[18ch] font-display text-display text-ink">
              {finalCta.heading}
            </h2>
          </Reveal>
          <Reveal
            staggerIndex={1}
            className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="max-w-[46ch] text-body-lg text-muted">{finalCta.line}</p>
              <a
                href={`mailto:${site.businessEmail}`}
                className="mt-2 inline-flex min-h-11 items-center font-mono text-mono text-accent underline-offset-4 hover:underline"
              >
                {site.businessEmail}
              </a>
            </div>
            <ButtonLink href={finalCta.action.href} variant="primary" className="shrink-0">
              {finalCta.action.label} →
            </ButtonLink>
          </Reveal>
        </Container>
      </ThemedSection>
    </PageShell>
  );
}
