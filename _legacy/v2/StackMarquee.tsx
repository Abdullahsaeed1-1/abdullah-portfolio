import { featuredProjects, otherProjects } from "@/content/projects";

// Every technology named across the case studies, once each, in the order they first appear.
const technologies = Array.from(
  new Set([...featuredProjects, ...otherProjects].flatMap((project) => project.stack))
);

/** A lime band of the real stack, scrolling slowly; it stops for reduced motion. */
export function StackMarquee() {
  return (
    <div
      data-theme="acid"
      className="relative -mt-6 overflow-hidden bg-olive pb-16 pt-5 text-coal md:pb-[72px]"
    >
      <p className="sr-only">Technologies used across these projects: {technologies.join(", ")}.</p>
      <div aria-hidden="true" className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {technologies.map((technology) => (
              <li key={technology} className="flex items-center font-display text-h3">
                <span className="px-6">{technology}</span>
                <span className="text-small">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
