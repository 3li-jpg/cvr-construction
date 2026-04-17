 "use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function StorySection() {
  return (
    <section className="w-full overflow-hidden bg-white text-black">
      <div className="site-shell flex min-h-[78svh] flex-col md:min-h-[82dvh] lg:flex-row">
        <Reveal direction="left" delay={0} duration={1.2} distance={100} className="relative aspect-[4/5] w-full flex-shrink-0 overflow-hidden bg-black lg:min-h-[82dvh] lg:w-1/2 lg:aspect-auto">
          <Image
            src="/images/victoria-premium-kitchen-interior.webp"
            alt="Custom kitchen renovation by CVR Construction"
            fill
            quality={90}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <div className="flex w-full flex-col justify-center py-16 lg:w-1/2 lg:pl-12 xl:pl-16">
          <Reveal direction="up" delay={0.2} duration={0.8}>
            <p className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
              OUR STORY
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4} duration={0.9}>
            <div className="max-w-lg space-y-6 text-[0.95rem] font-normal leading-[1.8] text-black/70 md:text-base">
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
