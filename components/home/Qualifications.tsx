import { Container } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { Reveal } from "@/components/ui/Reveal";
import { qualifications } from "@/content/qualifications";

export function Qualifications() {
  const { education, certifications, languages } = qualifications;

  return (
    <ThemedSection theme="light" labelledBy="qualifications-heading" className="section-rhythm">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-accent">{qualifications.eyebrow}</p>
            <h2
              id="qualifications-heading"
              className="mt-4 max-w-[16ch] font-display text-h1 text-ink"
            >
              {qualifications.heading}
            </h2>

            <div className="mt-12 rounded-[24px] bg-surface p-6 md:p-8">
              <p className="font-mono text-mono text-muted">{education.label}</p>
              <p className="mt-3 font-display text-h2 text-ink">{education.degree}</p>
              <p className="mt-2 text-body text-ink">{education.institution}</p>
              <p className="mt-4 inline-block rounded-full bg-accent px-3 py-1 text-small font-medium text-paper">
                {education.status}
              </p>
            </div>
          </Reveal>

          <div>
            <p className="font-mono text-mono text-muted">Certifications</p>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {certifications.map((certification, index) => (
                <li key={certification.name}>
                  <Reveal
                    staggerIndex={index}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 transition-colors duration-300 hover:bg-surface md:px-4"
                  >
                    <span className="font-mono text-mono text-accent">0{index + 1}</span>
                    <span>
                      <span className="block font-display text-h3 text-ink">
                        {certification.name}
                      </span>
                      <span className="mt-1 block text-small text-muted">
                        {certification.issuer}
                      </span>
                    </span>
                    <span className="font-mono text-mono text-muted">
                      {certification.year ?? ""}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-small text-muted">Languages: {languages.join(" · ")}</p>
          </div>
        </div>
      </Container>
    </ThemedSection>
  );
}
