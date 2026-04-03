"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "@/components/TextAnimate";

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

    const handleScroll = () => {
      if (!imageWrapRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const translateY = (0.5 - progress) * 10 * rect.height / 100;

      imageWrapRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  const indicatorAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, animation: "heroFadeIn 0.8s ease 1.2s forwards" };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <div
        ref={imageWrapRef}
        className="absolute inset-x-0 top-[-5%] h-[110%] will-change-transform"
      >
        <Image
          src="/images/2024-01-13.webp"
          alt="CVR Construction garden studio project in Victoria BC"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />

      <div className="relative z-10 flex h-full w-full items-end px-5 pb-6 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
        <TextAnimate
          as="h1"
          by="line"
          animation="blurInUp"
          startOnView={false}
          once
          duration={0.8}
          delay={prefersReducedMotion ? 0 : 0.2}
          className="max-w-[1100px] text-left text-[4.2rem] font-bold uppercase leading-[0.88] tracking-tighter text-balance text-white sm:text-[5.4rem] md:text-[6.8rem] lg:text-[7.6rem] xl:text-[8.4rem]"
          segmentClassName="block"
        >
          {"BUILT DIFFERENT,\nBUILT TO LAST"}
        </TextAnimate>

        <div
          className="absolute bottom-6 right-5 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 flex items-center gap-3 text-white/70 text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={indicatorAnimation}
        >
          <span>SCROLL DOWN</span>
          <div className="flex flex-col items-center">
            <div className="h-6 w-[1px] bg-white opacity-50" />
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="mt-0.5">
              <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
