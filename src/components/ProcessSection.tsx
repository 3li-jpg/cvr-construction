"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/lib/site-data";

export function ProcessSection() {
  const articleRefs = useRef<Array<HTMLElement | null>>([]);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const processHeadingClassName =
    "text-[2.9rem] sm:text-[3.7rem] md:text-[4.45rem] lg:text-[5rem] xl:text-[5.45rem] font-black tracking-[-0.045em] uppercase leading-[0.9]";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const updateCardShade = () => {
      const stickyTop = window.innerWidth >= 1024 ? 80 : 72;

      articleRefs.current.forEach((article, index) => {
        const overlay = overlayRefs.current[index];
        if (!article || !overlay) return;

        const rect = article.getBoundingClientRect();
        const travel = Math.max(rect.height - stickyTop, 1);
        const progress = Math.min(
          Math.max((stickyTop - rect.top) / travel, 0),
          1
        );
        const isActive = rect.top <= stickyTop && rect.bottom > stickyTop;
        const shade = isActive ? Math.min(progress * 1.45, 0.18) : 0;

        overlay.style.opacity = shade.toFixed(3);
      });
    };

    updateCardShade();
    window.addEventListener("scroll", updateCardShade, { passive: true });
    window.addEventListener("resize", updateCardShade);

    return () => {
      window.removeEventListener("scroll", updateCardShade);
      window.removeEventListener("resize", updateCardShade);
    };
  }, []);

  return (
    <section className="w-full bg-white text-black">
      <div className="px-6 pb-12 pt-20 sm:px-8 md:px-12 lg:px-20 lg:pb-16 lg:pt-24">
        <Reveal direction="up" duration={0.8} distance={36}>
          <p className="mb-6 flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
            OUR PROCESS
          </p>
        </Reveal>
        <Reveal direction="up" delay={0.08} duration={0.95} distance={54}>
          <h2 className={`${processHeadingClassName} max-w-4xl text-balance`}>
            FROM VISION
            <br />
            TO REALITY
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        {processSteps.map((step, index) => (
          <article
            key={step.num}
            ref={(node) => {
              articleRefs.current[index] = node;
            }}
            className="relative bg-white text-black dark:bg-[#0f0f0e] dark:text-white lg:sticky lg:top-20"
            style={{ zIndex: index + 1 }}
          >
            <div
              ref={(node) => {
                overlayRefs.current[index] = node;
              }}
              className="pointer-events-none absolute inset-x-0 top-0 h-[18vh] bg-gradient-to-b from-black to-transparent opacity-0 transition-opacity duration-150"
            />

            <div className="px-6 py-8 sm:px-8 md:px-12 lg:min-h-[78vh] lg:px-20 lg:py-9">
              <div className="grid gap-7 lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-10">
                <div className="flex items-start lg:pt-2">
                  <Reveal
                    direction="up"
                    delay={0.04}
                    duration={0.85}
                    distance={34}
                    threshold={0.2}
                  >
                    <span className="inline-block whitespace-nowrap text-[3.2rem] font-black uppercase leading-[0.82] tracking-[-0.06em] text-black dark:text-white sm:text-[4rem] lg:text-[4.8rem]">
                      {step.num}/
                    </span>
                  </Reveal>
                </div>

                <div className="flex flex-col gap-5 lg:gap-6">
                  <Reveal
                    direction="up"
                    delay={0.08}
                    duration={0.95}
                    distance={48}
                    threshold={0.18}
                  >
                    <div className="max-w-[56rem]">
                      <h3 className="max-w-[56rem] text-[2.35rem] font-black uppercase leading-[0.9] tracking-[-0.045em] text-balance sm:text-[3rem] md:text-[3.6rem] lg:text-[4rem] xl:text-[4.35rem]">
                        {step.title}
                      </h3>
                    </div>
                  </Reveal>

                  <Reveal
                    direction="up"
                    delay={0.14}
                    duration={0.9}
                    distance={34}
                    threshold={0.18}
                  >
                    <p className="max-w-[39rem] text-[0.96rem] leading-[1.42] text-black/72 dark:text-white/68 sm:text-[1.02rem] lg:text-[1.08rem]">
                      {step.desc}
                    </p>
                  </Reveal>

                  <div className="relative aspect-[1.38/1] w-full max-w-[58rem] overflow-hidden bg-white dark:bg-[#131311]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1023px) 100vw, 928px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
