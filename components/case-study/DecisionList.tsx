import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import type { Decision } from "@/content/types";

/** The decisions carry the most weight on a case study, so they get the largest type and the most air. */
export function DecisionList({ decisions }: { readonly decisions: readonly Decision[] }) {
  return (
    <ol className="space-y-26">
      {decisions.map((decision, index) => (
        <li key={decision.title}>
          <Reveal>
            <p className="font-display text-h2 text-olive">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 max-w-[24ch] font-display text-h1 text-ink">{decision.title}</h3>
            <Prose paragraphs={decision.paragraphs} className="mt-6" />
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
