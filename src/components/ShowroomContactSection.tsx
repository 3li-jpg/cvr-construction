"use client";

import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { showroomContact } from "@/lib/site-data";

export function ShowroomContactSection() {
  return (
    <section
      aria-labelledby="visit-heading"
      className="site-shell px-6 pb-24 sm:px-8 md:px-12 md:pb-28 lg:px-20 lg:pb-32 w-full"
    >
      <Reveal direction="up" duration={0.7} distance={28}>
        <div className="mb-10 flex flex-col items-center gap-4 border-t border-black/10 pt-10 text-center lg:mb-14 lg:pt-14">
          <SectionEyebrow className="text-[0.78rem] tracking-[0.18em] text-black">
            VISIT THE SHOWROOM
          </SectionEyebrow>
          <h2
            id="visit-heading"
            className="max-w-[15ch] text-[2.35rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3rem] md:text-[3.6rem] lg:max-w-none lg:text-[4rem] xl:text-[4.6rem]"
          >
            Come See The Products In Person
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal direction="up" delay={0.08} duration={0.8} distance={30}>
          <a
            href={showroomContact.phoneHref}
            className="group flex h-full flex-col justify-between gap-10 border border-black/12 p-6 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:border-black focus-visible:bg-black focus-visible:text-white md:p-8"
          >
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/48 group-hover:text-white/60 group-focus-visible:text-white/60">
              Showroom Phone
            </span>
            <span className="text-[1.8rem] font-black uppercase leading-[1.02] tracking-[-0.04em] md:text-[2.4rem] lg:text-[2.8rem]">
              {showroomContact.phone}
            </span>
          </a>
        </Reveal>
        <Reveal direction="up" delay={0.16} duration={0.8} distance={30}>
          <a
            href={showroomContact.emailHref}
            className="group flex h-full flex-col justify-between gap-10 border border-black/12 p-6 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:border-black focus-visible:bg-black focus-visible:text-white md:p-8"
          >
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/48 group-hover:text-white/60 group-focus-visible:text-white/60">
              Showroom Email
            </span>
            <span className="break-all text-[1.4rem] font-black uppercase leading-[1.1] tracking-[-0.03em] md:text-[1.8rem] lg:text-[2rem]">
              {showroomContact.email}
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
