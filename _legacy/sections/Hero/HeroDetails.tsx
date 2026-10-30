import { Code2, Cpu, Layers3, ShieldCheck } from "lucide-react";

import { heroContent } from "@/data/hero";

const capabilityIcons = [Code2, Layers3, Cpu, ShieldCheck] as const;

export function HeroSignals() {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {heroContent.signals.map((signal) => (
        <div
          key={signal.label}
          className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-md"
        >
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">{signal.label}</dt>
          <dd className="mt-2 text-sm font-semibold text-foreground-primary">{signal.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function HeroCapabilities() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Engineering capabilities">
      {heroContent.capabilities.map((capability, index) => {
        const CapabilityIcon = capabilityIcons[index % capabilityIcons.length];

        return (
          <li
            key={capability}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background-secondary/60 px-3 py-2 text-xs font-medium text-foreground-secondary backdrop-blur-md"
          >
            <CapabilityIcon aria-hidden="true" size={14} className="text-accent-cyan" />
            {capability}
          </li>
        );
      })}
    </ul>
  );
}
