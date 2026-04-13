"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GalleryLightboxOverlay } from "@/components/GalleryLightboxOverlay";
import { galleryItems } from "@/lib/site-data";

export function GalleryLightboxGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
      <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
        {galleryItems.map((item, index) => {
          const isLarge = index % 5 === 0 || index % 5 === 3;

          return (
            <button
              key={item.image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group overflow-hidden border border-black/10 bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 ${
                isLarge ? "xl:col-span-7" : "xl:col-span-5"
              }`}
              aria-label={`Open larger image for ${item.title}`}
            >
              <div
                className={`relative overflow-hidden bg-black ${
                  isLarge ? "aspect-[1.35/1]" : "aspect-[0.92/1]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index < 2}
                  quality={90}
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                    {item.category}
                  </p>
                  <p className="text-[0.96rem] font-semibold tracking-[-0.02em] text-black">
                    {item.title}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <GalleryLightboxOverlay
        item={activeItem}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
