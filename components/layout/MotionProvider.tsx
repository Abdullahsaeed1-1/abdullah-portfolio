"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () => import("@/lib/motion-features").then((module) => module.default);

// The DOM feature set is fetched after hydration; scroll reveals are below the fold, so nothing waits on it.
export function MotionProvider({ children }: { readonly children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
