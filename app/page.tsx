import { HeroSequence } from "@/components/hero/HeroSequence";
import { Clients } from "@/components/home/Clients";
import { JourneyScroll } from "@/components/home/JourneyScroll";
import { Qualifications } from "@/components/home/Qualifications";
import { Container, PageShell } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/content/home";
import { site } from "@/content/site";
import { shotExists } from "@/lib/shots";

const PORTRAIT_SRC = "/portrait.png";

// The projects live in the hero's second phase; below it the page tells the journey, then the
// proof (qualifications, clients) and the call to action.
// Order: hero (dark) → journey (dark, continuous) → qualifications (light) → clients (dark)
// → call to action (light) → footer (dark).
export default function HomePage() {
  return (
    <PageShell className="pt-0">
      <HeroSequence portraitSrc={shotExists(PORTRAIT_SRC) ? PORTRAIT_SRC : null} />
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
                className="mt-4 inline-block font-mono text-mono text-accent underline-offset-4 hover:underline"
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
