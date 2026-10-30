interface TodoNoteProps {
  readonly children: React.ReactNode;
}

/** Missing real information is shown as a visible TODO, never filled with invented copy. */
export function TodoNote({ children }: TodoNoteProps) {
  return (
    <p className="rounded-[12px] border border-dashed border-muted px-4 py-3 font-mono text-mono text-muted">
      {children}
    </p>
  );
}
