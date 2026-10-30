import { Clock, Download, Mail, MapPin } from "lucide-react";

import { SocialLinks } from "@/components/shared";
import { ButtonLink, Card, Reveal, Section, SectionHeader } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { contactIntro } from "@/data/contact";
import { ContactForm } from "@/sections/Contact/ContactForm";

function ContactDetails() {
  const { contact, author, links } = siteConfig;

  return (
    <div className="space-y-8">
      <ul className="space-y-4 text-sm text-foreground-secondary">
        {contact.email ? (
          <li className="flex items-center gap-3">
            <Mail aria-hidden="true" size={16} className="text-accent-cyan" />
            <a href={`mailto:${contact.email}`} className="hover:text-foreground-primary hover:underline">
              {contact.email}
            </a>
          </li>
        ) : null}
        <li className="flex items-center gap-3">
          <MapPin aria-hidden="true" size={16} className="text-accent-cyan" />
          {author.location}
        </li>
        <li className="flex items-center gap-3">
          <Clock aria-hidden="true" size={16} className="text-accent-cyan" />
          {contact.responseTime}
        </li>
      </ul>

      <SocialLinks />

      {links.resume ? (
        <ButtonLink href={links.resume} variant="secondary" size="md" download>
          <Download aria-hidden="true" size={15} />
          Download resume
        </ButtonLink>
      ) : null}
    </div>
  );
}

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent-blue/10 blur-3xl"
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <SectionHeader intro={contactIntro} titleId="contact-title" />
          <Reveal staggerIndex={1} className="mt-10">
            <ContactDetails />
          </Reveal>
        </div>

        <Reveal staggerIndex={2}>
          <Card className="p-6 md:p-8">
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
