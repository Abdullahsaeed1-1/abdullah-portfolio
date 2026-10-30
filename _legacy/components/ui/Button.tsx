import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "md" | "lg";

const baseStyles =
  "group inline-flex items-center justify-center gap-2 rounded-full border font-semibold transition duration-normal ease-out focus-visible:outline-accent-cyan active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-accent-blue bg-accent-blue text-white shadow-glow hover:-translate-y-0.5 hover:border-accent-cyan hover:bg-accent-cyan",
  secondary:
    "border-white/14 bg-white/[0.04] text-foreground-primary hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.08]",
  ghost: "border-transparent text-foreground-secondary hover:bg-white/[0.06] hover:text-foreground-primary",
  danger: "border-status-error bg-status-error text-white hover:-translate-y-0.5 hover:bg-status-error/90"
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm"
};

interface ButtonStyleOptions {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
}

export function getButtonClassName({ variant = "primary", size = "lg", className }: ButtonStyleOptions) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">,
    ButtonStyleOptions {
  readonly isLoading?: boolean;
  readonly loadingLabel?: string;
}

export function Button({
  children,
  isLoading = false,
  loadingLabel = "Loading",
  disabled,
  variant,
  size,
  className,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={getButtonClassName({ variant, size, className })}
      {...buttonProps}
    >
      {isLoading ? (
        <>
          <LoaderCircle aria-hidden="true" size={16} className="animate-spin" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

interface ButtonLinkProps extends ButtonStyleOptions {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly isExternal?: boolean;
  readonly download?: boolean;
}

export function ButtonLink({ href, children, isExternal = false, download, ...styleOptions }: ButtonLinkProps) {
  const className = getButtonClassName(styleOptions);

  if (isExternal || download) {
    return (
      <a
        href={href}
        className={className}
        download={download}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
