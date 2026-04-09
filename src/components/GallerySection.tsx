"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ScrollVelocity";
import { TextAnimate } from "@/components/TextAnimate";

const galleryItems = [
  {
    src: "/images/victoria-garden-studio-exterior.webp",
    alt: "Garden studio exterior by CVR Construction",
    eyebrow: "Custom Space",
    title: "Forest Garden Studio",
  },
  {
    src: "/images/victoria-custom-kitchen-renovation.webp",
    alt: "Kitchen renovation by CVR Construction",
    eyebrow: "Kitchen Renovation",
    title: "Custom Kitchen",
  },
  {
    src: "/images/victoria-luxury-bathroom-renovation.webp",
    alt: "Bathroom renovation by CVR Construction",
    eyebrow: "Bathroom Renovation",
    title: "Luxury Bathroom",
  },
  {
    src: "/images/victoria-front-entry-rebuild.webp",
    alt: "Front entry rebuild by CVR Construction",
    eyebrow: "Exterior Upgrade",
    title: "Front Entry Rebuild",
  },
  {
    src: "/images/victoria-premium-kitchen-interior.webp",
    alt: "Kitchen interior detail by CVR Construction",
    eyebrow: "Interior Detail",
    title: "Character Kitchen",
  },
  {
    src: "/images/victoria-commercial-interior-renovation.webp",
    alt: "Utility room renovation by CVR Construction",
    eyebrow: "Commercial Upgrade",
    title: "Utility Interior",
  },
  {
    src: "/images/victoria-bathroom-vanity-detail.webp",
    alt: "Modern bathroom vanity and fixtures by CVR Construction",
    eyebrow: "Bathroom Detail",
    title: "Modern Vanity",
  },
  {
    src: "/images/victoria-custom-garden-studio-angle.webp",
    alt: "Garden studio exterior walkway by CVR Construction",
    eyebrow: "Exterior Finish",
    title: "Studio Approach",
  },
  {
    src: "/images/victoria-premium-bathroom-finish-detail.webp",
    alt: "Bathroom vanity and tile detail by CVR Construction",
    eyebrow: "Finish Detail",
    title: "Stone + Fixture",
  },
  {
    src: "/images/2025-01-18.webp",
    alt: "Interior renovation by CVR Construction",
    eyebrow: "Interior Upgrade",
    title: "Refined Interior",
  },
];

const firstRowItems = galleryItems.slice(0, 5);
const secondRowItems = galleryItems.slice(5);

function GalleryTile({
  src,
  alt,
  eyebrow,
  title,
}: (typeof galleryItems)[number]) {
  return (
    <article className="mr-4 w-[76vw] shrink-0 sm:mr-5 sm:w-[28rem] lg:mr-6 lg:w-[32rem] xl:w-[36rem]">
      <div className="group relative aspect-[16/11] overflow-hidden bg-black">
        <Image
          src={src}
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
    </article>
  );
}

export function GallerySection() {
  const galleryHeadingClassName =
    "text-[2.9rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.7rem] md:text-[4.45rem] lg:text-[5rem] xl:text-[5.45rem]";

  return (
    <section className="w-full overflow-hidden bg-white py-18 text-black sm:py-20 lg:py-24">
      <div className="mb-12 flex flex-col items-center px-6 text-center lg:mb-16">
        <Reveal direction="up" delay={0} duration={0.8}>
          <p className="mb-5 flex items-center justify-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
            GALLERY
          </p>
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
          <p className="max-w-[42rem] text-[1rem] leading-7 text-black/68 sm:text-[1.05rem]">
            A moving field of recent kitchens, bathrooms, custom spaces, and
            finish details. The goal is not volume, but proof of range and
            finish quality.
          </p>
        </Reveal>
        <Reveal direction="up" delay={0.34} duration={0.8}>
          <Link
            href="/gallery"
            className="mt-7 inline-flex items-center gap-3 border-b border-black pb-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-black transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
            View Full Gallery
          </Link>
        </Reveal>
      </div>

      <ScrollVelocityContainer className="space-y-4 sm:space-y-5 lg:space-y-6">
        <ScrollVelocityRow baseVelocity={2.6} direction={1}>
          {firstRowItems.map((item) => (
            <GalleryTile key={`${item.src}-row-1`} {...item} />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={2.2} direction={-1}>
          {secondRowItems.map((item) => (
            <GalleryTile key={`${item.src}-row-2`} {...item} />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}
