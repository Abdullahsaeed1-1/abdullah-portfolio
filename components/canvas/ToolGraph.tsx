"use client";

import { createToolGraphScene } from "@/components/canvas/toolGraphScene";
import { useCanvasScene } from "@/lib/canvas";
import { cn } from "@/lib/cn";

interface ToolGraphProps {
  readonly label: string;
  readonly className?: string;
}

export function ToolGraph({ label, className }: ToolGraphProps) {
  const canvasRef = useCanvasScene(createToolGraphScene);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      width={1000}
      height={300}
      className={cn("block aspect-[3/4] w-full sm:aspect-[10/3]", className)}
    >
      {label}
    </canvas>
  );
}
