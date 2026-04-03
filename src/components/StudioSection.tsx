"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { sectionHeadingClassName } from "@/lib/section-heading";

const phrases = [
  "plan carefully.",
  "build cleanly.",
  "finish sharply.",
  "deliver calmly.",
];

export function StudioSection() {
  const phrasesRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const handleScroll = () => {
      if (!phrasesRef.current) return;
      const rect = phrasesRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * 0.75;
      const endY = vh * 0.1;
      const p = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const weTranslate = progress * (phrases.length - 1) * 1.2;
  const floatPos = progress * (phrases.length - 1);

  return (
    <section className="relative w-full overflow-hidden bg-white pb-16 pt-16 text-black md:pt-20">

      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <Reveal direction="up" delay={0} duration={0.8}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black mb-10 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-black" />
            ABOUT CVR
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.1} duration={1} distance={60}>
          <h2 className={`${sectionHeadingClassName} mb-16 lg:mb-20`}>
            CRAFT WITHOUT
            <br />
            COMPROMISE
          </h2>
        </Reveal>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:items-stretch">
        <div className="w-full lg:w-1/2 flex items-start justify-center px-6 sm:px-8 md:px-12 lg:px-16 pb-12 lg:pb-0">
          <Reveal direction="up" delay={0.1} duration={1.1} distance={80} className="w-full max-w-xs">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
              <Image
                src="/images/2025-11-01.webp"
                alt="CVR Construction bathroom renovation detail"
                fill
                sizes="(max-width: 1023px) 100vw, 320px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-start px-6 sm:px-8 md:px-10 lg:px-12 py-2">
          <div className="relative flex items-start mb-8">
            <span
              className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.6rem] font-black tracking-[-0.03em] leading-[1.2] shrink-0 pr-3"
              style={{
                transform: `translateY(${weTranslate}em)`,
                willChange: "transform",
              }}
            >
              We
            </span>

            <div ref={phrasesRef} className="flex flex-col">
              {phrases.map((phrase, i) => {
                const distance = Math.abs(i - floatPos);
                const opacity = Math.max(0.1, 1 - distance * 0.65);
                return (
                  <span
                    key={i}
                    className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.6rem] font-black tracking-[-0.03em] leading-[1.2] block"
                    style={{ opacity }}
                  >
                    {phrase}
                  </span>
                );
              })}
            </div>
          </div>

          <Reveal direction="up" delay={0.2} duration={0.9} className="flex flex-col gap-5 text-[0.88rem] md:text-[0.93rem] font-normal leading-[1.75] text-black/60 max-w-md">
            <p>
              CVR Construction delivers high-end renovations across Victoria
              with disciplined planning, clean execution, and a finish standard
              that reads premium the moment you walk in.
            </p>
            <p>
              From kitchens and bathrooms to custom spaces and commercial
              interiors, every project is approached with restraint, precision,
              and the kind of care that gives the final result lasting weight.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
