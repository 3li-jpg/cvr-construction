"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { processSteps } from "@/lib/site-data";

export function ProcessSection() {
  const articleRefs = useRef<Array<HTMLElement | null>>([]);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [mobileCardTop, setMobileCardTop] = useState(188);
  const processHeadingClassName =
    "text-[2.9rem] sm:text-[3.7rem] md:text-[4.45rem] lg:text-[5rem] xl:text-[5.45rem] font-black tracking-[-0.045em] uppercase leading-[0.9]";

  useEffect(() => {
    const updateMobileCardTop = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const stickyTop = window.innerWidth >= 640 ? 76 : 72;
      const spacing = window.innerWidth >= 640 ? 12 : 10;
      setMobileCardTop(Math.round(stickyTop + headerHeight + spacing));
    };

    updateMobileCardTop();

    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      const observer = new ResizeObserver(() => updateMobileCardTop());
      observer.observe(headerRef.current);
      window.addEventListener("resize", updateMobileCardTop);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", updateMobileCardTop);
      };
    }

    window.addEventListener("resize", updateMobileCardTop);
    return () => window.removeEventListener("resize", updateMobileCardTop);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const updateCardShade = () => {
      const stickyTop = window.innerWidth >= 1024 ? 80 : mobileCardTop;

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
  }, [mobileCardTop]);

  return (
    <section className="w-full bg-white text-black">
      <div
        ref={headerRef}
        className="sticky top-[4.5rem] z-10 border-b border-black/8 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-[#0f0f0e]/95 sm:top-[4.75rem] lg:static lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none"
      >
        <div className="site-shell pb-5 pt-4 lg:pb-16 lg:pt-24">
          <div className="flex flex-col items-center text-center">
            <Reveal direction="up" duration={0.8} distance={36}>
              <SectionEyebrow className="mb-6 text-[0.78rem] tracking-[0.14em] text-black">
                OUR PROCESS
              </SectionEyebrow>
            </Reveal>
            <Reveal direction="up" delay={0.08} duration={0.95} distance={54}>
              <h2 className={`${processHeadingClassName} max-w-4xl text-balance`}>
                FROM VISION
                <br />
                TO REALITY
              </h2>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative">
        {processSteps.map((step, index) => (
          <article
            key={step.num}
            ref={(node) => {
              articleRefs.current[index] = node;
            }}
            className="sticky top-[var(--process-card-top)] bg-white text-black dark:bg-[#0f0f0e] dark:text-white lg:top-20"
            style={
              {
                zIndex: index + 1,
                "--process-card-top": `${mobileCardTop}px`,
              } as CSSProperties
            }
          >
            <div
              ref={(node) => {
                overlayRefs.current[index] = node;
              }}
              className="pointer-events-none absolute inset-x-0 top-0 h-[18vh] bg-gradient-to-b from-black to-transparent opacity-0 transition-opacity duration-150"
            />

            <div className="site-shell pb-5 pt-0 sm:pb-6 lg:py-7">
              <div className="overflow-hidden rounded-none border border-black/10 bg-white shadow-[0_18px_48px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#0f0f0e] sm:rounded-[1.35rem] lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
                <div className="px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:min-h-[42rem] lg:px-0 lg:py-0">
                  <div className="grid gap-5 lg:mx-auto lg:max-w-[72rem] lg:grid-cols-[6rem_minmax(0,1fr)] lg:items-start lg:gap-8 xl:max-w-[78rem]">
                    <div className="flex items-start justify-center lg:pt-2">
                      <Reveal
                        direction="up"
                        delay={0.04}
                        duration={0.85}
                        distance={30}
                        threshold={0.2}
                      >
                        <span className="inline-block whitespace-nowrap text-[3rem] font-black uppercase leading-[0.82] tracking-[-0.06em] text-black dark:text-white sm:text-[3.5rem] lg:text-[4rem]">
                          {step.num}/
                        </span>
                      </Reveal>
                    </div>

                    <div className="grid gap-5 lg:min-h-[42rem] lg:grid-cols-[minmax(0,44rem)_minmax(22rem,24rem)] lg:items-center lg:justify-center lg:gap-8 xl:gap-10">
                      <div className="relative mx-auto aspect-[1.16/1] w-full max-w-[58rem] overflow-hidden rounded-none bg-white dark:bg-[#131311] sm:aspect-[1.28/1] sm:rounded-[1rem] lg:h-[34rem] lg:w-full lg:max-w-none lg:rounded-none">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          quality={90}
                          sizes="(max-width: 1023px) calc(100vw - 2.5rem), 704px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-5 text-center lg:min-h-[34rem] lg:w-full lg:items-start lg:justify-center lg:text-left">
                        <Reveal
                          direction="up"
                          delay={0.08}
                          duration={0.95}
                          distance={40}
                          threshold={0.18}
                        >
                          <div className="mx-auto w-full max-w-[56rem] lg:mr-auto">
                            <h3 className="mx-auto max-w-[18rem] text-[2.15rem] font-black uppercase leading-[0.92] tracking-[-0.05em] text-balance sm:max-w-[24rem] sm:text-[2.6rem] md:max-w-[30rem] md:text-[3.2rem] lg:mx-0 lg:max-w-[24rem] lg:text-[3rem] lg:leading-[0.9] lg:tracking-[-0.045em] xl:text-[3.35rem]">
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
                          <p className="mx-auto w-full max-w-[21rem] text-[1rem] leading-[1.44] text-black/72 dark:text-white/68 sm:max-w-[26rem] md:max-w-[34rem] lg:mx-0 lg:max-w-[23rem] lg:leading-[1.44]">
                            {step.desc}
                          </p>
                        </Reveal>
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
