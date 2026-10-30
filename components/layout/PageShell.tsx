import { cn } from "@/lib/cn";

interface PageShellProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

/** Offsets the fixed nav and gives every route the same landmark for the skip link. */
export function PageShell({ children, className }: PageShellProps) {
  return (
    <main id="main" tabIndex={-1} className={cn("pt-16 focus:outline-none", className)}>
      {children}
    </main>
  );
}

export function Container({ children, className }: PageShellProps) {
  return <div className={cn("gutter mx-auto w-full max-w-content", className)}>{children}</div>;
}
