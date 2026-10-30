"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import type { Screenshot } from "@/content/types";

const KEYBOARD_STEP = 5;
const INITIAL_POSITION = 50;

interface SliderSide {
  readonly shot: Screenshot;
  readonly hasImage: boolean;
}

interface BeforeAfterSliderProps {
  readonly before: SliderSide;
  readonly after: SliderSide;
}

function SliderPane({ side, caption }: { readonly side: SliderSide; readonly caption: string }) {
  return (
    <div className="absolute inset-0 bg-surface">
      {side.hasImage ? (
        <Image
          src={side.shot.src}
          alt={side.shot.alt}
          fill
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex size-full items-center p-6 [.after_&]:justify-end [.before_&]:justify-start">
          <span className="font-mono text-mono text-ink">{side.shot.label}</span>
        </div>
      )}
      <span className="eyebrow absolute top-4 border border-line bg-paper px-2 py-1 text-ink [.before_&]:left-4 [.after_&]:right-4">
        {caption}
      </span>
    </div>
  );
}

/** No automatic sweep: the visitor drags, so they engage with the comparison themselves. */
export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(INITIAL_POSITION);

  function updateFromPointer(clientX: number) {
    const bounds = containerRef.current?.getBoundingClientRect();

    if (bounds) {
      setPosition(Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100)));
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      updateFromPointer(event.clientX);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const nextPositions: Record<string, number> = {
      ArrowLeft: position - KEYBOARD_STEP,
      ArrowRight: position + KEYBOARD_STEP,
      Home: 0,
      End: 100
    };
    const nextPosition = nextPositions[event.key];

    if (nextPosition !== undefined) {
      event.preventDefault();
      setPosition(Math.min(100, Math.max(0, nextPosition)));
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden border border-line"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <div className="after absolute inset-0">
        <SliderPane side={after} caption="After" />
      </div>
      <div
        className="before absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <SliderPane side={before} caption="Before" />
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare the old WordPress site with the rebuild"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% old site shown`}
        onKeyDown={handleKeyDown}
        className="absolute inset-y-0 -ml-3 flex w-6 justify-center"
        style={{ left: `${position}%` }}
      >
        <span aria-hidden="true" className="h-full w-px bg-ink" />
        <span aria-hidden="true" className="absolute top-1/2 size-3 -translate-y-1/2 bg-olive" />
      </div>
    </div>
  );
}
