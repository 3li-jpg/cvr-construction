"use client";

import Image from "next/image";
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

        <div className="flex w-full flex-col items-center justify-center px-[var(--site-gutter)] py-16 text-left md:py-20 lg:w-1/2 lg:items-start lg:pl-12 lg:pr-[var(--site-gutter)] xl:pl-16">
          <div className="w-full max-w-xl">
            <p className="mb-10 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black lg:justify-start">
              <span className="inline-block h-1.5 w-1.5 rounded-none bg-current" />
              OUR STORY
            </p>
          </div>

          <div className={`max-w-xl space-y-6 ${proseBodyClassName}`}>
            <p>
              CVR Construction is built on 20+ years experience, backed by
              craftsmanship spanning three generations. Rooted in Syria, this
              foundation reflects a disciplined approach to construction—where
              consistency, precision, and accountability matter, and where skills
              were developed through hands-on experience with a focus on doing
              the work right the first time.
            </p>
            <p>
              Now based in Victoria, CVR Construction specializes in full home
              renovations, kitchen and bathroom remodeling, and custom spaces.
              Every project is approached with structured planning, clear
              communication, and disciplined execution—from initial walkthrough
              to final inspection—delivering work that is technically sound,
              visually refined, and built to last.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
