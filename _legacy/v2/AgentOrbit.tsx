"use client";

import { createAgentScene } from "@/components/canvas/agentScene";
import { useCanvasScene } from "@/lib/canvas";
import { cn } from "@/lib/cn";

interface AgentOrbitProps {
  readonly label: string;
  readonly className?: string;
}

export function AgentOrbit({ label, className }: AgentOrbitProps) {
  const canvasRef = useCanvasScene(createAgentScene);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      width={640}
      height={600}
      className={cn("block aspect-square w-full sm:aspect-[16/15]", className)}
    >
      {label}
    </canvas>
  );
}
