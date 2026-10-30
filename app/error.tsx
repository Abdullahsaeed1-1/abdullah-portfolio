"use client";

import { Container, PageShell } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { Button } from "@/components/ui/Button";
import { errorCopy } from "@/content/system";

export default function ErrorPage({ reset }: { readonly reset: () => void }) {
  return (
    <PageShell>
      <ThemedSection as="div" theme="dark" isFirst className="section-rhythm">
        <Container>
          <h1 className="max-w-[16ch] font-display text-h1 text-ink">{errorCopy.heading}</h1>
          <Button onClick={reset} className="mt-10">
            {errorCopy.retry}
          </Button>
        </Container>
      </ThemedSection>
    </PageShell>
  );
}
