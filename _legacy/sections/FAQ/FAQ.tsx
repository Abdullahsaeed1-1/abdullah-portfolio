import { Plus } from "lucide-react";

import { Reveal, Section, SectionHeader } from "@/components/ui";
import { faqEntries, faqIntro } from "@/data/faq";

export function FAQ() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <SectionHeader intro={faqIntro} titleId="faq-title" />

        {/* Native details/summary gives keyboard and screen reader support without client JavaScript. */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {faqEntries.map((entry, index) => (
            <Reveal key={entry.question} staggerIndex={index}>
              <details className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md py-4 text-left text-base font-medium text-foreground-primary transition-colors duration-fast hover:text-accent-cyan focus-visible:outline-accent-cyan [&::-webkit-details-marker]:hidden">
                  {entry.question}
                  <Plus
                    aria-hidden="true"
                    size={18}
                    className="shrink-0 text-foreground-muted transition-transform duration-normal group-open:rotate-45"
                  />
                </summary>
                <p className="pb-5 pr-10 text-sm leading-7 text-foreground-muted">{entry.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
