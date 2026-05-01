"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GalleryLightboxOverlay } from "@/components/GalleryLightboxOverlay";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ScrollVelocity";
import { TextAnimate } from "@/components/TextAnimate";
import { proseBodyClassName } from "@/lib/prose";
import { galleryItems } from "@/lib/site-data";

const galleryRows = galleryItems.reduce<
  [Array<{ item: (typeof galleryItems)[number]; index: number }>, Array<{ item: (typeof galleryItems)[number]; index: number }>]
>(
  (rows, item, index) => {
    rows[index % 2].push({ item, index });
    return rows;
  },
  [[], []]
);

function GalleryTile({
  image,
  alt,
  eyebrow,
  title,
  onClick,
}: (typeof galleryItems)[number] & {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mr-4 w-[calc(100vw-(var(--site-gutter)*2))] max-w-[24rem] shrink-0 appearance-none bg-transparent p-0 text-left sm:mr-5 sm:w-[28rem] sm:max-w-none lg:mr-6 lg:w-[32rem] xl:w-[36rem]"
      aria-label={`Open larger image for ${title}`}
    >
      <div className="group relative aspect-[16/11] overflow-hidden bg-black">
        <Image
          src={image}
          alt={alt}
          fill
          quality={90}
          sizes="(max-width: 639px) 76vw, (max-width: 1023px) 28rem, (max-width: 1279px) 32rem, 36rem"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-4 pb-4 pt-10 text-white sm:px-5 sm:pb-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/72">
            {eyebrow}
          </p>
          <p className="text-[1.1rem] font-semibold uppercase tracking-[-0.03em] sm:text-[1.28rem]">
            {title}
          </p>
        </div>
      </div>
    </button>
  );
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryHeadingClassName =
    "text-[2.4rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]";
  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

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

  return (
    <>
      <section className="w-full overflow-hidden bg-white py-18 text-black sm:py-20 lg:py-24">
        <div className="site-shell mb-12 flex flex-col items-center text-center lg:mb-16">
          <Reveal direction="up" delay={0} duration={0.8}>
            <SectionEyebrow className="mb-5 justify-center text-[0.78rem] tracking-[0.14em] text-black">
              GALLERY
            </SectionEyebrow>
          </Reveal>
          <Reveal direction="up" delay={0.15} duration={1} distance={80}>
            <TextAnimate
              as="h2"
              by="line"
              animation="blurInUp"
              once
              duration={0.8}
              className={`${galleryHeadingClassName} mb-5 max-w-[13ch] text-balance`}
              segmentClassName="block"
            >
              {"THE CVR\nCOLLECTION"}
            </TextAnimate>
          </Reveal>
          <Reveal direction="up" delay={0.26} duration={0.8}>
            <p className={`max-w-[42rem] ${proseBodyClassName}`}>
              A moving field of recent kitchens, bathrooms, custom spaces, and
              finish details. The goal is not volume, but proof of range and
              finish quality.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.34} duration={0.8}>
            <Link
              href="/gallery"
              className="mt-7 inline-flex items-center gap-3 border-b border-current pb-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-black transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-white"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-none bg-current" />
              View Full Gallery
            </Link>
          </Reveal>
        </div>

        <ScrollVelocityContainer className="space-y-4 sm:space-y-5 lg:space-y-6">
          {galleryRows.map((rowItems, rowIndex) => (
            <ScrollVelocityRow
              key={`gallery-row-${rowIndex}`}
              baseVelocity={0.35}
              direction={rowIndex === 0 ? 1 : -1}
              className="px-[var(--site-gutter)] sm:px-0"
            >
              {rowItems.map(({ item, index }) => (
                <GalleryTile
                  key={`${item.image}-row-${rowIndex}`}
                  {...item}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </ScrollVelocityRow>
          ))}
        </ScrollVelocityContainer>
      </section>

      <GalleryLightboxOverlay
        item={activeItem}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
