"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { TextAnimate } from "@/components/TextAnimate";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  scrollTargetId?: string;
  titleClassName?: string;
  className?: string;
  backgroundImage: {
    src: string;
    alt?: string;
  };
};

const baseTitleClassName =
  "mx-auto text-center text-balance text-[3.15rem] font-bold uppercase leading-[0.9] tracking-tighter text-white sm:text-[4.6rem] md:text-[6.4rem] lg:text-[7.3rem] xl:text-[8rem]";

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 },
  },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.9 },
  },
};

const scrollCueVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 1.4 },
  },
};

export function PageIntro({
  eyebrow,
  title,
  description,
  scrollTargetId = "page-content",
  titleClassName,
  className = "",
  backgroundImage,
}: PageIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!imageWrapRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (vh - rect.top) / (vh + rect.height))
      );
      const translateY = ((0.5 - progress) * 10 * rect.height) / 100;
      imageWrapRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  const resolvedTitleClassName = titleClassName ?? baseTitleClassName;

  return (
    <section
      ref={sectionRef}
      className={`relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-black text-white md:h-[100dvh] md:min-h-[100dvh] ${className}`}
    >
      <div
        ref={imageWrapRef}
        className="absolute inset-x-0 top-[-5%] h-[110%] will-change-transform"
      >
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt ?? ""}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-black opacity-30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"
      />

      <div className="relative z-10 h-full w-full">
        <div className="site-shell relative flex h-full flex-col items-center justify-center pb-14 pt-24 text-center md:pb-8 md:pt-28 lg:pb-10 lg:pt-32">
          {eyebrow ? (
            <motion.p
              initial={prefersReducedMotion ? "show" : "hidden"}
              animate="show"
              variants={eyebrowVariants}
              className="mb-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/70 sm:mb-8"
            >
              {eyebrow}
            </motion.p>
          ) : null}

          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            once
            duration={0.7}
            delay={0.25}
            className={resolvedTitleClassName}
            segmentClassName="inline-block whitespace-pre"
          >
            {title}
          </TextAnimate>

          {description ? (
            <motion.div
              initial={prefersReducedMotion ? "show" : "hidden"}
              animate="show"
              variants={descriptionVariants}
              className="mt-8 max-w-[38rem] text-[1rem] leading-7 text-white/80 sm:mt-10 sm:text-[1.08rem] md:mt-12"
            >
              {description}
            </motion.div>
          ) : null}

          <motion.a
            href={`#${scrollTargetId}`}
            initial={prefersReducedMotion ? "show" : "hidden"}
            animate="show"
            variants={scrollCueVariants}
            aria-label="Scroll to content"
            className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 sm:flex lg:bottom-10"
          >
            <span>Scroll Down</span>
            <div className="flex flex-col items-center gap-1">
              <div className="h-6 w-[1px] bg-white opacity-50 transition-opacity group-hover:opacity-100" />
              <svg
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1L4 4L7 1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
