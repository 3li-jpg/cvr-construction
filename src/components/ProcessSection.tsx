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
      const stickyTop =
        window.innerWidth >= 1024 ? 80 : window.innerWidth >= 640 ? 248 : 240;

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
      <div className="sticky top-[4.5rem] z-10 border-b border-black/8 bg-white/95 px-6 pb-5 pt-4 backdrop-blur dark:border-white/10 dark:bg-[#0f0f0e]/95 sm:top-[4.75rem] sm:px-8 md:px-12 lg:static lg:border-b-0 lg:bg-transparent lg:px-20 lg:pb-16 lg:pt-24 lg:backdrop-blur-none">
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
            className="sticky top-[15rem] bg-white text-black dark:bg-[#0f0f0e] dark:text-white sm:top-[15.5rem] lg:top-20"
            style={{ zIndex: index + 1 }}
          >
            <div
              ref={(node) => {
                overlayRefs.current[index] = node;
              }}
              className="pointer-events-none absolute inset-x-0 top-0 h-[18vh] bg-gradient-to-b from-black to-transparent opacity-0 transition-opacity duration-150"
            />

            <div className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 md:px-12 lg:px-20 lg:py-9">
              <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_18px_48px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#0f0f0e] lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
                <div className="px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:min-h-[78vh] lg:px-0 lg:py-0">
                  <div className="grid gap-7 lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-10">
                    <div className="flex items-start lg:pt-2">
                      <Reveal
                        direction="up"
                        delay={0.04}
                        duration={0.85}
                        distance={30}
                        threshold={0.2}
                      >
                        <span className="inline-block whitespace-nowrap text-[3rem] font-black uppercase leading-[0.82] tracking-[-0.06em] text-black dark:text-white sm:text-[3.5rem] lg:text-[4.8rem]">
                          {step.num}/
                        </span>
                      </Reveal>
                    </div>

                    <div className="flex flex-col gap-5 lg:gap-6">
                      <Reveal
                        direction="up"
                        delay={0.08}
                        duration={0.95}
                        distance={40}
                        threshold={0.18}
                      >
                        <div className="max-w-[56rem]">
                          <h3 className="max-w-[18rem] text-[2.15rem] font-black uppercase leading-[0.92] tracking-[-0.05em] text-balance sm:max-w-[24rem] sm:text-[2.6rem] md:max-w-[30rem] md:text-[3.2rem] lg:max-w-[56rem] lg:text-[4rem] lg:leading-[0.9] lg:tracking-[-0.045em] xl:text-[4.35rem]">
                            {step.title}
                          </h3>
                        </div>
                      </Reveal>

                      <Reveal
                        direction="up"
                        delay={0.14}
                        duration={0.9}
                        distance={30}
                        threshold={0.18}
                      >
                        <p className="max-w-[21rem] text-[1rem] leading-[1.44] text-black/72 dark:text-white/68 sm:max-w-[26rem] md:max-w-[34rem] lg:max-w-[39rem] lg:text-[1.08rem] lg:leading-[1.42]">
                          {step.desc}
                        </p>
                      </Reveal>

                      <div className="relative aspect-[1.16/1] w-full max-w-[58rem] overflow-hidden rounded-[1.2rem] bg-white dark:bg-[#131311] lg:aspect-[1.38/1] lg:rounded-none">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          quality={90}
                          sizes="(max-width: 1023px) calc(100vw - 2.5rem), 928px"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
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
