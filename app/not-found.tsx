import { Container, PageShell } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { ButtonLink } from "@/components/ui/Button";
import { notFoundCopy } from "@/content/system";

export default function NotFound() {
  return (
    <PageShell>
      <ThemedSection as="div" theme="dark" isFirst className="section-rhythm">
        <Container>
          <p className="eyebrow text-muted">{notFoundCopy.eyebrow}</p>
          <h1 className="mt-6 max-w-[16ch] font-display text-h1 text-ink">
            {notFoundCopy.heading}
          </h1>
          <ButtonLink href={notFoundCopy.action.href} className="mt-10">
            {notFoundCopy.action.label}
          </ButtonLink>
        </Container>
      </ThemedSection>
    </PageShell>
  );
}
