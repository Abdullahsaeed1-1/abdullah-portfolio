import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { SocialLinks } from "@/components/shared";
import { Badge, ButtonLink } from "@/components/ui";
import { heroContent } from "@/data/hero";
import { HeroCapabilities, HeroSignals } from "@/sections/Hero/HeroDetails";
import { HeroVisual } from "@/sections/Hero/HeroVisual";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-background-primary"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero/engineering-command-center.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center] opacity-40"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(var(--color-background-primary))_0%,rgb(var(--color-background-primary)/0.94)_32%,rgb(var(--color-background-primary)/0.6)_64%,rgb(var(--color-background-primary)/0.82)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background-primary to-transparent" />

      <div className="mx-auto grid grid-cols-1 min-h-[calc(100svh-4rem)] max-w-shell items-center gap-12 px-6 pb-24 pt-16 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:py-24">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 animate-hero-fade-up">
            <Badge tone="success">
              <span aria-hidden="true" className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-success opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-status-success" />
              </span>
              {heroContent.availability}
            </Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-cyan">
              {heroContent.eyebrow}
            </span>
          </div>

          <h1
            id="hero-title"
            className="mt-7 text-5xl font-semibold leading-[1.02] text-foreground-primary animate-hero-fade-up [animation-delay:80ms] sm:text-6xl lg:text-7xl"
          >
            {heroContent.title}
            <span className="mt-3 block bg-gradient-to-r from-foreground-primary via-foreground-secondary to-accent-cyan bg-clip-text text-2xl font-medium leading-tight text-transparent sm:text-3xl lg:text-4xl">
              {heroContent.role}
            </span>
          </h1>

          <p className="mt-6 max-w-readable text-lg leading-8 text-foreground-secondary animate-hero-fade-up [animation-delay:160ms]">
            {heroContent.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 animate-hero-fade-up [animation-delay:240ms] sm:flex-row sm:items-center">
            {heroContent.actions.map((action) => (
              <ButtonLink key={action.label} href={action.href} variant={action.variant}>
                {action.label}
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </ButtonLink>
            ))}
            <SocialLinks className="sm:ml-2" />
          </div>

          <div className="mt-12 space-y-5 animate-hero-fade-up [animation-delay:320ms]">
            <HeroCapabilities />
            <HeroSignals />
          </div>
        </div>

        <div className="hidden lg:block">
          <HeroVisual />
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 rounded-full px-3 py-2 text-xs text-foreground-muted transition-colors duration-fast hover:text-foreground-primary md:flex"
      >
        Scroll to explore
        <ChevronDown aria-hidden="true" size={16} className="animate-scroll-hint" />
      </a>
    </section>
  );
}
