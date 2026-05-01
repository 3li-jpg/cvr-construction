"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { ProjectBeforeAfterComparison } from "@/lib/site-data";

type BeforeAfterSliderProps = {
  comparison: ProjectBeforeAfterComparison;
  projectTitle: string;
  priority?: boolean;
};

export function BeforeAfterSlider({
  comparison,
  projectTitle,
  priority = false,
}: BeforeAfterSliderProps) {
  const labelId = useId();
  const [position, setPosition] = useState(50);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <figure className="flex flex-col gap-4">
      <div
        className={`relative aspect-[16/9] overflow-hidden border border-border bg-muted text-white ${
          isFocused ? "ring-2 ring-ring ring-offset-4 ring-offset-background" : ""
        }`}
      >
        <Image
          src={comparison.afterImage}
          alt={comparison.afterAlt}
          fill
          priority={priority}
          quality={90}
          sizes="(max-width: 1023px) 100vw, 88vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={comparison.beforeImage}
            alt={comparison.beforeAlt}
            fill
            priority={priority}
            quality={90}
            sizes="(max-width: 1023px) 100vw, 88vw"
            className="object-cover"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3 sm:p-4">
          <span className="bg-black/78 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Before
          </span>
          <span className="bg-white/90 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.16em] text-black backdrop-blur-sm">
            After
          </span>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.32)]"
          style={{ left: `${position}%` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/80 bg-black/72 text-white shadow-2xl backdrop-blur-sm"
          style={{ left: `${position}%` }}
        >
          <span className="text-[0.7rem] font-black tracking-[-0.08em]">↔</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          aria-labelledby={labelId}
          aria-valuetext={`${position} percent before image visible`}
          onChange={(event) => setPosition(Number(event.target.value))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span
          id={labelId}
          className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground"
        >
          Compare before and after images for {projectTitle}
        </span>
        {comparison.label ? (
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {comparison.label}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
