"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { GalleryLightboxOverlay } from "@/components/GalleryLightboxOverlay";
import { galleryItems } from "@/lib/site-data";

const sectionEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

const ASPECT_PATTERN = [
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[5/6]",
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[5/7]",
] as const;

export function GalleryLightboxGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const total = galleryItems.length;

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

  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {galleryItems.map((item, index) => {
          const aspectClass = ASPECT_PATTERN[index % ASPECT_PATTERN.length];

          return (
            <motion.button
              key={item.image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open larger image for ${item.title}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{
                duration: 0.85,
                ease: sectionEase,
                delay: Math.min((index % 6) * 0.06, 0.3),
              }}
              className={`group relative block w-full overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 ${aspectClass}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                quality={90}
                priority={index < 3}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
            </motion.button>
          );
        })}
      </div>

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
