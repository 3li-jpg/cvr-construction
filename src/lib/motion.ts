import type { Transition, Variants } from "motion/react";

// ---------------------------------------------------------------------------
// Easings
// ---------------------------------------------------------------------------
// Primary easing used across all inner-page sections. Matches the feel of the
// landing hero and the Archform reference. All Framer-Motion consumers should
// import EASE_OUT_EXPO; anywhere CSS transitions are used, use EASE_OUT_EXPO_CSS
// so the two systems stay in lockstep.
export const EASE_OUT_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const EASE_OUT_EXPO_CSS = "cubic-bezier(0.19, 1, 0.22, 1)";
export const EASE_IN_OUT_CSS = "cubic-bezier(0.76, 0, 0.24, 1)";

// ---------------------------------------------------------------------------
// Durations (seconds)
// ---------------------------------------------------------------------------
export const DURATION = {
  xs: 0.35,
  sm: 0.5,
  md: 0.7,
  base: 0.9,
  lg: 1.1,
} as const;

// ---------------------------------------------------------------------------
// Translate distances (pixels)
// ---------------------------------------------------------------------------
export const DISTANCE = {
  sm: 24,
  md: 40,
  base: 60,
} as const;

// ---------------------------------------------------------------------------
// Stagger timings
// ---------------------------------------------------------------------------
export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.14,
} as const;

// ---------------------------------------------------------------------------
// Viewport presets for `whileInView`
// ---------------------------------------------------------------------------
export const VIEWPORT = {
  once: true,
  margin: "0px 0px -15% 0px",
} as const;

export const VIEWPORT_EARLY = {
  once: true,
  margin: "0px 0px -10% 0px",
} as const;

// ---------------------------------------------------------------------------
// Shared transitions
// ---------------------------------------------------------------------------
export const sectionTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT_EXPO,
};

export const pageTransition: Transition = {
  duration: DURATION.md,
  ease: EASE_OUT_EXPO,
};

// ---------------------------------------------------------------------------
// Common variants
// ---------------------------------------------------------------------------
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.base },
  show: {
    opacity: 1,
    y: 0,
    transition: sectionTransition,
  },
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: DISTANCE.md },
  show: {
    opacity: 1,
    y: 0,
    transition: sectionTransition,
  },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: DISTANCE.sm },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO },
  },
};

// Parent container that staggers its children when it enters view. Each child
// must itself be a motion element with its own `hidden`/`show` variants (e.g.
// `fadeUpItem` below).
export const stagger = (step: number = STAGGER.base, initialDelay: number = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: step, delayChildren: initialDelay },
  },
});

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

// Indexed variant — good for grids/lists where each item should stagger based
// on its index rather than relying on a parent container.
export const indexedFadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO, delay: i * STAGGER.base },
  }),
};

// ---------------------------------------------------------------------------
// Page / route transition
// ---------------------------------------------------------------------------
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: DURATION.xs, ease: EASE_OUT_EXPO },
  },
};
