 "use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function StorySection() {
  return (
    <section className="w-full bg-white text-black flex flex-col lg:flex-row min-h-screen overflow-hidden">
      {/* Left: full-bleed image — slides in from left */}
      <Reveal direction="left" delay={0} duration={1.2} distance={100} className="relative w-full lg:min-h-screen lg:w-1/2 aspect-[4/5] flex-shrink-0 overflow-hidden bg-black lg:aspect-auto">
        <Image
          src="/images/victoria-premium-kitchen-interior.webp"
          alt="Custom kitchen renovation by CVR Construction"
          fill
          quality={90}
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover"
        />
      </Reveal>

      {/* Right: text content — slides in from right */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-20 md:px-12 lg:px-16 xl:px-20">
        <Reveal direction="up" delay={0.2} duration={0.8}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black mb-10 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-black" />
            OUR STORY
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4} duration={0.9}>
          <div className="text-[0.95rem] md:text-base font-normal leading-[1.8] text-black/70 space-y-6 max-w-lg">
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
    </section>
  );
}
