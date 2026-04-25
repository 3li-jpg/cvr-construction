"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FlowButtonProps = {
  text?: string;
  href?: string;
  /** "dark" = white circle expand on dark bg (hero). "light" = dark circle expand on light bg. */
  variant?: "dark" | "light";
  className?: string;
};

export function FlowButton({
  text = "Button",
  href,
  variant = "light",
  className,
}: FlowButtonProps) {
  const isDark = variant === "dark";

  const baseClasses = cn(
    "group relative flex items-center gap-1 overflow-hidden rounded-none border-[1.5px] px-8 py-3 text-[0.7rem] font-semibold uppercase tracking-widest cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]",
    isDark
      ? "border-white/50 bg-transparent text-white hover:text-white"
      : "border-[#333333]/40 bg-transparent text-[#111111] hover:text-white",
    className
  );

  const arrowColor = isDark ? "stroke-white" : "stroke-[#111111]";
  const arrowHoverColor = "group-hover:stroke-white";
  const circleBg = isDark ? "bg-black" : "bg-[#111111]";

  const inner = (
    <>
      {/* Left arrow — slides in from the left on hover */}
      <ArrowRight
        className={cn(
          "absolute w-4 h-4 left-[-25%] fill-none z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4",
          arrowColor,
          arrowHoverColor
        )}
      />

      {/* Label */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Expanding circle fill */}
      <span
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[350px] group-hover:h-[350px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          circleBg
        )}
      />

      {/* Right arrow — slides out to the right on hover */}
      <ArrowRight
        className={cn(
          "absolute w-4 h-4 right-4 fill-none z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%]",
          arrowColor,
          arrowHoverColor
        )}
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={baseClasses}>
      {inner}
    </button>
  );
}
