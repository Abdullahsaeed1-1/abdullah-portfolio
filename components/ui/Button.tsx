import Link from "next/link";

import { cn } from "@/lib/cn";

type ButtonVariant = "default" | "primary";

const variantStyles: Record<ButtonVariant, string> = {
  default: "border-ink text-ink hover:bg-ink hover:text-paper",
  primary: "border-olive bg-olive text-coal hover:border-ink hover:bg-ink hover:text-paper"
};

export function buttonClassName(variant: ButtonVariant = "default", className?: string) {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-7 text-small font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    className
  );
}

interface ButtonLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly variant?: ButtonVariant;
  readonly className?: string;
}

export function ButtonLink({ href, children, variant, className }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClassName(variant, className)}>
      {children}
    </Link>
  );
}

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  readonly variant?: ButtonVariant;
  readonly className?: string;
}

export function Button({ variant, className, type = "button", ...buttonProps }: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, className)} {...buttonProps} />;
}
