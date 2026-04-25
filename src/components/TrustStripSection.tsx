"use client";

import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const trustItems = [
  {
    label: "BBB Accredited",
    sublabel: "A+ Rating",
    href: "https://www.bbb.org/ca/bc/victoria/profile/remodeling/cvr-construction-ltd-0047-235975091",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Google Reviews",
    sublabel: "Verified Reviews",
    href: "https://maps.app.goo.gl/WpiNvvknAfY1fdir6",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="10"
          r="3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Yelp Reviews",
    sublabel: "Verified Reviews",
    href: "https://www.yelp.ca/biz/cvr-construction-victoria",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "12+ Years",
    sublabel: "On Vancouver Island",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <polyline
          points="12 6 12 12 16 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Licensed & Insured",
    sublabel: "Full Coverage in BC",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function TrustStripSection() {
  return (
    <section className="w-full border-y border-black/8 bg-white py-14 text-black dark:border-white/8 dark:bg-[#0f0f0e] dark:text-white md:py-16 lg:py-20">
      <div className="site-shell">
        <Reveal direction="up" delay={0} duration={0.8}>
          <SectionEyebrow className="mb-10 justify-center text-center text-[0.78rem] tracking-[0.14em] text-black dark:text-white">
            TRUSTED ACROSS VICTORIA
          </SectionEyebrow>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
          {trustItems.map((item, index) => {
            const Wrapper = item.href ? "a" : "div";
            const linkProps = item.href
              ? { href: item.href, target: "_blank" as const, rel: "noreferrer" }
              : {};

            return (
              <Reveal
                key={item.label}
                direction="up"
                delay={0.06 * index}
                duration={0.85}
                distance={30}
              >
                <Wrapper
                  {...linkProps}
                  className="group flex flex-col items-center gap-3 rounded-none border border-black/8 px-4 py-6 text-center transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/10 dark:hover:border-white dark:hover:bg-white dark:hover:text-black md:px-5 md:py-8"
                >
                  <span className="text-black/60 transition-colors group-hover:text-white/80 dark:text-white/60 dark:group-hover:text-black/80">
                    {item.icon}
                  </span>
                  <span className="text-[0.82rem] font-bold uppercase leading-[1.2] tracking-[-0.01em]">
                    {item.label}
                  </span>
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-black/45 transition-colors group-hover:text-white/55 dark:text-white/45 dark:group-hover:text-black/55">
                    {item.sublabel}
                  </span>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
