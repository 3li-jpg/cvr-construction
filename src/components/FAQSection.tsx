"use client";

import Accordion07 from "@/components/shadcn-space/accordion/accordion-07";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { faqItems } from "@/lib/faq-data";

export function FAQSection() {
  return (
    <section className="overflow-hidden bg-[var(--faq-bg)] py-24 text-[var(--faq-text)] md:py-32">
      <div className="site-shell px-3 sm:px-5 lg:px-8 xl:px-10">
        <div className="grid gap-14 xl:grid-cols-[0.9fr_1.1fr] xl:gap-20">
          <div className="max-w-xl text-center xl:text-left">
            <Reveal direction="up" duration={0.8} distance={34}>
              <SectionEyebrow className="justify-center text-[0.78rem] tracking-[0.18em] text-[var(--faq-text)] xl:justify-start">
                FAQ
              </SectionEyebrow>
            </Reveal>
            <Reveal direction="up" delay={0.08} duration={0.95} distance={54}>
              <h2 className="mx-auto mt-5 max-w-[11ch] text-[2.5rem] font-black uppercase leading-[0.9] tracking-normal text-[var(--faq-text)] sm:text-[3.45rem] md:text-[4.3rem] xl:mx-0">
                What Homeowners Ask Before They Build
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.16} duration={0.9} distance={34}>
              <p className="mx-auto mt-7 max-w-lg text-[1rem] leading-8 text-[var(--faq-muted)] md:text-[1.15rem] md:leading-9 xl:mx-0">
                These are the questions that usually come up when clients are comparing
                renovation companies, planning budgets, and making decisions about materials,
                finishes, and overall project scope.
              </p>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.12} duration={1} distance={48}>
            <Accordion07 items={faqItems} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
