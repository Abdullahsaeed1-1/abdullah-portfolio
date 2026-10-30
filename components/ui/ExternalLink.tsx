import { cn } from "@/lib/cn";

interface ExternalLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

/**
 * A pill link to a live site or an outside page. On hover the accent fills in from the left and
 * the arrow lifts towards the corner, so it reads as "this leaves the site".
 */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-line px-4 py-2 text-small font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-paper",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-0 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
      <span className="relative">{children}</span>
      <span
        aria-hidden="true"
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
