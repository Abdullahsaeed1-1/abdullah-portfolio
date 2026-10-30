"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Karachi",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});

/** Local time in Lahore. Rendered empty on the server so hydration never disagrees about the second. */
export function LahoreClock({ className }: { readonly className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <span
      className={cn(
        "items-center gap-2 font-mono text-[12px] tabular-nums text-cream/70",
        className
      )}
    >
      <span className="min-w-[8ch]">{time ?? "--:--:--"}</span>
      <span className="text-cream/45">Lahore</span>
    </span>
  );
}
