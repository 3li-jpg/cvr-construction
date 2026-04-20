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
      <span
        aria-hidden="true"
        className={cn("inline-block h-1.5 w-1.5 rounded-full bg-current", dotClassName)}
      />
      <span>{children}</span>
    </p>
  );
}
