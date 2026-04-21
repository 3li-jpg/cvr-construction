"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

export type GalleryLightboxItem = {
  image: string;
  alt: string;
  category: string;
  title: string;
};

type GalleryLightboxOverlayProps = {
  item: GalleryLightboxItem | null;
  index?: number | null;
  total?: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "prev" ? (
        <path d="m15 6-6 6 6 6" />
      ) : (
        <path d="m9 6 6 6-6 6" />
      )}
    </svg>
  );
}

export function GalleryLightboxOverlay({
  item,
  index = null,
  total = 0,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && onPrev) {
        event.preventDefault();
        onPrev();
      } else if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [item, onPrev, onNext]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const startX = touchStartXRef.current;
      if (startX === null) return;

      const endX = event.changedTouches[0]?.clientX ?? startX;
      const delta = endX - startX;

      if (Math.abs(delta) > 56) {
        if (delta > 0 && onPrev) {
          onPrev();
        } else if (delta < 0 && onNext) {
          onNext();
        }
      }

      touchStartXRef.current = null;
    },
    [onPrev, onNext]
  );

  const transitionDuration = prefersReducedMotion ? 0 : 0.45;
  const counterLabel =
    index !== null && total > 0
      ? `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
      : "";

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[140] bg-black/96 px-4 py-6 backdrop-blur-sm sm:px-8 sm:py-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="mx-auto flex h-full max-w-[96rem] flex-col">
            <div className="mb-4 flex items-start justify-between gap-4 text-white sm:mb-6">
              <div>
                <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/55">
                  {counterLabel}
                </p>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                  {item.category}
                </p>
                <p className="text-[1rem] font-semibold tracking-[-0.02em] sm:text-[1.2rem]">
                  {item.title}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/80 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Close
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1 overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.image}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: transitionDuration, ease: EASE_OUT_EXPO }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    quality={92}
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {onPrev ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onPrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-3 text-white transition-all hover:border-white/60 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block"
                >
                  <ChevronIcon direction="prev" />
                </button>
              ) : null}
              {onNext ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-3 text-white transition-all hover:border-white/60 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block"
                >
                  <ChevronIcon direction="next" />
                </button>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/50 sm:mt-6">
              <span>Swipe or use arrow keys</span>
              <span className="hidden sm:inline">Esc to close</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
