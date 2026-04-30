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
              CVR Construction is Victoria&apos;s trusted partner for full home
              remodeling, kitchen renovations, bathroom remodels, and custom
              spaces. With 12+ years on Vancouver Island, we deliver
              disciplined craftsmanship — from scope clarity to a final
              walkthrough that feels polished, confident, and ready to live in.
            </p>
            <p>
              Every project is shaped by its own conditions. Whether it&apos;s
              a whole-home renovation, a commercial upgrade, or bespoke
              cabinetry, the standard stays the same: work that looks sharp,
              functions well, and holds its quality long after handover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
