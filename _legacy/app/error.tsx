"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { Button, ButtonLink, Container } from "@/components/ui";

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[70vh] items-center py-24">
      <Container className="text-center">
        <h1 className="text-4xl font-semibold text-foreground-primary sm:text-5xl">Something went wrong.</h1>
        <p className="mx-auto mt-5 max-w-readable text-base leading-7 text-foreground-muted">
          This part of the page could not load. Trying again usually fixes it.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RotateCcw aria-hidden="true" size={16} />
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
