"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ShowcaseSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
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
    const update = () => {
      frame = 0;
      if (!imageWrapRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const translateY = (0.5 - progress) * 10 * rect.height / 100;

      imageWrapRef.current.style.transform = `translateY(${translateY}px)`;
    };

    const requestTick = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
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
          src="/images/victoria-modern-bathroom-vanity-portrait-optimized.webp"
          alt="CVR Construction bathroom vanity detail in Victoria BC"
          fill
          quality={100}
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
        <Image
          src="/images/victoria-modern-bathroom-vanity-landscape-optimized.webp"
          alt="CVR Construction bathroom vanity detail in Victoria BC"
          fill
          quality={100}
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-20" />
    </section>
  );
}
