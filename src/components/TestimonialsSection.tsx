"use client";

import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { TextAnimate } from "@/components/TextAnimate";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export function TestimonialsSection() {
  const testimonialsHeadingClassName =
    "text-[2.4rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]";

  return (
    <section className="w-full overflow-hidden px-0 py-24 text-black dark:text-white sm:py-28 lg:py-32">
      <div className="site-shell">
        <div className="mb-12 flex flex-col items-center px-0 text-center lg:mb-16">
          <Reveal direction="up" delay={0} duration={0.8}>
            <SectionEyebrow className="mb-5 justify-center text-[0.78rem] tracking-[0.14em] text-black dark:text-white">
              CLIENT REVIEWS
            </SectionEyebrow>
          </Reveal>
          <Reveal direction="up" delay={0.15} duration={1} distance={80}>
            <TextAnimate
              as="h2"
              by="line"
              animation="blurInUp"
              once
              duration={0.8}
              className={`${testimonialsHeadingClassName} max-w-[12ch] text-balance`}
              segmentClassName="block"
            >
              {"CLIENT\nFEEDBACK"}
            </TextAnimate>
          </Reveal>
          <Reveal direction="up" delay={0.24} duration={0.8}>
            <p className="mt-5 max-w-[40rem] text-[0.96rem] leading-7 text-black/62">
              Selected client feedback across kitchen, bathroom, home, and commercial work.
            </p>
          </Reveal>
        </div>

        <div className="relative overflow-hidden">
          <StaggerTestimonials />
        </div>
      </div>
    </section>
  );
}
