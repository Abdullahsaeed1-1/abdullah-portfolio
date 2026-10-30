import { cn } from "@/utils/cn";

interface ContainerProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-content px-6 md:px-8", className)}>{children}</div>;
}
