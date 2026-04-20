"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { proseBodyClassName } from "@/lib/prose";
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
      <div className="site-shell">
        <div className="flex flex-col items-center text-center">
          <Reveal direction="up" delay={0} duration={0.8}>
            <SectionEyebrow className="mb-10 text-xs tracking-[0.2em] text-black">
              ABOUT CVR
            </SectionEyebrow>
          </Reveal>

          <Reveal direction="up" delay={0.1} duration={1} distance={60}>
            <h2 className={`${sectionHeadingClassName} mb-16 lg:mb-20`}>
              CRAFT WITHOUT
              <br />
              COMPROMISE
            </h2>
          </Reveal>
        </div>

        <div className="flex w-full flex-col lg:flex-row lg:items-stretch">
          <div className="flex w-full items-start justify-center pb-12 lg:w-1/2 lg:items-stretch lg:pb-0 lg:pr-10 xl:pr-14">
            <Reveal direction="up" delay={0.1} duration={1.1} distance={80} className="w-full max-w-xs lg:max-w-md lg:h-full">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white lg:aspect-auto lg:h-full">
                <Image
                  src="/images/victoria-bathroom-vanity-detail.webp"
                  alt="CVR Construction bathroom renovation detail"
                  fill
                  quality={90}
                  sizes="(max-width: 1023px) 100vw, 448px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="flex w-full flex-col justify-start py-2 lg:w-1/2 lg:py-0 lg:pl-8 xl:pl-12">
            <div className="relative mb-8 flex items-start">
              <span
                className="shrink-0 pr-3 text-[2rem] font-black leading-[1.2] tracking-[-0.03em] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.6rem]"
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
                      className="block text-[2rem] font-black leading-[1.2] tracking-[-0.03em] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.6rem]"
                      style={{ opacity }}
                    >
                      {phrase}
                    </span>
                  );
                })}
              </div>
            </div>

            <Reveal direction="up" delay={0.2} duration={0.9} className={`flex max-w-xl flex-col gap-5 ${proseBodyClassName}`}>
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
      </div>
    </section>
  );
}
