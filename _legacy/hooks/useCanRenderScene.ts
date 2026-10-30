"use client";

import { useEffect, useState } from "react";

const DESKTOP_POINTER_QUERY = "(min-width: 1024px) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");

    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// The 3D scene is an enhancement: only capable desktop devices without a reduced-motion preference get it.
export function useCanRenderScene() {
  const [canRenderScene, setCanRenderScene] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_POINTER_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const hasWebGL = supportsWebGL();

    function evaluate() {
      setCanRenderScene(hasWebGL && desktopQuery.matches && !reducedMotionQuery.matches);
    }

    evaluate();
    desktopQuery.addEventListener("change", evaluate);
    reducedMotionQuery.addEventListener("change", evaluate);

    return () => {
      desktopQuery.removeEventListener("change", evaluate);
      reducedMotionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return canRenderScene;
}
