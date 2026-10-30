import { Reveal, Section, SectionHeader } from "@/components/ui";
import { services, servicesIntro } from "@/data/services";
import { ServiceCard } from "@/sections/Services/ServiceCard";

const SERVICES_PER_ROW = 3;

export function Services() {
  return (
    <Section id="services" labelledBy="services-title" className="bg-background-secondary/30">
      <SectionHeader intro={servicesIntro} titleId="services-title" />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.id} as="li" staggerIndex={index % SERVICES_PER_ROW}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
