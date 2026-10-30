"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

import { JourneyRail } from "@/components/journey/JourneyRail";
import { MilestoneEntry } from "@/components/journey/MilestoneEntry";
import type { Milestone } from "@/content/types";

// three.js and R3F are fetched only here, and only once the device has proven it can use them.
const JourneyThread = dynamic(() => import("@/components/three/JourneyThread"), { ssr: false });

const SCENE_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function JourneyExperience({ milestones }: { readonly milestones: readonly Milestone[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [canRenderScene, setCanRenderScene] = useState(false);

  useEffect(() => {
    const sceneQuery = window.matchMedia(SCENE_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const hasWebGL = supportsWebGL();

    function evaluate() {
      setCanRenderScene(hasWebGL && sceneQuery.matches && !reducedMotionQuery.matches);
    }

    evaluate();
    sceneQuery.addEventListener("change", evaluate);
    reducedMotionQuery.addEventListener("change", evaluate);

    return () => {
      sceneQuery.removeEventListener("change", evaluate);
      reducedMotionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  // 0 when the first milestone reaches the middle of the viewport, 1 when the last one does.
  const getProgress = useCallback(() => {
    const entries = listRef.current?.querySelectorAll<HTMLElement>("[data-milestone]");

    if (!entries || entries.length < 2) {
      return 0;
    }

    const viewportMiddle = window.innerHeight / 2;
    const first = entries[0].getBoundingClientRect().top;
    const last = entries[entries.length - 1].getBoundingClientRect().top;

    return Math.min(Math.max((viewportMiddle - first) / (last - first), 0), 1);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[5fr_7fr] lg:gap-10">
      <div className="hidden lg:block">
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center">
          {canRenderScene ? (
            <div className="size-full">
              <JourneyThread milestoneCount={milestones.length} getProgress={getProgress} />
            </div>
          ) : (
            <JourneyRail milestones={milestones} />
          )}
        </div>
      </div>

      <ol ref={listRef} className="space-y-26 lg:space-y-0">
        {milestones.map((milestone) => (
          <li key={milestone.id} className="lg:flex lg:min-h-[80svh] lg:items-center">
            <MilestoneEntry milestone={milestone} />
          </li>
        ))}
      </ol>
    </div>
  );
}
