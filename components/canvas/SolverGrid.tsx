"use client";

import { createSolverScene } from "@/components/canvas/solverScene";
import { useCanvasScene } from "@/lib/canvas";
import { cn } from "@/lib/cn";

interface SolverGridProps {
  readonly label: string;
  readonly className?: string;
}

export function SolverGrid({ label, className }: SolverGridProps) {
  const canvasRef = useCanvasScene(createSolverScene);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      width={600}
      height={420}
      className={cn("block aspect-[10/7] w-full", className)}
    >
      {label}
    </canvas>
  );
}
