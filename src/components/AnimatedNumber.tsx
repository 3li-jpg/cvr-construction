"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
} from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type AnimatedNumberProps = {
  value: number;
  className?: string;
  duration?: number;
};

export function AnimatedNumber({
  value,
  className,
  duration = 1.6,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration,
      ease: EASE_OUT_EXPO,
    });
    return () => controls.stop();
  }, [inView, value, duration, count, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      <motion.span aria-hidden="true">{rounded}</motion.span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
