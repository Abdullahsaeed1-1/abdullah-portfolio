import { Check } from "lucide-react";

import { Card } from "@/components/ui";
import type { Service } from "@/types/content";

interface ServiceCardProps {
  readonly service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const ServiceIcon = service.icon;

  return (
    <Card as="article" isInteractive className="flex h-full flex-col">
      <span className="inline-flex size-11 items-center justify-center rounded-md border border-accent-cyan/20 bg-accent-cyan/[0.08] text-accent-cyan">
        <ServiceIcon aria-hidden="true" size={20} strokeWidth={1.75} />
      </span>

      <h3 className="mt-6 text-lg font-semibold text-foreground-primary">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-foreground-muted">{service.summary}</p>

      <ul className="mt-6 space-y-2 border-t border-white/[0.06] pt-5" aria-label={`${service.title} deliverables`}>
        {service.deliverables.map((deliverable) => (
          <li key={deliverable} className="flex items-center gap-2 text-sm text-foreground-secondary">
            <Check aria-hidden="true" size={14} className="shrink-0 text-accent-cyan" />
            {deliverable}
          </li>
        ))}
      </ul>
    </Card>
  );
}
