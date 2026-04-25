"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Lenis smooth-scroll provider — Archform-style buttery feel with ghosting.
 *
 * Uses **lerp-based** mode so elements perpetually trail behind the scroll
 * target, creating that visible "ghosting" lag on images and components.
 *
 * – `lerp: 0.075`    → low value = more visible trailing/ghosting
 * – `smoothWheel`    → true — smooths discrete wheel ticks into fluid motion
 * – `syncTouch`      → false — native touch inertia is already perfect
 * – `wheelMultiplier: 1` → 1:1 wheel distance
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.2,
        touchMultiplier: 1,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

