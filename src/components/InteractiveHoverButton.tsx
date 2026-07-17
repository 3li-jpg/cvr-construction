"use client";

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type InteractiveHoverButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "default" | "light";
  size?: "sm" | "md";
  showDot?: boolean;
  icon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 md:h-4 md:w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export const InteractiveHoverButton = forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(function InteractiveHoverButton(
  {
    children,
    className,
    href,
    variant = "default",
    size = "md",
    showDot = true,
    icon,
    type,
    disabled,
    ...props
  },
  ref
) {
  const sizeClasses =
    size === "sm"
      ? "min-h-10 px-3 py-1.5 text-[0.62rem] md:min-h-11 md:px-4 md:py-2.5 md:text-[0.72rem]"
      : "min-h-11 px-4 py-2.5 text-[0.66rem] md:min-h-11 md:px-5 md:py-3 md:text-[0.76rem]";

  const containerClasses =
    variant === "light"
      ? "border-white bg-white text-black"
      : "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black";

  const dotClasses =
    variant === "light"
      ? "bg-black"
      : "bg-white dark:bg-black";

  const overlayClasses =
    variant === "light"
      ? "text-white"
      : "text-black dark:text-white";

  const focusClasses =
    variant === "light"
      ? "focus-visible:ring-white focus-visible:ring-offset-black"
      : "focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black";

  const buttonClasses = cn(
    "group relative inline-flex w-fit self-start cursor-pointer items-center justify-center overflow-hidden rounded-none border font-semibold uppercase tracking-[0.1em] md:tracking-[0.12em] transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2",
    sizeClasses,
    containerClasses,
    variant === "light" ? "hover:opacity-100" : "hover:opacity-95",
    focusClasses,
    className
  );

  const content = (
    <>
      <div className="relative z-[1] flex items-center justify-center gap-2">
        {/* Expanding dot — always present for the bg-fill animation; hidden when icon is used */}
        {showDot && (
          <div
            className={cn(
              "rounded-none transition-transform duration-300 ease-out group-hover:scale-[90]",
              icon
                ? "absolute h-1.5 w-1.5 opacity-0 md:h-2 md:w-2"
                : "h-1.5 w-1.5 md:h-2 md:w-2",
              dotClasses
            )}
          />
        )}
        {/* Icon + label slide out together */}
        <span className="inline-flex items-center gap-1.5 transition-all duration-300 group-hover:translate-x-8 group-hover:opacity-0">
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </span>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 px-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:px-5",
          "translate-x-8",
          overlayClasses
        )}
        aria-hidden="true"
      >
        <span>{children}</span>
        <ArrowRightIcon />
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
});
