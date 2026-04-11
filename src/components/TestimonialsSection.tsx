"use client";

import { Reveal } from "@/components/Reveal";
import { TextAnimate } from "@/components/TextAnimate";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export function TestimonialsSection() {
  const testimonialsHeadingClassName =
    "text-[2.9rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.7rem] md:text-[4.45rem] lg:text-[5rem] xl:text-[5.45rem]";

  return (
    <section className="w-full overflow-hidden px-0 py-24 text-black dark:text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-none">
        <div className="mb-12 flex flex-col items-center px-0 text-center lg:mb-16">
          <Reveal direction="up" delay={0} duration={0.8}>
            <p className="mb-5 flex items-center justify-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black dark:text-white">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
              CLIENT REVIEWS
            </p>
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
        </div>

        <div className="relative overflow-hidden">
          <StaggerTestimonials />
        </div>
      </div>
    </section>
  );
}
