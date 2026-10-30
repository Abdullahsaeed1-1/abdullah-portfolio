import { AgentOrbit } from "@/components/canvas/AgentOrbit";
import { Container } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { ButtonLink } from "@/components/ui/Button";
import { hero } from "@/content/home";
import { enterStyle } from "@/lib/motion";

export function Hero() {
  return (
    <ThemedSection
      theme="dark"
      isFirst
      labelledBy="hero-heading"
      className="overflow-hidden pb-26 pt-10 md:pb-40 md:pt-20"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[52fr_48fr] lg:items-center">
          <div>
            <p className="eyebrow animate-enter text-muted" style={enterStyle(0)}>
              {hero.eyebrow}
            </p>
            {/*
              The heading and paragraph are the largest-paint candidates, so they are visible on the
              first frame; fading them in from opacity 0 pushed mobile LCP from 2.8s to 3.4s.
            */}
            <h1 id="hero-heading" className="mt-8 font-display text-display text-ink">
              {hero.heading.before}
              <span className="text-signal">{hero.heading.signal}</span>
              {hero.heading.after}
            </h1>
            <p className="mt-8 max-w-[50ch] text-body-lg text-muted">{hero.body}</p>
            <div
              className="mt-10 flex animate-enter flex-col gap-3 sm:flex-row"
              style={enterStyle(1)}
            >
              <ButtonLink href={hero.actions[0].href} variant="primary">
                {hero.actions[0].label} →
              </ButtonLink>
              <ButtonLink href={hero.actions[1].href}>{hero.actions[1].label}</ButtonLink>
            </div>
          </div>

          <figure className="animate-enter" style={enterStyle(2)}>
            <AgentOrbit label={hero.canvasLabel} />
            <figcaption className="sr-only">{hero.canvasCaption}</figcaption>
          </figure>
        </div>
      </Container>
    </ThemedSection>
  );
}
