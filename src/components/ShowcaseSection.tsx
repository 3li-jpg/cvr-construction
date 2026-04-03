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
      className="w-full h-screen relative overflow-hidden bg-black"
    >
      <div
        ref={imageWrapRef}
        className="absolute inset-x-0 top-[-5%] h-[110%] will-change-transform"
      >
        <Image
          src="/images/2025-06-09.webp"
          alt="CVR Construction bathroom renovation in Victoria BC"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-20" />
    </section>
  );
}
