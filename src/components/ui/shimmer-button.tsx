"use client";

import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

function Inner({
  shimmerColor,
  shimmerDuration,
  background,
  children,
}: {
  shimmerColor: string;
  shimmerDuration: string;
  background: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Rotating shimmer — conic gradient spins behind the button edge */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden [border-radius:inherit]">
        <span
          className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, ${shimmerColor}55 2%, ${shimmerColor}99 3%, ${shimmerColor}55 4%, transparent 6%)`,
            animation: `shimmer-spin ${shimmerDuration} linear infinite`,
          }}
        />
      </span>

      {/* Inner backdrop — masks center so only perimeter shows the shimmer */}
      <span
        className="pointer-events-none absolute inset-[1.5px] -z-10 [border-radius:inherit]"
        style={{ background }}
      />

      {/* 3D depth glow */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 [border-radius:inherit]",
          "shadow-[inset_0_-8px_12px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "transition-shadow duration-300",
          "group-hover:shadow-[inset_0_-6px_12px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]"
        )}
      />

      {/* Label */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
}

const baseClass = (className?: string) =>
  cn(
    "group relative z-0 flex cursor-pointer items-center justify-center gap-1",
    "overflow-hidden whitespace-nowrap text-white",
    "px-8 py-3.5",
    "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
    className
  );

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0,0,0,0.9)",
      className,
      children,
      href,
      style,
      ...props
    },
    ref
  ) => {
    const mergedStyle: CSSProperties = {
      borderRadius,
      border: "1px solid rgba(255,255,255,0.14)",
      background,
      ...style,
    };

    if (href) {
      return (
        <a href={href} className={baseClass(className)} style={mergedStyle}>
          <Inner shimmerColor={shimmerColor} shimmerDuration={shimmerDuration} background={background}>
            {children}
          </Inner>
        </a>
      );
    }

    return (
      <button ref={ref} className={baseClass(className)} style={mergedStyle} {...props}>
        <Inner shimmerColor={shimmerColor} shimmerDuration={shimmerDuration} background={background}>
          {children}
        </Inner>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
