"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { DISTANCE, DURATION, EASE_OUT_EXPO_CSS } from "@/lib/motion";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  once?: boolean;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = DURATION.base,
  distance = DISTANCE.base,
  className = "",
  style = {},
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold, once });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsSmallViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // On small viewports, clamp reveal distance and shorten duration so animations
  // feel snappy and never clip off the top/side of the screen. Desktop values stay intact.
  const effectiveDistance = isSmallViewport
    ? Math.min(distance, 32)
    : distance;
  const effectiveDuration = isSmallViewport
    ? Math.min(duration, 0.75)
    : duration;

  const directionMap: Record<RevealDirection, { x: number; y: number }> = {
    up: { x: 0, y: effectiveDistance },
    down: { x: 0, y: -effectiveDistance },
    left: { x: effectiveDistance, y: 0 },
    right: { x: -effectiveDistance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionMap[direction];
  const hiddenTransform = prefersReducedMotion
    ? "translate3d(0, 0, 0)"
    : `translate3d(${x}px, ${y}px, 0)`;
  const transformDuration = prefersReducedMotion ? 0 : effectiveDuration;
  const opacityDuration = prefersReducedMotion ? 0.2 : effectiveDuration * 0.7;
  const shouldShow = prefersReducedMotion || isVisible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: shouldShow ? "translate3d(0, 0, 0)" : hiddenTransform,
        opacity: shouldShow ? 1 : 0,
        transition: `transform ${transformDuration}s ${EASE_OUT_EXPO_CSS} ${delay}s, opacity ${opacityDuration}s ease ${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
