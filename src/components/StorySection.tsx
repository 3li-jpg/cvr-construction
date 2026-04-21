 "use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { proseBodyClassName } from "@/lib/prose";

export function StorySection() {
  return (
    <section className="relative w-full overflow-hidden bg-white text-black">
      <div className="flex min-h-[100svh] w-full flex-col md:min-h-[100dvh] lg:flex-row">
        <div className="relative aspect-[4/5] w-full flex-shrink-0 overflow-hidden bg-black lg:aspect-auto lg:h-[100dvh] lg:min-h-[100dvh] lg:w-1/2">
          <Image
            src="/images/victoria-premium-kitchen-interior.webp"
            alt="Custom kitchen renovation by CVR Construction"
            fill
            quality={90}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-center px-[var(--site-gutter)] py-16 md:py-20 lg:w-1/2 lg:pl-12 lg:pr-[var(--site-gutter)] xl:pl-16">
          <Reveal direction="up" delay={0.2} duration={0.8}>
            <p className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
              OUR STORY
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4} duration={0.9}>
            <div className={`max-w-xl space-y-6 ${proseBodyClassName}`}>
              <p>
                CVR Construction is trusted for renovation work that feels
                composed, substantial, and properly finished. We take on
                kitchens, bathrooms, custom spaces, and commercial upgrades with
                a simple standard: the work has to look sharp, function well,
                and hold its quality long after the handover.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
