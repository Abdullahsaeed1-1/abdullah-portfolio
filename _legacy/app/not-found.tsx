import { ArrowLeft } from "lucide-react";

import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[70vh] items-center py-24">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent-cyan">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground-primary sm:text-5xl">This page does not exist.</h1>
        <p className="mx-auto mt-5 max-w-readable text-base leading-7 text-foreground-muted">
          The link may be outdated, or the page may have moved. Everything worth seeing is on the home page.
        </p>
        <ButtonLink href="/" variant="secondary" className="mt-10">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to home
        </ButtonLink>
      </Container>
    </main>
  );
}
