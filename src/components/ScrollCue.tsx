"use client";

import { motion, useReducedMotion } from "motion/react";

type ScrollCueProps = {
  targetId?: string;
  label?: string;
  className?: string;
  tone?: "dark" | "light";
};

export function ScrollCue({
  targetId = "page-content",
  label = "Scroll",
  className = "",
  tone = "dark",
}: ScrollCueProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLight = tone === "light";

  const textClass = isLight
    ? "text-white/75 hover:text-white focus-visible:ring-white"
    : "text-black/70 hover:text-black focus-visible:ring-black";
  const railClass = isLight ? "bg-white/25" : "bg-black/20";
  const dotClass = isLight ? "bg-white" : "bg-black";

  return (
    <a
      href={`#${targetId}`}
      className={`group inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${textClass} ${className}`}
      aria-label="Scroll to content"
    >
      <span className={`relative block h-16 w-px overflow-hidden sm:h-20 ${railClass}`}>
        {!prefersReducedMotion ? (
          <motion.span
            aria-hidden="true"
            className={`absolute left-1/2 top-0 block h-6 w-px -translate-x-1/2 ${dotClass}`}
            initial={{ y: "-100%" }}
            animate={{ y: "240%" }}
            transition={{
              duration: 1.8,
              ease: [0.76, 0, 0.24, 1],
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        ) : (
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-0 block h-6 w-px -translate-x-1/2 ${dotClass}`}
          />
        )}
      </span>
      <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
        {label} Down
      </span>
    </a>
  );
}
