"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const currentRoute = `${pathname}?${searchParams.toString()}`;
  const pendingRouteRef = useRef<string | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const transitionPhaseRef = useRef<"idle" | "cover" | "reveal">("idle");
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "cover" | "reveal">("idle");

  const updateTransitionPhase = useCallback((phase: "idle" | "cover" | "reveal") => {
    transitionPhaseRef.current = phase;
    setTransitionPhase(phase);
  }, []);

  useEffect(() => {
    transitionPhaseRef.current = transitionPhase;
  }, [transitionPhase]);

  useEffect(() => {
    if (transitionPhase === "cover" && pendingRouteRef.current === currentRoute) {
      pendingRouteRef.current = null;
      const frame = window.requestAnimationFrame(() => {
        updateTransitionPhase("reveal");
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, [currentRoute, transitionPhase, updateTransitionPhase]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const handleClick = (event: globalThis.MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        transitionPhaseRef.current !== "idle"
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      const nextRoute = `${url.pathname}?${url.searchParams.toString()}`;
      if (nextRoute === currentRoute) {
        return;
      }

      event.preventDefault();
      pendingRouteRef.current = nextRoute;
      updateTransitionPhase("cover");

      navigationTimerRef.current = window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }, (DURATION.base / 2) * 1000);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      if (navigationTimerRef.current) {
        window.clearTimeout(navigationTimerRef.current);
      }
    };
  }, [currentRoute, prefersReducedMotion, router, updateTransitionPhase]);

  return (
    <>
      {children}
      {!prefersReducedMotion && transitionPhase !== "idle" ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[200] bg-black"
          initial={{ y: "100%" }}
          animate={{ y: transitionPhase === "cover" ? "0%" : "-100%" }}
          onAnimationComplete={() => {
            if (transitionPhase === "reveal") {
              updateTransitionPhase("idle");
            }
          }}
          transition={{
            duration: DURATION.base / 2,
            ease: EASE_OUT_EXPO,
          }}
        />
      ) : null}
    </>
  );
}
