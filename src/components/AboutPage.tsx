"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Footer } from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ScrollVelocity";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { proseHeroClassName } from "@/lib/prose";
import {
  aboutHero,
  aboutStudioPortrait,
  services,
  studioCertifications,
  studioFacts,
  studioPartners,
  studioPhilosophy,
  studioYears,
} from "@/lib/site-data";

const factVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO, delay: i * 0.12 },
  }),
};

const philosophyContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const philosophyItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};

const awardRowVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO, delay: i * 0.06 },
  }),
};

function ArrowRightSmall() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function AboutPage() {
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
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />

      <PageIntro
        eyebrow="About / CVR Construction"
        title={"Our Studio"}
        scrollTargetId="about"
        backgroundImage={aboutHero}
      />

      <section
        id="about"
        aria-labelledby="about-heading"
        className="site-shell px-6 pb-24 pt-16 sm:px-8 md:px-12 md:pt-20 md:pb-28 lg:px-20 lg:pb-32 lg:pt-24"
      >
        <h2 id="about-heading" className="sr-only">
          About CVR Construction
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-black/10 pt-14 sm:gap-x-10 md:gap-y-14 lg:grid-cols-4 lg:gap-x-12 lg:pt-20">
          {studioFacts.map((fact, index) => {
            const numericValue = Number.parseInt(fact.value, 10);
            return (
              <motion.div
                key={fact.label}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                variants={factVariants}
                className="flex flex-col gap-3"
              >
                <p className="flex items-baseline text-[2.55rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.2rem] md:text-[3.75rem] lg:text-[3.4rem] xl:text-[3.9rem]">
                  <AnimatedNumber value={numericValue} />
                  <span className="text-black/55">{fact.suffix}</span>
                </p>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black/48">
                  {fact.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 lg:mt-24 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-stretch lg:gap-16">
          <Reveal direction="up" duration={0.9} distance={32}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black sm:aspect-[4/4.6] lg:aspect-[3/4]">
              <Image
                src={aboutStudioPortrait.image}
                alt={aboutStudioPortrait.alt}
                fill
                quality={88}
                sizes="(max-width: 1023px) 100vw, 32vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            variants={philosophyContainer}
            className="flex flex-col gap-8 md:gap-10 lg:h-full lg:justify-between lg:gap-6 lg:py-1"
          >
            <motion.div variants={philosophyItem}>
              <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-black">
                DESIGN YOU CAN FEEL
              </SectionEyebrow>
            </motion.div>

            {studioPhilosophy.map((paragraph) => (
              <motion.p
                key={paragraph}
                variants={philosophyItem}
                className={proseHeroClassName}
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div variants={philosophyItem}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 border-b border-current pb-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 dark:focus-visible:ring-white"
              >
                <span className="h-1.5 w-1.5 rounded-none bg-current" />
                Explore Our Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="story-heading"
        className="site-shell px-6 pb-24 sm:px-8 md:px-12 md:pb-28 lg:px-20 lg:pb-32"
      >
        <div className="grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)] lg:gap-16 lg:pt-14">
          <Reveal direction="up" duration={0.7} distance={28}>
            <div className="flex flex-col gap-8">
              <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-black">
                OUR STORY
              </SectionEyebrow>
              <p
                aria-hidden="true"
                className="hidden font-semibold uppercase tracking-[0.18em] text-black/40 lg:flex lg:flex-wrap lg:gap-x-5 lg:gap-y-2 lg:text-[0.72rem]"
              >
                {studioYears.map((year) => (
                  <span key={year}>{year}</span>
                ))}
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal direction="up" duration={0.9} distance={32}>
              <h2
                id="story-heading"
                className={proseHeroClassName}
              >
                Founded in Victoria and built around premium renovation work on Vancouver Island, CVR Construction has grown through word-of-mouth, repeat clients, and a track record of detail-driven builds. We partner closely with homeowners, designers, and trades to deliver renovation results that still feel sharp years later &mdash; whether it&apos;s a kitchen, a bathroom, a custom garden studio, or a full-home transformation.
              </h2>
            </Reveal>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black/40 lg:hidden">
              {studioYears.map((year) => (
                <span key={year}>{year}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="partners-heading"
        className="border-y border-black/10 bg-white py-10 md:py-12"
      >
        <div className="site-shell mb-6 flex flex-col items-center gap-2 px-6 text-center sm:px-8 md:px-12 lg:px-20">
          <SectionEyebrow className="text-[0.72rem] tracking-[0.18em] text-black/60">
            OUR PARTNERS
          </SectionEyebrow>
          <h2
            id="partners-heading"
            className="text-[2.4rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]"
          >
            Trusted By The Best
          </h2>
        </div>

        <ScrollVelocityContainer className="pt-2">
          <ScrollVelocityRow baseVelocity={2.2} direction={1} scrollReactivity={false}>
            {studioPartners.map((partner) => (
              <span
                key={partner.name}
                className="mr-10 whitespace-nowrap text-[1.8rem] font-black uppercase tracking-[-0.02em] text-black/75 sm:mr-14 sm:text-[2.4rem] md:text-[3rem] lg:text-[3.4rem]"
              >
                {partner.name}
                <span aria-hidden="true" className="mx-6 text-black/20 sm:mx-8">
                  ◆
                </span>
              </span>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      <section
        aria-labelledby="awards-heading"
        className="site-shell px-6 pb-24 pt-20 sm:px-8 md:px-12 md:pt-28 md:pb-28 lg:px-20 lg:pb-32 lg:pt-32"
      >
        <Reveal direction="up" duration={0.7} distance={28}>
          <div className="mb-12 flex flex-col items-center gap-4 text-center lg:mb-16">
            <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-black">
              RECOGNITIONS
            </SectionEyebrow>
            <h2
              id="awards-heading"
              className="text-[1.7rem] font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-[2.72rem] sm:leading-[0.9] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]"
            >
              Certifications &amp; Awards
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {studioCertifications.map((entry, index) => {
            const isExternal = Boolean(entry.href);
            const Component = (isExternal ? "a" : "div") as "a" | "div";
            const extraProps = isExternal
              ? {
                  href: entry.href,
                  target: "_blank",
                  rel: "noreferrer",
                }
              : {};

            return (
              <motion.div
                key={entry.title}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={awardRowVariants}
                className="group border-b border-black/10 first:border-t"
              >
                <Component
                  {...extraProps}
                  className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 px-2 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.2fr)] sm:gap-8 sm:py-7 sm:px-3 ${
                    isExternal
                      ? "transition-colors duration-300 hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-none"
                      : ""
                  }`}
                >
                  <span className="text-[1.1rem] font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-[1.4rem] md:text-[1.7rem] lg:text-[1.9rem]">
                    {entry.title}
                  </span>
                  <span className="hidden text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/45 group-hover:text-white/60 sm:block">
                    {entry.meta}
                  </span>
                  <span className="flex shrink-0 items-center justify-end gap-4">
                    {entry.year ? (
                      <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-black/55 tabular-nums group-hover:text-white/70 sm:text-[0.82rem]">
                        {entry.year}
                      </span>
                    ) : null}
                    {isExternal ? (
                      <span
                        aria-hidden="true"
                        className="text-black/45 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:text-white"
                      >
                        <ArrowRightSmall />
                      </span>
                    ) : null}
                  </span>
                </Component>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="services-heading"
        className="w-full bg-white py-10 text-black dark:bg-[#0f0f0e] dark:text-white lg:py-12"
      >
        <div className="site-shell flex w-full flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Reveal direction="up" duration={0.8}>
              <SectionEyebrow className="text-[0.9rem] tracking-[-0.03em] text-black dark:text-white">
                What We Do
              </SectionEyebrow>
            </Reveal>

            <Reveal direction="up" delay={0.12} duration={0.95} distance={70}>
              <h2
                id="services-heading"
                className="mt-8 max-w-[13ch] text-[2.4rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]"
              >
                Crafting Form
                <br />
                With Purpose
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 xl:mt-12 xl:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] xl:items-start xl:gap-20 2xl:grid-cols-[300px_minmax(0,1fr)] 2xl:gap-24">
            <Reveal
              direction="up"
              delay={0.18}
              duration={0.95}
              className="mx-auto flex max-w-[18.75rem] flex-col items-center gap-5 xl:mx-0 xl:items-start xl:sticky xl:top-24 xl:self-start xl:pt-1"
            >
              <div className="w-full overflow-hidden bg-white dark:bg-[#131311]">
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

              <p className="max-w-[28ch] text-[clamp(0.98rem,1.08vw,1.08rem)] leading-[1.22] tracking-[-0.025em] text-black dark:text-white">
                We focus on a narrow set of services so the finish standard stays consistent &mdash; the same discipline carries through scope, sequencing, and handover.
              </p>

              <InteractiveHoverButton
                href="/contact"
                className="w-fit tracking-[-0.02em]"
                data-analytics-event="about_service_cta_clicked"
                data-analytics-label="Start Your Project"
                data-analytics-location="about-services"
              >
                Start Your Project
              </InteractiveHoverButton>
            </Reveal>

            <div>
              {services.map((service, index) => {
                const isOpen = openIdx === index;
                const triggerId = `about-service-trigger-${service.num}`;
                const panelId = `about-service-panel-${service.num}`;

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
                          setOpenIdx((current) =>
                            current === index ? null : index
                          )
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
                          isOpen
                            ? "grid-rows-[1fr] pb-8 opacity-100"
                            : "grid-rows-[0fr] pb-0 opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pl-[max(2.7rem,7.8vw)] pr-1 md:pl-[max(3.5rem,7.9vw)]">
                            <p className="max-w-[34ch] text-[clamp(0.95rem,1.12vw,1.05rem)] leading-[1.16] tracking-[-0.03em] text-black/58 dark:text-white/58">
                              {service.desc}
                            </p>

                            <div className="mt-6">
                              <InteractiveHoverButton
                                href="/contact"
                                className="w-fit tracking-[-0.02em]"
                                data-analytics-event="about_service_cta_clicked"
                                data-analytics-label={service.title}
                                data-analytics-location="about-services"
                              >
                                Get Started
                              </InteractiveHoverButton>
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                              {service.galleryImages.map((image, imageIndex) => (
                                <div
                                  key={image}
                                  className="overflow-hidden bg-white dark:bg-[#131311]"
                                >
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

      <div className="relative z-[60] bg-black">
        <Footer showCta />
      </div>
    </main>
  );
}
