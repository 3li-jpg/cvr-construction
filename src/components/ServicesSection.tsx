"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { services } from "@/lib/site-data";

function PillButton({ label }: { label: string }) {
  return (
    <InteractiveHoverButton
      href="/contact"
      className="w-fit tracking-[-0.02em]"
    >
      {label}
    </InteractiveHoverButton>
  );
}

export function ServicesSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const syncOpenService = () => {
      setOpenIdx((current) => {
        if (mediaQuery.matches) {
          return current ?? 0;
        }

        return null;
      });
    };

    syncOpenService();
    mediaQuery.addEventListener("change", syncOpenService);

    return () => mediaQuery.removeEventListener("change", syncOpenService);
  }, []);

  const activeService = services[openIdx ?? 0];

  return (
    <section className="w-full bg-white py-10 text-black dark:bg-[#161F1F] dark:text-white lg:py-12">
      <div className="site-shell flex w-full flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Reveal direction="up" duration={0.8}>
            <SectionEyebrow className="justify-center text-[0.9rem] tracking-[-0.03em] text-black dark:text-white">
              What We Do
            </SectionEyebrow>
          </Reveal>

          <Reveal direction="up" delay={0.12} duration={0.95} distance={70}>
            <h2 className="mt-6 text-[2.4rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.1rem] md:mt-8 md:max-w-[13ch] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]">
              Spaces Built
              <br />
              With Intent
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 xl:mt-12 xl:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] xl:items-start xl:gap-20 2xl:grid-cols-[300px_minmax(0,1fr)] 2xl:gap-24">
          <Reveal
            direction="up"
            delay={0.18}
            duration={0.95}
            className="mx-auto flex max-w-[18.75rem] flex-col items-center gap-5 text-center xl:sticky xl:top-24 xl:self-start xl:pt-1"
          >
            <div className="w-full overflow-hidden bg-white dark:bg-[#161F1F]">
              <Image
                src={activeService.previewImage}
                alt={activeService.title}
                width={960}
                height={1200}
                quality={90}
                sizes="(max-width: 1279px) 100vw, 300px"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <p className="w-full text-[clamp(0.98rem,1.08vw,1.08rem)] leading-[1.16] tracking-[-0.025em] text-black dark:text-white">
              Big or small, we’re on it. We work with a range of project sizes
              and budgets to find the right solution for your space.
            </p>

            <div className="flex w-full justify-center">
              <PillButton label="Start Your Project" />
            </div>
          </Reveal>

          <div>
            {services.map((service, index) => {
              const isOpen = openIdx === index;
              const triggerId = `service-trigger-${service.num}`;
              const panelId = `service-panel-${service.num}`;

              return (
                <Reveal
                  key={service.num}
                  direction="up"
                  delay={0.1 + index * 0.06}
                  duration={0.85}
                  distance={38}
                >
                  <div className="border-b border-black/15 dark:border-white/12">
                    <button
                      id={triggerId}
                      type="button"
                      onClick={() =>
                        setOpenIdx((current) => (current === index ? null : index))
                      }
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-5 text-left transition-colors hover:text-black/74 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 dark:hover:text-white/74 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black md:gap-x-6 ${
                        index === 0 ? "pb-5 pt-0 md:pb-6 md:pt-0" : "py-5 md:py-6"
                      }`}
                    >
                      <span className="pt-2 text-[0.95rem] font-medium leading-none tracking-[-0.05em] text-black/85 dark:text-white/82 md:text-[1.05rem]">
                        {service.num}/
                      </span>
                      <span className="text-[clamp(1.95rem,3.7vw,3.1rem)] font-normal leading-[0.98] tracking-[-0.05em]">
                        {service.title}
                      </span>
                      <span className="pt-0.5 text-[clamp(2.1rem,3.25vw,3.15rem)] font-light leading-none tracking-[-0.06em]">
                        {isOpen ? "×" : "+"}
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className={`grid transition-[grid-template-rows,opacity,padding] duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                        isOpen ? "grid-rows-[1fr] pb-8 opacity-100" : "grid-rows-[0fr] pb-0 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-[3.2rem] pr-1 md:pl-[3.75rem]">
                          <p className="max-w-[34ch] text-[clamp(0.95rem,1.12vw,1.05rem)] leading-[1.16] tracking-[-0.03em] text-black/58 dark:text-white/58">
                            {service.desc}
                          </p>

                          <div className="mt-6">
                            <PillButton label="Get Started" />
                          </div>

                          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {service.galleryImages.map((image, imageIndex) => (
                              <div key={image} className="overflow-hidden bg-white dark:bg-[#161F1F]">
                                <Image
                                  src={image}
                                  alt={`${service.title} reference ${imageIndex + 1}`}
                                  width={1200}
                                  height={980}
                                  quality={90}
                                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 33vw, 250px"
                                  className="aspect-[1.22/1] h-full w-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
