import { cn } from "@/utils/cn";

const controlStyles =
  "w-full rounded-md border bg-background-primary/60 px-4 py-3 text-sm text-foreground-primary placeholder:text-foreground-muted/70 transition-colors duration-fast focus:border-accent-cyan/70 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent-cyan/25 disabled:cursor-not-allowed disabled:opacity-60";

interface FormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly helperText?: string;
  readonly isOptional?: boolean;
  readonly isMultiline?: boolean;
  readonly controlProps: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export function FormField({
  id,
  label,
  error,
  helperText,
  isOptional = false,
  isMultiline = false,
  controlProps
}: FormFieldProps) {
  const descriptionId = error || helperText ? `${id}-description` : undefined;
  const sharedProps = {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": descriptionId,
    className: cn(
      controlStyles,
      error ? "border-status-error/70" : "border-white/10 hover:border-white/20",
      isMultiline && "min-h-36 resize-y"
    )
  };

  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-foreground-secondary">
        {label}
        {isOptional ? <span className="text-xs font-normal text-foreground-muted">Optional</span> : null}
      </label>
      <div className="mt-2">
        {isMultiline ? <textarea {...controlProps} {...sharedProps} /> : <input {...controlProps} {...sharedProps} />}
      </div>
      {descriptionId ? (
        <p
          id={descriptionId}
          className={cn("mt-2 text-xs", error ? "text-status-error" : "text-foreground-muted")}
        >
          {error ?? helperText}
        </p>
      ) : null}
    </div>
  );
}
