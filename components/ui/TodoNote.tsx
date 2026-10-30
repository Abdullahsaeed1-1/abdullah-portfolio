interface TodoNoteProps {
  readonly children: React.ReactNode;
}

// Reminders for the site owner only: shown while developing, never on the live site.
export function TodoNote({ children }: TodoNoteProps) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <p className="rounded-[12px] border border-dashed border-muted px-4 py-3 font-mono text-mono text-muted">
      {children}
    </p>
  );
}
