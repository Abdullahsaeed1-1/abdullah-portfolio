import type { Metadata } from "next";

import { JourneyExperience } from "@/components/journey/JourneyExperience";
import { Container, PageShell } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journeyClosing, journeyIntro, milestones } from "@/content/journey";

export const metadata: Metadata = {
  title: "Journey",
  description: journeyIntro.heading,
  alternates: { canonical: "/journey" }
};

export default function JourneyPage() {
  return (
    <PageShell>
      <ThemedSection as="div" theme="dark" isFirst className="pb-26 pt-16 md:pb-40 md:pt-26">
        <Container>
          <SectionHeading as="h1" eyebrow={journeyIntro.eyebrow} heading={journeyIntro.heading} />
          <div className="mt-16 md:mt-26">
            <JourneyExperience milestones={milestones} />
          </div>
        </Container>
      </ThemedSection>

      {/* The one place "student" appears on the site — at the end, after the proof. */}
      <ThemedSection as="div" theme="signal" className="section-rhythm">
        <Container>
          <p className="max-w-[20ch] font-display text-display text-ink">{journeyClosing}</p>
        </Container>
      </ThemedSection>
    </PageShell>
  );
}
