"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BlurTextAnimation from "@/components/ui/blur-text-animation";

export function HeroSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame = 0;

    const updateTransform = () => {
      frame = 0;
      if (!imageWrapRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const translateY = (0.5 - progress) * 10 * rect.height / 100;

      imageWrapRef.current.style.transform = `translateY(${translateY}px)`;
    };

    const requestTick = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateTransform);
      }
    };

    requestTick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, [prefersReducedMotion]);

  const indicatorAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, animation: "heroFadeIn 0.8s ease 0.8s forwards" };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-black md:h-[100dvh] md:min-h-[100dvh]"
    >
      <div
        ref={imageWrapRef}
        className="absolute inset-x-0 top-[-5%] h-[110%] will-change-transform"
      >
        <Image
          src="/images/victoria-garden-studio-hero.png"
          alt="CVR Construction backyard garden studio in Victoria BC"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />

      <div className="relative z-10 h-full w-full">
        <div className="site-shell relative flex h-full items-center justify-center pb-14 pt-24 md:pb-8 md:pt-28 lg:pb-10 lg:pt-32">
          {prefersReducedMotion ? (
            <h1 className="mx-auto text-center text-[clamp(2.35rem,11.5vw,3.15rem)] font-bold uppercase leading-[0.9] tracking-tighter text-white sm:text-[4.6rem] md:text-[6.4rem] lg:text-[7.3rem] xl:text-[8rem]">
              <span className="block whitespace-nowrap">BUILT DIFFERENT</span>
              <span className="block whitespace-nowrap">BUILT TO LAST</span>
            </h1>
          ) : (
            <h1 className="mx-auto text-center text-[clamp(2.35rem,11.5vw,3.15rem)] font-bold uppercase leading-[0.9] tracking-tighter text-white sm:text-[4.6rem] md:text-[6.4rem] lg:text-[7.3rem] xl:text-[8rem]">
              <BlurTextAnimation
                text="BUILT DIFFERENT"
                className="block whitespace-nowrap"
                fontSize="text-[inherit]"
                fontFamily="font-inherit"
                textColor="text-white"
                animationDelay={3000}
                repeat={false}
              />
              <BlurTextAnimation
                text="BUILT TO LAST"
                className="mt-1 block whitespace-nowrap"
                fontSize="text-[inherit]"
                fontFamily="font-inherit"
                textColor="text-white"
                animationDelay={3000}
                repeat={false}
              />
            </h1>
          )}

          <div
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:flex lg:bottom-10"
            style={indicatorAnimation}
          >
            <span>SCROLL DOWN</span>
            <div className="flex flex-col items-center gap-1">
              <div className="h-6 w-[1px] bg-white opacity-50" />
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55 flex sm:hidden"
            style={{
              bottom: "calc(env(safe-area-inset-bottom, 0px) + 4.5rem)",
              ...(prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, animation: "heroFadeIn 0.8s ease 0.9s forwards" }),
            }}
          >
            <span>SCROLL</span>
            <div className="h-4 w-[1px] bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
