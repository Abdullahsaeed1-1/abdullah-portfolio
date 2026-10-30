import Link from "next/link";

import { heroSequence } from "@/content/hero-sequence";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

// Hidden until the scroll sequence reveals them (GSAP's autoAlpha sets visibility and opacity).
const cardClass =
  "invisible rounded-[18px] border border-cream/10 bg-coal/95 p-4 text-cream opacity-0 shadow-[0_24px_60px_-20px_rgba(10,10,11,0.55)]";

function CardLabel({ children }: { readonly children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cream/55">{children}</p>
  );
}

/* ——— Phase two: who I am, floating around the shrunken window. Every row is a link. ——— */

// Hover: an olive wash sweeps in from the left behind the row, and the arrow button fills.
const rowClass =
  "group relative -mx-3 flex items-center justify-between gap-4 overflow-hidden rounded-xl px-3 py-2.5 focus-visible:bg-cream/[0.07]";

function RowSweep() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 origin-left scale-x-0 rounded-xl bg-olive/[0.14] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
    />
  );
}

function RowButton({ symbol = "→" }: { readonly symbol?: string }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-cream/15 text-[13px] text-cream/60 transition-all duration-300 group-hover:border-olive group-hover:bg-olive group-hover:text-coal"
    >
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        {symbol}
      </span>
    </span>
  );
}

function TextArrow() {
  return (
    <span
      aria-hidden="true"
      className="text-cream/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-olive"
    >
      →
    </span>
  );
}

// "Igris — voice-first AI agent" → "voice-first AI agent"; titles without a dash are used whole.
function describe(title: string) {
  const [, descriptor] = title.split(" — ");
  return descriptor ?? title;
}

export function WorkCard({ className }: { readonly className?: string }) {
  const { work } = heroSequence;
  return (
    <nav
      data-seq="float"
      aria-label={work.label}
      className={cn(cardClass, "w-[22rem] p-5", className)}
    >
      <div className="flex items-center justify-between">
        <CardLabel>{work.label}</CardLabel>
        <span className="font-mono text-[11px] text-cream/40">0{featuredProjects.length}</span>
      </div>
      <ul className="mt-3">
        {featuredProjects.map((project, index) => {
          // Any link that is not a Thinkova project page points at the live product.
          const isLive = project.links?.some((link) => !link.href.includes("thinkovatechnologies"));

          return (
            <li key={project.slug}>
              <Link href={`/work/${project.slug}`} className={rowClass}>
                <RowSweep />
                <span className="relative flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-olive">0{index + 1}</span>
                  <span>
                    <span className="flex items-center gap-2 font-display text-[16px] font-semibold leading-tight">
                      {project.name}
                      {isLive ? (
                        <span className="rounded-full bg-olive/20 px-1.5 py-px font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-olive">
                          Live
                        </span>
                      ) : null}
                    </span>
                    <span className="block text-[12px] leading-snug text-cream/55">
                      {describe(project.title)}
                    </span>
                  </span>
                </span>
                <RowButton />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href={work.allHref}
        className="group mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-olive"
      >
        {work.allLabel}
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </nav>
  );
}

export function TestimonialCard({ className }: { readonly className?: string }) {
  const { testimonial } = heroSequence;
  return (
    <Link
      data-seq="float"
      href={testimonial.href}
      className={cn(cardClass, "group block w-[22rem] p-5", className)}
    >
      <CardLabel>{testimonial.label}</CardLabel>
      <p className="mt-3 font-display text-[19px] font-medium leading-snug">
        “{testimonial.quote}”
      </p>
      <p className="mt-4 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-olive text-[12px] font-semibold text-coal"
        >
          AA
        </span>
        <span>
          <span className="block text-[14px] font-medium leading-tight">{testimonial.name}</span>
          <span className="block text-[12px] text-cream/55">{testimonial.role}</span>
        </span>
      </p>
      <p className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-cream/55">
        {testimonial.linkLabel}
        <TextArrow />
      </p>
    </Link>
  );
}

export function ExperienceCard({ className }: { readonly className?: string }) {
  const { experience } = heroSequence;
  return (
    <Link
      data-seq="float"
      href={experience.href}
      className={cn(cardClass, "group block w-[22rem] p-5", className)}
    >
      <CardLabel>{experience.label}</CardLabel>
      <p className="mt-3 flex items-baseline gap-3">
        <span className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-olive">
          {experience.value}
        </span>
        <span className="font-display text-h3">{experience.unit}</span>
      </p>
      <ul className="mt-4 space-y-1.5 border-t border-cream/10 pt-4">
        {experience.lines.map((line) => (
          <li key={line} className="flex gap-2 text-[13px] text-cream/75">
            <span aria-hidden="true" className="text-olive">
              —
            </span>
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-cream/55">
        {experience.linkLabel}
        <TextArrow />
      </p>
    </Link>
  );
}

export function WorkedWithCard({ className }: { readonly className?: string }) {
  const { workedWith } = heroSequence;
  return (
    <nav
      data-seq="float"
      aria-label={workedWith.label}
      className={cn(cardClass, "w-[22rem] p-5", className)}
    >
      <CardLabel>{workedWith.label}</CardLabel>
      <ul className="mt-3">
        {workedWith.items.map((item) => (
          <li key={item.name}>
            <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
              <RowSweep />
              <span className="relative flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream/10 font-display text-[13px] font-bold text-olive"
                >
                  {item.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <span className="block text-[14px] font-medium leading-tight">{item.name}</span>
                  <span className="block text-[12px] leading-snug text-cream/55">{item.role}</span>
                </span>
              </span>
              <RowButton symbol="↗" />
              <span className="sr-only"> (opens the live site in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function StartBar({ className }: { readonly className?: string }) {
  const { start } = heroSequence;
  return (
    <div
      data-seq="float"
      className={cn(
        cardClass,
        "flex w-[min(640px,92vw)] flex-col gap-3 py-3 pl-5 pr-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        <p className="text-small text-cream/70">{start.hint}</p>
        <a
          href={`mailto:${site.businessEmail}`}
          className="block truncate font-mono text-[12px] text-olive hover:text-cream hover:underline"
        >
          {site.businessEmail}
        </a>
      </div>
      <Link
        href={start.href}
        className="group relative flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-olive px-5 py-2.5 text-[14px] font-semibold text-coal"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
        <span className="relative">{start.label}</span>
        <span
          aria-hidden="true"
          className="relative transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}

/* ——— Phase three: the camera flies into the face and the journey begins beside it ——— */

export function JourneyIntroPanel({ className }: { readonly className?: string }) {
  const { journeyIntro } = heroSequence;
  return (
    <div data-seq="dash" className={cn("invisible max-w-md text-cream opacity-0", className)}>
      <p className="eyebrow text-olive">{journeyIntro.eyebrow}</p>
      <h2 className="mt-5 font-display text-h1 text-cream">{journeyIntro.heading}</h2>
      <p className="mt-6 text-body-lg text-cream/70">{journeyIntro.line}</p>
      <p className="mt-10 flex items-center gap-4 text-small text-cream/60">
        <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-cream/15">
          <span className="absolute inset-x-0 top-0 h-4 animate-scroll-cue bg-olive" />
        </span>
        {journeyIntro.cue}
      </p>
    </div>
  );
}
