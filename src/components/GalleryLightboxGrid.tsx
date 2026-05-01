"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  GalleryLightboxOverlay,
  type GalleryLightboxItem,
} from "@/components/GalleryLightboxOverlay";
import { DURATION, EASE_OUT_EXPO, STAGGER, VIEWPORT } from "@/lib/motion";
import { galleryItems } from "@/lib/site-data";

const ASPECT_PATTERN = [
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[5/6]",
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[5/7]",
] as const;

type GalleryLightboxGridProps = {
  items?: readonly GalleryLightboxItem[];
  priorityCount?: number;
  variant?: "default" | "reference";
};

export function GalleryLightboxGrid({
  items = galleryItems,
  priorityCount = 3,
  variant = "default",
}: GalleryLightboxGridProps = {}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const total = items.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + total) % total
    );
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % total
    );
  }, [total]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const activeItem = activeIndex === null ? null : items[activeIndex];
  const isReferenceVariant = variant === "reference";

  const renderTile = (item: GalleryLightboxItem, index: number) => {
    const aspectClass = ASPECT_PATTERN[index % ASPECT_PATTERN.length];

    return (
      <motion.button
        key={item.image}
        type="button"
        onClick={() => setActiveIndex(index)}
        aria-label={`Open larger image for ${item.title}`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={{
          duration: DURATION.base,
          ease: EASE_OUT_EXPO,
          delay: Math.min((index % 6) * STAGGER.tight, 0.3),
        }}
        className={`group relative block w-full overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background ${aspectClass}`}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          quality={90}
          priority={index < priorityCount}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
      </motion.button>
    );
  };

  const renderMasonryColumns = (columnCount: number, gapClassName: string) => {
    const columns = Array.from({ length: columnCount }, () =>
      [] as Array<{ item: GalleryLightboxItem; index: number }>
    );

    items.forEach((item, index) => {
      columns[index % columnCount].push({ item, index });
    });

    return columns.map((columnItems, columnIndex) => (
      <div key={columnIndex} className={`flex min-w-0 flex-col ${gapClassName}`}>
        {columnItems.map(({ item, index }) => renderTile(item, index))}
      </div>
    ));
  };

  return (
    <>
      {isReferenceVariant ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {renderMasonryColumns(1, "gap-4")}
          </div>
          <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:hidden">
            {renderMasonryColumns(2, "gap-5")}
          </div>
          <div className="hidden gap-6 lg:grid lg:grid-cols-3">
            {renderMasonryColumns(3, "gap-6")}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {items.map((item, index) => renderTile(item, index))}
        </div>
      )}

      <GalleryLightboxOverlay
        item={activeItem ?? null}
        index={activeIndex}
        total={total}
        onClose={() => setActiveIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
