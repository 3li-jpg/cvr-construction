"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
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
  duration = 0.9,
  distance = 60,
  className = "",
  style = {},
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold, once });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const directionMap: Record<RevealDirection, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionMap[direction];
  const hiddenTransform = prefersReducedMotion
    ? "translate3d(0, 0, 0)"
    : `translate3d(${x}px, ${y}px, 0)`;
  const transformDuration = prefersReducedMotion ? 0 : duration;
  const opacityDuration = prefersReducedMotion ? 0.2 : duration * 0.7;
  const shouldShow = prefersReducedMotion || isVisible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: shouldShow ? "translate3d(0, 0, 0)" : hiddenTransform,
        opacity: shouldShow ? 1 : 0,
        transition: `transform ${transformDuration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity ${opacityDuration}s ease ${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
