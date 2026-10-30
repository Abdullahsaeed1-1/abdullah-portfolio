import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { Container, PageShell } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { TodoNote } from "@/components/ui/TodoNote";
import { contactCopy } from "@/content/contact";
import { site } from "@/content/site";
import { enterStyle } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Contact",
  description: contactCopy.line,
  alternates: { canonical: "/contact" }
};

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export default function ContactPage() {
  return (
    <PageShell>
      <ThemedSection
        theme="dark"
        isFirst
        labelledBy="contact-heading"
        className="pb-26 pt-16 md:pb-40 md:pt-26"
      >
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[5fr_7fr] lg:gap-10">
          <div>
            <h1 id="contact-heading" className="max-w-[14ch] font-display text-display text-ink">
              {contactCopy.heading}
            </h1>
            <p className="mt-8 max-w-[44ch] text-body-lg text-muted">{contactCopy.line}</p>
          </div>

          {/* The form sits on a light panel so the fields read clearly against the dark page. */}
          <div
            data-theme="light"
            className="animate-enter rounded-[28px] bg-paper p-6 text-ink md:p-10"
            style={enterStyle(0)}
          >
            {accessKey ? null : (
              <div className="mb-10">
                <TodoNote>
                  TODO: add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local — the form cannot deliver until
                  it is set.
                </TodoNote>
              </div>
            )}
            <ContactForm accessKey={accessKey} />

            <ul className="mt-16 space-y-2 font-mono text-mono">
              <li>
                <a
                  href={`mailto:${site.businessEmail}`}
                  className="font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  {site.businessEmail}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  {site.github.label}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </ThemedSection>
    </PageShell>
  );
}
