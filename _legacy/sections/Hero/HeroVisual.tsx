"use client";

import dynamic from "next/dynamic";

import { useCanRenderScene } from "@/hooks/useCanRenderScene";

// three.js is only downloaded on devices that will actually render the scene.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export function HeroVisual() {
  const canRenderScene = useCanRenderScene();

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-[12%] rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
      <div className="absolute inset-[14%] rounded-full border border-dashed border-accent-cyan/15" />
      {canRenderScene ? (
        <div className="absolute inset-0 animate-scene-fade-in">
          <HeroScene />
        </div>
      ) : null}
    </div>
  );
}
