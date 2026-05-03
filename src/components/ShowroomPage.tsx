"use client";

import Image from "next/image";
import Script from "next/script";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import BlurTextAnimation from "@/components/ui/blur-text-animation";
import { ContactBlockSection } from "@/components/ContactBlockSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { ShowroomAppointmentSection } from "@/components/ShowroomAppointmentSection";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ScrollVelocity";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { proseBodyClassName, proseHeroClassName } from "@/lib/prose";
import {
  showroomBrands,
  showroomCollections,
  showroomContact,
  showroomFacts,
  showroomHero,
  showroomPortrait,
  showroomReasons,
  showroomSchema,
} from "@/lib/site-data";

const factVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO, delay: i * 0.12 },
  }),
};

const philosophyContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const philosophyItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};

const reasonRowVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO, delay: i * 0.08 },
  }),
};

const materialNotes = [
  { label: "Fixtures", value: "Faucets, shower trim, bath systems" },
  { label: "Surfaces", value: "Warm stone, crisp tile, durable hardware" },
  { label: "Guidance", value: "A calmer path from shortlist to final choice" },
] as const;

const showroomProducts = [
  "Kitchen Cabinets",
  "Cabinet Doors",
  "Marble Countertops",
  "Natural Stone",
  "Quartz Countertops",
  "Kitchen Faucets",
  "Vanity Faucets",
  "Vanity Mirrors",
  "Tiles",
  "Toilets",
  "Bathtubs",
  "Freestanding Tubs",
  "Standing Showers",
  "Custom Bathrooms",
  "Light Fixtures",
  "Many More",
] as const;

export function ShowroomPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTabletTouch, setIsTabletTouch] = useState(false);
  const [isOpeningSoonOpen, setIsOpeningSoonOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    const tabletQuery = window.matchMedia(
      "(pointer: coarse) and (min-width: 768px) and (max-width: 1366px)"
    );
    const updateTablet = () => setIsTabletTouch(tabletQuery.matches);
    updateTablet();
    tabletQuery.addEventListener("change", updateTablet);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
      tabletQuery.removeEventListener("change", updateTablet);
    };
  }, []);

  useEffect(() => {
    if (!isOpeningSoonOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpeningSoonOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpeningSoonOpen]);

  useEffect(() => {
    if (prefersReducedMotion || isTabletTouch) return;

    let frame = 0;
    const updateTransform = () => {
      frame = 0;
      if (!heroImageRef.current || !heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
      const translateY = ((0.5 - progress) * 10 * rect.height) / 100;
      const scale = 1.04 + scrollProgress * 0.12;

      heroImageRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
    };

    const requestTick = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTransform);
    };

    requestTick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, [prefersReducedMotion, isTabletTouch]);

  const indicatorAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, animation: "heroFadeIn 0.8s ease 0.8s forwards" };
  const ctaAnimation = prefersReducedMotion
    ? { opacity: 1, filter: "blur(0px)", transform: "translateY(0) scale(1)" }
    : {
        opacity: 0,
        filter: "blur(14px)",
        transform: "translateY(18px) scale(0.98)",
        animation: "heroCtaBlurIn 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.05s forwards",
      };

  return (
    <main id="main-content" className="relative bg-[var(--showroom-bg)] text-[var(--showroom-text)]">
      <Script
        id="showroom-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showroomSchema) }}
      />
      <Navbar />

      <AnimatePresence>
        {isOpeningSoonOpen ? (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/62 px-4 py-6 text-white backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setIsOpeningSoonOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="opening-soon-title"
              className="relative w-full max-w-[28rem] overflow-hidden rounded-none border border-white/18 bg-[#0a0a09] p-7 text-center shadow-[0_28px_90px_rgba(0,0,0,0.5)] sm:p-8"
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.28),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.14),transparent_45%)]"
              />
              <button
                type="button"
                aria-label="Close opening soon message"
                onClick={() => setIsOpeningSoonOpen(false)}
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center border border-white/16 text-xl leading-none text-white/80 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                ×
              </button>

              <div className="relative z-10 flex flex-col items-center">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center border border-white/18 bg-white/8 text-[0.72rem] font-black uppercase tracking-[0.16em] text-white">
                  CVR
                </span>
                <p className="mb-3 flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/58">
                  <span className="h-1.5 w-1.5 bg-current" />
                  Showroom Update
                </p>
                <h2
                  id="opening-soon-title"
                  className="text-[3rem] font-black uppercase leading-[0.86] tracking-[-0.06em] sm:text-[4rem]"
                >
                  Opening Soon!
                </h2>
                <p className="mt-5 max-w-[22rem] text-[0.98rem] leading-7 text-white/68">
                  Our luxury kitchen and bath showroom is almost ready. You can still explore the page and request a design consultation.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpeningSoonOpen(false)}
                  className="group relative mt-7 inline-flex h-12 min-w-[12rem] items-center justify-center overflow-hidden border border-white bg-white px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:text-white"
                >
                  <span className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 bg-black transition-all duration-300 ease-out group-hover:-left-32 group-hover:h-32 group-hover:w-96" />
                  <span className="relative">Continue</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-black text-white md:h-[100dvh] md:min-h-[100dvh]"
      >
        <div
          ref={heroImageRef}
          className="absolute inset-x-0 top-[-5%] h-[110%] origin-center will-change-transform"
        >
          <Image
            src={showroomHero.src}
            alt={showroomHero.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-[#000000] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-50" />

        <div className="relative z-10 h-full w-full">
          <div className="site-shell relative flex h-full flex-col items-center justify-center pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-24 lg:pt-32">
            <div className="flex w-full flex-col items-center">
              {prefersReducedMotion ? (
                <h1 className="text-center font-bold uppercase leading-[0.84] tracking-tighter text-[#ffffff]">
                  <span className="block whitespace-nowrap text-[clamp(2.25rem,10.4vw,3.45rem)] leading-[0.84] lg:hidden">
                    LUXURY KITCHEN
                  </span>
                  <span className="block whitespace-nowrap text-[clamp(2.25rem,10.4vw,3.45rem)] leading-[0.84] lg:hidden">
                    &amp; BATH
                  </span>
                  <span className="block whitespace-nowrap text-[clamp(2.25rem,10.4vw,3.45rem)] leading-[0.84] lg:hidden">
                    SHOWROOM
                  </span>
                  <span className="block whitespace-nowrap text-[clamp(2.25rem,10.4vw,3.45rem)] leading-[0.84] lg:hidden">
                    IN VICTORIA
                  </span>
                  <span className="mt-1 hidden whitespace-nowrap text-[clamp(4.2rem,6.2vw,5.6rem)] leading-[0.82] lg:block">
                    LUXURY KITCHEN &amp; BATH
                  </span>
                  <span className="hidden whitespace-nowrap text-[clamp(4.2rem,6.2vw,5.6rem)] leading-[0.82] lg:block">
                    SHOWROOM IN VICTORIA
                  </span>
                </h1>
              ) : (
                <h1 className="text-center font-bold uppercase leading-[0.84] tracking-tighter text-[#ffffff]">
                  <span className="block whitespace-nowrap text-[clamp(2.25rem,10.4vw,3.45rem)] leading-[0.84] lg:hidden">
                    <BlurTextAnimation
                      text="LUXURY KITCHEN"
                      className="block"
                      fontSize="text-[inherit]"
                      fontFamily="font-inherit"
                      textColor="text-[#ffffff]"
                      animationDelay={3000}
                      repeat={false}
                    />
                  </span>
                  <span className="block whitespace-nowrap text-[clamp(2.25rem,10.4vw,3.45rem)] leading-[0.84] lg:hidden">
                    <BlurTextAnimation
                      text="& BATH"
                      className="block"
                      fontSize="text-[inherit]"
                      fontFamily="font-inherit"
                      textColor="text-[#ffffff]"
                      animationDelay={3000}
                      repeat={false}
                    />
                  </span>
                  <span className="block whitespace-nowrap text-[clamp(2.25rem,10.4vw,3.45rem)] leading-[0.84] lg:hidden">
                    <BlurTextAnimation
                      text="SHOWROOM"
                      className="block"
                      fontSize="text-[inherit]"
                      fontFamily="font-inherit"
                      textColor="text-[#ffffff]"
                      animationDelay={3000}
                      repeat={false}
                    />
                  </span>
                  <span className="block whitespace-nowrap text-[clamp(2.25rem,10.4vw,3.45rem)] leading-[0.84] lg:hidden">
                    <BlurTextAnimation
                      text="IN VICTORIA"
                      className="block"
                      fontSize="text-[inherit]"
                      fontFamily="font-inherit"
                      textColor="text-[#ffffff]"
                      animationDelay={3000}
                      repeat={false}
                    />
                  </span>
                  <span className="mt-1 hidden whitespace-nowrap text-[clamp(4.2rem,6.2vw,5.6rem)] leading-[0.82] lg:block">
                    <BlurTextAnimation
                      text="LUXURY KITCHEN & BATH"
                      className="block"
                      fontSize="text-[inherit]"
                      fontFamily="font-inherit"
                      textColor="text-[#ffffff]"
                      animationDelay={3000}
                      repeat={false}
                    />
                  </span>
                  <span className="hidden whitespace-nowrap text-[clamp(4.2rem,6.2vw,5.6rem)] leading-[0.82] lg:block">
                    <BlurTextAnimation
                      text="SHOWROOM IN VICTORIA"
                      className="block"
                      fontSize="text-[inherit]"
                      fontFamily="font-inherit"
                      textColor="text-[#ffffff]"
                      animationDelay={3000}
                      repeat={false}
                    />
                  </span>
                </h1>
              )}

              <div className="mt-5 flex justify-center md:mt-6">
                {prefersReducedMotion ? (
                  <p className="text-center text-[0.72rem] font-black uppercase tracking-tighter text-[#ffffff] sm:text-[0.82rem] md:text-[0.86rem]">
                    Design • Supply • Install
                  </p>
                ) : (
                  <div className="font-black">
                    <BlurTextAnimation
                      text="DESIGN • SUPPLY • INSTALL"
                      className="flex justify-center"
                      fontSize="text-center text-[0.72rem] tracking-tighter sm:text-[0.82rem] md:text-[0.86rem]"
                      fontFamily="font-inherit"
                      textColor="text-[#ffffff]"
                      initialDelay={800}
                      animationDelay={3000}
                      repeat={false}
                    />
                  </div>
                )}
              </div>

              <div
                className="mt-7 grid w-full max-w-[22rem] grid-cols-2 gap-2.5 sm:mt-8 sm:max-w-[34rem] sm:gap-3"
                style={ctaAnimation}
              >
                <a
                  href={showroomContact.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex box-border h-12 w-full items-center justify-center rounded-none border border-white/45 bg-transparent px-2 py-0 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.07em] text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:px-5 sm:text-[0.76rem] sm:tracking-[0.12em]"
                >
                  Get Directions
                </a>
                <a
                  href={showroomContact.phoneHref}
                  className="inline-flex box-border h-12 w-full items-center justify-center rounded-none border border-white/45 bg-transparent px-2 py-0 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.07em] text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:px-5 sm:text-[0.76rem] sm:tracking-[0.12em]"
                >
                  Call Showroom
                </a>
                <a
                  href="#design-specialist"
                  className="group relative col-span-2 mx-auto inline-flex box-border h-12 w-full items-center justify-center overflow-hidden rounded-none border border-[#ffffff] !bg-[#ffffff] px-2 py-0 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.07em] !text-[#000000] transition-colors duration-300 hover:!text-[#ffffff] sm:w-[calc((100%_-_0.75rem)/2)] sm:px-5 sm:text-[0.76rem] sm:tracking-[0.12em]"
                >
                  <span className="relative inline-flex items-center whitespace-nowrap">
                    <span className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 bg-[#000000] transition-all duration-300 ease-out group-hover:-left-32 group-hover:h-32 group-hover:w-96 sm:size-2" />
                    <span className="relative ml-3 sm:ml-4">Get Design Consultation</span>
                  </span>
                </a>
              </div>
            </div>

            <div
              className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffffff]/70 sm:flex lg:bottom-10"
              style={indicatorAnimation}
            >
              <span>SCROLL DOWN</span>
              <div className="flex flex-col items-center gap-1">
                <div className="h-6 w-[1px] bg-[#ffffff] opacity-50" />
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#ffffff]/55 sm:hidden"
              style={{
                bottom: "calc(env(safe-area-inset-bottom, 0px) + 4.5rem)",
                ...(prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, animation: "heroFadeIn 0.8s ease 0.9s forwards" }),
              }}
            >
              <span>SCROLL</span>
              <div className="h-4 w-[1px] bg-[#ffffff]/70" />
            </div>
          </div>
        </div>
      </section>

      {/* Facts + intro */}
      <section
        id="showroom"
        aria-labelledby="showroom-heading"
        className="relative overflow-hidden bg-[var(--showroom-bg)] pb-24 pt-16 text-[var(--showroom-text)] sm:pb-28 md:pt-20 lg:pb-32 lg:pt-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,var(--showroom-grid),transparent)]"
        />
        <h2 id="showroom-heading" className="sr-only">
          About the CVR Showroom
        </h2>

        <div className="site-shell grid grid-cols-4 gap-x-2 gap-y-0 border-t border-[color:var(--showroom-line)] pt-14 sm:gap-x-10 md:gap-y-14 lg:gap-x-12 lg:pt-20">
          {showroomFacts.map((fact, index) => {
            const numericValue = Number.parseInt(fact.value, 10);
            return (
              <motion.div
                key={fact.label}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                variants={factVariants}
                className="flex flex-col items-center gap-3 text-center"
              >
                <p className="flex items-baseline justify-center text-[1.65rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.2rem] md:text-[3.45rem] lg:text-[3.4rem] xl:text-[3.9rem]">
                  {"displayValue" in fact ? (
                    <span>{fact.displayValue}</span>
                  ) : (
                    <>
                      <AnimatedNumber value={numericValue} />
                      <span className="text-[var(--showroom-soft)]">{fact.suffix}</span>
                    </>
                  )}
                </p>
                <p className="text-[0.48rem] font-semibold uppercase leading-4 tracking-[0.1em] text-[var(--showroom-soft)] sm:text-[0.72rem] sm:tracking-[0.18em]">
                  {fact.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="site-shell mt-16 grid gap-10 md:mt-20 lg:mt-24 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-stretch lg:gap-16">
          <Reveal direction="up" duration={0.9} distance={32}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black sm:aspect-[4/4.6] lg:aspect-[3/4]">
              <Image
                src={showroomPortrait.src}
                alt={showroomPortrait.alt}
                fill
                quality={90}
                sizes="(max-width: 1023px) 100vw, 32vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
            </div>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            variants={philosophyContainer}
            className="flex flex-col gap-8 md:gap-10 lg:h-full lg:justify-between lg:gap-6 lg:py-1"
          >
            <motion.div variants={philosophyItem}>
              <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-[var(--showroom-text)]">
                SEE IT. COMPARE IT. CHOOSE IT.
              </SectionEyebrow>
            </motion.div>

            <motion.p variants={philosophyItem} className={proseHeroClassName}>
              A dedicated in-person showroom for clients who want to compare fixtures, product lines, and finish options with more clarity before the final selections are locked.
            </motion.p>

            <motion.p variants={philosophyItem} className={proseHeroClassName}>
              The goal is simple &mdash; better visibility, stronger contrast between options, and fewer weak selections once the project is moving.
            </motion.p>

            <motion.div variants={philosophyItem} className="flex flex-col gap-4">
              <div className="grid gap-4 border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] p-5 text-left sm:grid-cols-3">
                {materialNotes.map((note) => (
                  <div key={note.label}>
                    <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--showroom-soft)]">
                      {note.label}
                    </p>
                    <p className="text-[0.98rem] leading-7 text-[var(--showroom-muted)]">
                      {note.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brands marquee */}
      <section
        aria-labelledby="brands-heading"
        className="relative overflow-hidden border-y border-white/12 bg-black py-12 text-white md:py-14"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <div className="site-shell relative z-10 mb-7 flex flex-col items-center gap-2 text-center">
          <SectionEyebrow className="text-[0.72rem] tracking-[0.18em] text-white/58">
            BRANDS WE WORK WITH
          </SectionEyebrow>
          <h2
            id="brands-heading"
            className="text-[2.4rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]"
          >
            The Lines Clients Trust
          </h2>
        </div>

        <ScrollVelocityContainer className="relative z-10 pt-2">
          <ScrollVelocityRow baseVelocity={2.8} direction={1} scrollReactivity>
            {showroomBrands.map((brand) => (
              <span
                key={brand}
                className="mr-10 whitespace-nowrap text-[1.8rem] font-black uppercase tracking-[-0.02em] text-white/82 sm:mr-14 sm:text-[2.4rem] md:text-[3rem] lg:text-[3.4rem]"
              >
                {brand}
                <span aria-hidden="true" className="mx-6 text-white/20 sm:mx-8">
                  ◆
                </span>
              </span>
            ))}
          </ScrollVelocityRow>
          <ScrollVelocityRow
            baseVelocity={2.8}
            direction={-1}
            className="mt-3"
            scrollReactivity
          >
            {showroomBrands.map((brand) => (
              <span
                key={`${brand}-outline`}
                className="mr-10 whitespace-nowrap text-[1.8rem] font-black uppercase tracking-[-0.02em] text-white/82 sm:mr-14 sm:text-[2.4rem] md:text-[3rem] lg:text-[3.4rem]"
              >
                {brand}
                <span aria-hidden="true" className="mx-6 text-white/20 sm:mx-8">
                  ◆
                </span>
              </span>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      {/* Showroom products */}
      <section
        aria-labelledby="showroom-products-heading"
        className="relative overflow-hidden bg-[var(--showroom-bg)] py-20 text-[var(--showroom-text)] md:py-28 lg:py-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--showroom-grid)_1px,transparent_1px),linear-gradient(90deg,var(--showroom-grid)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div className="site-shell relative z-10">
          <div className="grid gap-12 border-t border-[color:var(--showroom-line)] pt-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:pt-14">
            <Reveal direction="up" duration={0.75} distance={30}>
              <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
                <SectionEyebrow className="justify-center text-[0.78rem] tracking-[0.18em] text-[var(--showroom-text)] lg:justify-start">
                  PRODUCTS IN THE SHOWROOM
                </SectionEyebrow>
                <h2
                  id="showroom-products-heading"
                  className="max-w-[10ch] text-[2.4rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem]"
                >
                  See More Than Samples.
                </h2>
                <p className="max-w-[28rem] text-[1rem] leading-7 text-[var(--showroom-muted)] md:text-[1.08rem]">
                  Explore kitchen, bath, fixture, surface, and lighting options in
                  person, with more product lines available beyond this list.
                </p>
              </div>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.035, delayChildren: 0.08 },
                },
              }}
              className="grid grid-cols-1 border-l border-t border-white/12 sm:grid-cols-2 xl:grid-cols-3"
            >
              {showroomProducts.map((product, index) => (
                <motion.div
                  key={product}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: DURATION.md, ease: EASE_OUT_EXPO },
                    },
                  }}
                  className="group flex min-h-24 items-center justify-between gap-5 border-b border-r border-white/12 bg-black px-5 py-5 text-white transition-colors duration-500 hover:bg-white hover:text-black md:min-h-28 md:px-6"
                >
                  <span className="text-[1.05rem] font-black uppercase leading-[1.02] tracking-[-0.035em] md:text-[1.25rem]">
                    {product}
                  </span>
                  <span className="shrink-0 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/42 transition-colors duration-500 group-hover:text-black/38">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section
        aria-labelledby="collections-heading"
        className="site-shell pb-16 pt-20 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32"
      >
        <Reveal direction="up" duration={0.7} distance={28}>
          <div className="mb-12 flex flex-col items-center gap-4 text-center lg:mb-16">
            <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-[var(--showroom-text)]">
              WHAT YOU CAN SEE
            </SectionEyebrow>
            <h2
              id="collections-heading"
              className="text-[2rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[2.72rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]"
            >
              Product Categories
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
          {showroomCollections.map((collection, index) => {
            const isReversed = index % 2 === 1;
            return (
              <Reveal
                key={collection.index}
                direction="up"
                duration={0.9}
                distance={40}
              >
                <article
                  className={`group relative grid overflow-hidden border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] lg:grid-cols-2 lg:items-stretch ${
                    isReversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [background-image:linear-gradient(var(--showroom-grid)_1px,transparent_1px),linear-gradient(90deg,var(--showroom-grid)_1px,transparent_1px)] [background-size:48px_48px]"
                  />
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black lg:aspect-auto lg:min-h-[34rem]">
                    <Image
                      src={collection.image}
                      alt={collection.alt}
                      fill
                      quality={90}
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className="object-cover transition duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent opacity-80" />
                    <p className="absolute bottom-5 left-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                      Selection {collection.index}
                    </p>
                  </div>
                  <div className="relative flex min-h-[26rem] flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[var(--showroom-soft)]">
                      {collection.index} / {collection.eyebrow}
                    </p>
                    <div>
                      <h3 className="max-w-[12ch] text-[1.87rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[2.55rem] md:text-[3.06rem] lg:max-w-none lg:text-[3.4rem] xl:text-[3.74rem]">
                        {collection.title}
                      </h3>
                      <p className={`mt-6 max-w-[40rem] ${proseBodyClassName}`}>
                        {collection.description}
                      </p>
                    </div>
                    <div className="mt-10 flex items-center justify-between border-t border-[color:var(--showroom-line)] pt-5">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
                        Compare in store
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-2 w-10 bg-[var(--showroom-text)] transition-transform duration-500 group-hover:translate-x-2"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why the showroom */}
      <section
        aria-labelledby="why-heading"
        className="relative overflow-hidden bg-black py-20 text-white md:py-28 lg:py-32"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <div className="site-shell relative z-10 grid gap-12 border-t border-white/12 pt-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] lg:gap-16 lg:pt-14">
          <Reveal direction="up" duration={0.7} distance={28}>
            <div className="flex flex-col items-center gap-6 text-center">
              <SectionEyebrow className="justify-center text-[0.78rem] tracking-[0.18em] text-white">
                WHY THE SHOWROOM
              </SectionEyebrow>
              <h2
                id="why-heading"
                className="max-w-[15ch] text-[2rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[2.55rem] md:text-[3.06rem] lg:text-[3.4rem] xl:text-[3.74rem]"
              >
                <span className="block">Not Just</span>
                <span className="block whitespace-nowrap">Catalog Picks.</span>
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {showroomReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={reasonRowVariants}
                className="group border-b border-white/12 first:border-t"
              >
                <div className="grid grid-cols-1 gap-5 py-7 sm:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.4fr)] sm:items-start sm:gap-8 sm:py-9 md:py-10">
                  <div className="flex h-12 w-12 items-center justify-center border border-white/18 text-[0.78rem] font-black uppercase tracking-[-0.02em] text-white transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                    0{index + 1}
                  </div>
                  <p className="text-[1.15rem] font-black uppercase leading-[1.05] tracking-[-0.03em] text-white md:text-[1.4rem] lg:text-[1.6rem]">
                    {reason.title}
                  </p>
                  <p className="max-w-[38rem] text-[1rem] leading-7 text-white/68 md:text-[1.08rem]">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ShowroomAppointmentSection />

      <div className="flex min-h-screen items-center bg-[var(--showroom-bg)]">
        <ContactBlockSection showroomOnly />
      </div>

      <div className="relative z-[60] bg-black">
        <Footer hideContactInfo />
      </div>
    </main>
  );
}
