"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef } from "react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import {
  DISTANCE,
  DURATION,
  EASE_IN_OUT,
  EASE_OUT_EXPO,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion";
import { showroomContact } from "@/lib/site-data";

const contentStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.06,
    },
  },
};

const contentItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.sm },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

const headingStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.tight,
      delayChildren: 0.08,
    },
  },
};

const headingLine: Variants = {
  hidden: { opacity: 0, y: DISTANCE.md, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.lg, ease: EASE_OUT_EXPO },
  },
};

const mediaReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
    clipPath: "inset(8% 0% 8% 0%)",
  },
  show: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DURATION.lg, ease: EASE_OUT_EXPO },
  },
};

const mediaAccent: Variants = {
  hidden: { opacity: 0, y: DISTANCE.sm },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO, delay: 0.24 },
  },
};

export function ShowroomPromoSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame = 0;

    const tick = () => {
      frame = 0;
      if (!imageWrapRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const shift = (progress - 0.5) * -12 * (rect.height / 100);

      imageWrapRef.current.style.transform = `translateY(${shift}px)`;
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f5f5f0] dark:bg-[#0f0f0e]"
    >
      <div className="grid min-h-[100svh] lg:grid-cols-2">
        <div className="order-2 flex flex-col items-center justify-center px-[var(--site-gutter)] py-16 md:py-20 lg:order-1 lg:py-24 xl:py-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={contentStagger}
            className="mx-auto w-full max-w-[32rem] text-center lg:mx-0 lg:max-w-[28rem] lg:text-left xl:max-w-[30rem]"
          >
            <motion.div variants={contentItem} className="flex justify-center lg:justify-start">
              <SectionEyebrow className="text-[0.78rem] tracking-[0.14em] text-black dark:text-white">
                NOW OPEN IN VICTORIA
              </SectionEyebrow>
            </motion.div>

            <motion.h2
              variants={headingStagger}
              className="mt-6 text-[2.2rem] font-black uppercase leading-[0.88] tracking-[-0.055em] text-black dark:text-white sm:text-[2.8rem] md:mt-8 md:text-[3.4rem] lg:text-[3.6rem] xl:text-[4rem]"
            >
              <motion.span className="block" variants={headingLine}>
                Visit Our
              </motion.span>
              <motion.span className="block" variants={headingLine}>
                Showroom
              </motion.span>
            </motion.h2>

            <motion.p
              variants={contentItem}
              className="mx-auto mt-6 max-w-[32rem] text-[0.88rem] font-normal leading-[1.75] text-black/60 dark:text-white/60 md:mt-8 md:text-[0.93rem] lg:mx-0"
            >
              Walk in, compare products in person, and make your selections
              with confidence. Fixtures, faucets, and finishes from 10+
              premium brands — all under one roof.
            </motion.p>

            <motion.div variants={contentItem}>
              <div className="mx-auto mt-8 grid w-full max-w-[22rem] grid-cols-2 gap-2.5 sm:max-w-[34rem] sm:gap-3 lg:mx-0">
                <a
                  href="/showroom"
                  className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-none border border-[#ffffff] !bg-[#ffffff] px-2 py-0 text-[0.58rem] font-semibold uppercase leading-none tracking-[-0.03em] !text-[#000000] transition-colors duration-300 hover:!text-[#ffffff] sm:px-5 sm:text-[0.72rem]"
                >
                  <span className="relative inline-flex items-center whitespace-nowrap">
                    <span className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 bg-[#000000] transition-all duration-300 ease-out group-hover:-left-32 group-hover:h-32 group-hover:w-96 sm:size-2" />
                    <span className="relative ml-3 sm:ml-4">Explore Showroom</span>
                  </span>
                </a>

                <a
                  href={showroomContact.phoneHref}
                  className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-none border border-black/15 px-2 py-0 text-[0.58rem] font-semibold uppercase tracking-[0.07em] text-black transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black sm:gap-2 sm:px-5 sm:text-[0.72rem] sm:tracking-[0.12em]"
                >
                  <svg className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Call Showroom
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative order-1 min-h-[50vh] overflow-hidden lg:order-2 lg:min-h-0">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={mediaReveal}
            className="absolute inset-0 overflow-hidden"
          >
            <div
              ref={imageWrapRef}
              className="absolute inset-x-0 top-[-6%] h-[112%] will-change-transform"
            >
              <motion.div
                initial={{ scale: prefersReducedMotion ? 1 : 1.08, opacity: 0.82 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: DURATION.lg, ease: EASE_OUT_EXPO }}
                className="relative h-full w-full"
              >
                <Image
                  src="/images/victoria-kitchen-bath-material-selections.webp"
                  alt="CVR Kitchen and Bath Showroom product selections in Victoria BC"
                  fill
                  quality={90}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DURATION.lg, ease: EASE_OUT_EXPO, delay: 0.12 }}
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/14 via-white/6 to-transparent mix-blend-screen"
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={mediaAccent}
              className="absolute bottom-5 left-5 z-10 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, -0.8, 0] }}
                transition={{ duration: 6, ease: EASE_IN_OUT, repeat: Infinity }}
                className="border border-white/20 bg-black/72 px-4 py-3 text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm"
              >
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/62">
                  In-Person Selection
                </p>
                <p className="mt-2 text-[1rem] font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-[1.15rem]">
                  10+ Premium
                  <br />
                  Brands
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
