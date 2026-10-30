import { cn } from "@/utils/cn";

interface CardProps {
  readonly children: React.ReactNode;
  readonly isInteractive?: boolean;
  readonly className?: string;
  readonly as?: "div" | "article" | "li";
}

export function Card({ children, isInteractive = false, className, as: Element = "div" }: CardProps) {
  return (
    <Element
      className={cn(
        "relative rounded-xl border border-white/[0.08] bg-background-secondary/70 p-6 shadow-soft backdrop-blur-sm",
        isInteractive &&
          "transition duration-normal ease-out hover:-translate-y-1 hover:border-accent-cyan/25 hover:shadow-glow",
        className
      )}
    >
      {children}
    </Element>
  );
}
