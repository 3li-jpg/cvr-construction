"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const STAGGER = 0.0245;

export default function TextRoll({
  children,
  className,
  center = false,
}: {
  children: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        initial="initial"
        whileHover="hovered"
        className={cn(
          "relative block overflow-hidden text-current",
          className
        )}
        style={{
          lineHeight: 0.85,
        }}
      >
        <div>
          {children.split("").map((l, i) => {
            const delay = center
              ? STAGGER * Math.abs(i - (children.length - 1) / 2)
              : STAGGER * i;

            return (
              <motion.span
                variants={{
                  initial: {
                    y: 0,
                  },
                  hovered: {
                    y: "-100%",
                  },
                }}
                transition={{
                  duration: 0.21,
                  ease: "easeInOut",
                  delay,
                }}
                className="inline-block whitespace-pre"
                key={i}
              >
                {l}
              </motion.span>
            );
          })}
        </div>

        <div className="absolute inset-0">
          {children.split("").map((l, i) => {
            const delay = center
              ? STAGGER * Math.abs(i - (children.length - 1) / 2)
              : STAGGER * i;

            return (
              <motion.span
                variants={{
                  initial: {
                    y: "100%",
                  },
                  hovered: {
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.21,
                  ease: "easeInOut",
                  delay,
                }}
                className="inline-block whitespace-pre"
                key={i}
              >
                {l}
              </motion.span>
            );
          })}
        </div>
      </motion.span>
    </>
  );
}
