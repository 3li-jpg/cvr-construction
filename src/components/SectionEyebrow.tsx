"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
  dotClassName?: string;
};

export function SectionEyebrow({
  children,
  className,
  dotClassName,
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-semibold uppercase",
        className
      )}
    >
      {/* Brass Gold marker, per the brand guidelines: gold carries eyebrows,
          short rules and numerals, never body copy. Decorative and
          aria-hidden, so it sidesteps the 3.38:1 contrast gold has on ivory. */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-none bg-[#A8842F]",
          dotClassName
        )}
      />
      <span>{children}</span>
    </p>
  );
}
