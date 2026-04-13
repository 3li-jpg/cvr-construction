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

  return (
    <section
      ref={sectionRef}
      className="relative h-[62svh] min-h-[62svh] w-full overflow-hidden bg-black md:h-[72dvh] md:min-h-[72dvh] lg:h-[78dvh] lg:min-h-[78dvh]"
    >
      <div
        ref={imageWrapRef}
        className="absolute inset-x-0 top-[-5%] h-[110%] will-change-transform"
      >
        <Image
          src="/images/victoria-modern-bathroom-vanity-portrait.png"
          alt="CVR Construction bathroom vanity detail in Victoria BC"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
        <Image
          src="/images/victoria-modern-bathroom-vanity-landscape.png"
          alt="CVR Construction bathroom vanity detail in Victoria BC"
          fill
          quality={90}
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-20" />
    </section>
  );
}
