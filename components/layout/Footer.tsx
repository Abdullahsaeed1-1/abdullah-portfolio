import { Container } from "@/components/layout/PageShell";
import { ThemedSection } from "@/components/layout/ThemedSection";
import { site } from "@/content/site";

const linkClass =
  "inline-flex min-h-11 items-center text-ink underline-offset-4 transition-colors duration-150 hover:text-olive hover:underline";

export function Footer() {
  return (
    <ThemedSection as="footer" theme="dark" className="pb-10 pt-26">
      <Container>
        <a
          href={`mailto:${site.businessEmail}`}
          className="block font-display text-[1.35rem] leading-tight min-[360px]:text-[1.6rem] text-ink transition-colors duration-150 hover:text-olive sm:text-h1"
        >
          {site.businessEmail.split("@")[0]}@
          <wbr />
          {site.businessEmail.split("@")[1]}
        </a>
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 font-mono text-mono md:flex-row md:items-center md:gap-10">
          <a href={`mailto:${site.email}`} className={linkClass}>
            {site.email}
          </a>
          <a
            href={site.github.href}
            className={linkClass}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          {site.linkedin ? (
            <a
              href={site.linkedin.href}
              className={linkClass}
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          ) : null}
          <span className="text-muted md:ml-auto">{site.copyright}</span>
        </div>
      </Container>
    </ThemedSection>
  );
}
