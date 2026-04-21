"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

type PageTransitionProps = {
  children: ReactNode;
};

// Curtain-style route transition: a black overlay sweeps from the bottom of
// the viewport up past the top on every route change. The page content itself
// never translates — this keeps sticky heroes, fixed navbars, and the landing's
// sticky-hero layout working exactly as authored. The overlay is skipped on the
// very first render (server → client hand-off) and for users with
// `prefers-reduced-motion: reduce`.
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [initialPathname] = useState(pathname);
  const hasNavigated = initialPathname !== pathname;

  return (
    <>
      {children}
      {!prefersReducedMotion && hasNavigated ? (
        <motion.div
          key={pathname}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[200] bg-black"
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "-100%"] }}
          transition={{
            duration: DURATION.base,
            times: [0, 0.5, 1],
            ease: EASE_OUT_EXPO,
          }}
        />
      ) : null}
    </>
  );
}
