"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  bg?: string;
  highlight?: string;
}

const STYLE = `
  @property --ga {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
  @property --gao {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
  @property --gp {
    syntax: "<percentage>";
    initial-value: 5%;
    inherits: false;
  }
  @property --gs {
    syntax: "<color>";
    initial-value: rgba(255,255,255,0.9);
    inherits: false;
  }

  .sbtn {
    --hi: rgba(255,255,255,0.85);
    --hi2: rgba(255,255,255,0.45);
    --dur: 3s;
    --ease: 800ms cubic-bezier(0.25, 1, 0.5, 1);
    isolation: isolate;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 360px;
    border: 1px solid transparent;
    color: #fff;
    transition-property: --gao, --gp, --gs;
    transition-duration: 800ms;
    transition-timing-function: cubic-bezier(0.25,1,0.5,1);
    animation:
      sbtn-spin var(--dur) linear infinite,
      sbtn-spin calc(var(--dur)/0.4) linear reverse paused;
    animation-composition: add;
  }

  .sbtn::before {
    content: "";
    pointer-events: none;
    position: absolute;
    inset-inline-start: 50%;
    inset-block-start: 50%;
    translate: -50% -50%;
    z-index: -1;
    --sz: calc(100% - 4px);
    --pos: 2px;
    width: var(--sz);
    height: var(--sz);
    background: radial-gradient(circle at var(--pos) var(--pos), white calc(var(--pos)/4), transparent 0) padding-box;
    background-size: calc(var(--pos)*2) calc(var(--pos)*2);
    background-repeat: space;
    mask-image: conic-gradient(from calc(var(--ga) + 45deg), black, transparent 10% 90%, black);
    border-radius: inherit;
    opacity: 0.35;
    animation: inherit;
  }

  .sbtn::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset-inline-start: 50%;
    inset-block-start: 50%;
    translate: -50% -50%;
    z-index: -1;
    width: 100%;
    aspect-ratio: 1;
    background: linear-gradient(-50deg, transparent, var(--hi), transparent);
    mask-image: radial-gradient(circle at bottom, transparent 40%, black);
    opacity: 0.55;
    animation: sbtn-shimmer linear infinite var(--dur);
  }

  .sbtn:hover,
  .sbtn:focus-visible {
    --gp: 20%;
    --gao: 95deg;
    --gs: var(--hi2);
  }

  .sbtn:hover,
  .sbtn:hover::before,
  .sbtn:hover::after,
  .sbtn:focus-visible,
  .sbtn:focus-visible::before,
  .sbtn:focus-visible::after {
    animation-play-state: running;
  }

  .sbtn:active { translate: 0 1px; }

  @keyframes sbtn-spin {
    to { --ga: 360deg; }
  }
  @keyframes sbtn-shimmer {
    to { rotate: 360deg; }
  }
`;

export function ShinyButton({
  children,
  href,
  onClick,
  className = "",
  bg = "#161F1F",
  highlight = "rgba(255,255,255,0.85)",
}: ShinyButtonProps) {
  const background = `
    linear-gradient(${bg}, ${bg}) padding-box,
    conic-gradient(
      from calc(var(--ga, 0deg) - var(--gao, 0deg)),
      transparent,
      ${highlight} var(--gp, 5%),
      var(--gs, rgba(255,255,255,0.9)) calc(var(--gp, 5%) * 2),
      ${highlight} calc(var(--gp, 5%) * 3),
      transparent calc(var(--gp, 5%) * 4)
    ) border-box
  `;

  const inlineStyle: React.CSSProperties = {
    background,
    boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 -8px 16px rgba(255,255,255,0.08)`,
  };

  const cls = cn("sbtn flex items-center justify-center gap-2 whitespace-nowrap font-bold", className);

  return (
    <>
      <style>{STYLE}</style>
      {href ? (
        <a href={href} className={cls} style={inlineStyle}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={cls} style={inlineStyle}>
          {children}
        </button>
      )}
    </>
  );
}
