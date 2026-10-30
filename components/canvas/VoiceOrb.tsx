"use client";

import { createVoiceScene } from "@/components/canvas/voiceScene";
import { useCanvasScene } from "@/lib/canvas";
import { cn } from "@/lib/cn";

interface VoiceOrbProps {
  readonly label: string;
  readonly className?: string;
}

export function VoiceOrb({ label, className }: VoiceOrbProps) {
  const canvasRef = useCanvasScene(createVoiceScene);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      width={600}
      height={450}
      className={cn("block aspect-[4/3] w-full", className)}
    >
      {label}
    </canvas>
  );
}
