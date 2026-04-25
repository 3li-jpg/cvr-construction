"use client";

import Image from "next/image";
import Script from "next/script";
import { motion, type Variants } from "motion/react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { ContactBlockSection } from "@/components/ContactBlockSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ScrollVelocity";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { proseBodyClassName, proseHeroClassName } from "@/lib/prose";
import {
  showroomBrands,
  showroomCollections,
  showroomContact,
  showroomFacts,
  showroomHero,
  showroomPortrait,
  showroomReasons,
  showroomSchema,
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

const reasonRowVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO, delay: i * 0.08 },
  }),
};

export function ShowroomPage() {
  return (
    <main id="main-content" className="relative bg-white text-black">
      <Script
        id="showroom-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showroomSchema) }}
      />
      <Navbar />

      <PageIntro
        eyebrow="Showroom / In-Person Selection"
        title={"Victoria Kitchen & Bath Showroom"}
        scrollTargetId="showroom"
        backgroundImage={showroomHero}
      />

      {/* Facts + intro */}
      <section
        id="showroom"
        aria-labelledby="showroom-heading"
        className="site-shell px-6 pb-24 pt-16 sm:px-8 md:px-12 md:pb-28 md:pt-20 lg:px-20 lg:pb-32 lg:pt-24"
      >
        <h2 id="showroom-heading" className="sr-only">
          About the CVR Showroom
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-black/10 pt-14 sm:gap-x-10 md:gap-y-14 lg:grid-cols-4 lg:gap-x-12 lg:pt-20">
          {showroomFacts.map((fact, index) => {
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
                src={showroomPortrait.src}
                alt={showroomPortrait.alt}
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
                SEE IT. COMPARE IT. CHOOSE IT.
              </SectionEyebrow>
            </motion.div>

            <motion.p variants={philosophyItem} className={proseHeroClassName}>
              A dedicated in-person showroom for clients who want to compare fixtures, product lines, and finish options with more clarity before the final selections are locked.
            </motion.p>

            <motion.p variants={philosophyItem} className={proseHeroClassName}>
              Visit us at {showroomContact.addressLine1}, {showroomContact.cityRegionPostal}. The goal is simple &mdash; better visibility, stronger contrast between options, and fewer weak selections once the project is moving.
            </motion.p>

            <motion.div variants={philosophyItem} className="flex flex-col gap-4">
              <div className="grid gap-4 border border-black/10 p-5 text-left sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                    Address
                  </p>
                  <a
                    href={showroomContact.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.98rem] leading-7 text-black/74 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                  >
                    {showroomContact.addressLine1}
                    <br />
                    {showroomContact.cityRegionPostal}
                  </a>
                </div>
                <div>
                  <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                    Phone
                  </p>
                  <a
                    href={showroomContact.phoneHref}
                    className="text-[0.98rem] leading-7 text-black/74 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                  >
                    {showroomContact.phone}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={showroomContact.phoneHref}
                  className="inline-flex items-center gap-2 rounded-none bg-black px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                >
                  Call Showroom
                </a>
                <a
                  href={showroomContact.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-none border border-black/15 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brands marquee */}
      <section
        aria-labelledby="brands-heading"
        className="border-y border-black/10 bg-white py-10 md:py-12"
      >
        <div className="site-shell mb-6 flex flex-col items-center gap-2 px-6 text-center sm:px-8 md:px-12 lg:px-20">
          <SectionEyebrow className="text-[0.72rem] tracking-[0.18em] text-black/60">
            BRANDS IN STORE
          </SectionEyebrow>
          <h2
            id="brands-heading"
            className="text-[2.4rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]"
          >
            The Lines Clients Trust
          </h2>
        </div>

        <ScrollVelocityContainer className="pt-2">
          <ScrollVelocityRow baseVelocity={2.2} direction={1} scrollReactivity={false}>
            {showroomBrands.map((brand) => (
              <span
                key={brand}
                className="mr-10 whitespace-nowrap text-[1.8rem] font-black uppercase tracking-[-0.02em] text-black/75 sm:mr-14 sm:text-[2.4rem] md:text-[3rem] lg:text-[3.4rem]"
              >
                {brand}
                <span aria-hidden="true" className="mx-6 text-black/20 sm:mx-8">
                  ◆
                </span>
              </span>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      {/* Product categories */}
      <section
        aria-labelledby="collections-heading"
        className="site-shell px-6 pb-16 pt-20 sm:px-8 md:px-12 md:pb-20 md:pt-28 lg:px-20 lg:pb-24 lg:pt-32"
      >
        <Reveal direction="up" duration={0.7} distance={28}>
          <div className="mb-12 flex flex-col items-center gap-4 text-center lg:mb-16">
            <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-black">
              WHAT YOU CAN SEE
            </SectionEyebrow>
            <h2
              id="collections-heading"
              className="text-[2rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[2.72rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]"
            >
              Product Categories
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
          {showroomCollections.map((collection, index) => {
            const isReversed = index % 2 === 1;
            return (
              <Reveal
                key={collection.index}
                direction="up"
                duration={0.9}
                distance={40}
              >
                <article
                  className={`grid gap-8 lg:grid-cols-2 lg:gap-14 lg:items-center ${
                    isReversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black lg:aspect-[5/4]">
                    <Image
                      src={collection.image}
                      alt={collection.alt}
                      fill
                      quality={90}
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                      {collection.index} / {collection.eyebrow}
                    </p>
                    <h3 className="max-w-[12ch] text-[1.87rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[2.55rem] md:text-[3.06rem] lg:max-w-none lg:text-[3.4rem] xl:text-[3.74rem]">
                      {collection.title}
                    </h3>
                    <p className={`mt-6 max-w-[40rem] ${proseBodyClassName}`}>
                      {collection.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why the showroom */}
      <section
        aria-labelledby="why-heading"
        className="site-shell px-6 pb-24 pt-8 sm:px-8 md:px-12 md:pb-28 md:pt-12 lg:px-20 lg:pb-32 lg:pt-16"
      >
        <div className="grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] lg:gap-16 lg:pt-14">
          <Reveal direction="up" duration={0.7} distance={28}>
            <div className="flex flex-col gap-6">
              <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-black">
                WHY THE SHOWROOM
              </SectionEyebrow>
              <h2
                id="why-heading"
                className="text-[2rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[2.55rem] md:text-[3.06rem] lg:text-[3.4rem] xl:text-[3.74rem]"
              >
                Not Just
                <br />
                Catalog Picks.
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {showroomReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={reasonRowVariants}
                className="group border-b border-black/10 first:border-t"
              >
                <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10 sm:py-8 md:py-9">
                  <p className="text-[1.15rem] font-black uppercase leading-[1.05] tracking-[-0.03em] md:text-[1.4rem] lg:text-[1.6rem]">
                    {reason.title}
                  </p>
                  <p className={`${proseBodyClassName} max-w-[38rem]`}>
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <div className="flex min-h-screen items-center">
        <ContactBlockSection />
      </div>

      <div className="relative z-[60] bg-black">
        <Footer showCta />
      </div>
    </main>
  );
}
