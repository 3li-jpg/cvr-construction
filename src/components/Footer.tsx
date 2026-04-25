"use client";

import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Reveal } from "@/components/Reveal";
import TextRoll from "@/components/ui/text-roll";
import {
  businessContact,
  navItems,
  projects,
  showroomContact,
  socialLinks,
  trustLinks,
} from "@/lib/site-data";

const ctaBackgroundImage = {
  src: "/images/victoria-whole-home-renovation-interior.webp",
  alt: "",
};

interface FooterProps {
  showCta?: boolean;
}

export function Footer({ showCta = false }: FooterProps) {
  const featuredProjects = [...projects].slice(0, 4).reverse();
  const metaLinkClassName =
    "transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";
  const footerSectionLabelClassName =
    "mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/52";
  const footerDisplayLinkClassName =
    "inline-flex max-w-full w-fit font-medium tracking-[-0.04em] text-white transition-colors hover:text-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  return (
    <>
      {showCta ? (
        <section
          aria-labelledby="global-cta-heading"
          className="relative isolate z-0 flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black text-white md:h-[100dvh] md:min-h-[100dvh]"
        >
          <Image
            src={ctaBackgroundImage.src}
            alt={ctaBackgroundImage.alt}
            fill
            quality={90}
            sizes="100vw"
            className="pointer-events-none absolute inset-0 -z-10 object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-black/60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/20 to-black/80"
          />

          <div className="site-shell relative z-10 flex w-full flex-col items-center justify-center px-6 py-20 text-center sm:px-8 md:px-12 lg:px-20">
            <div className="flex max-w-[58rem] flex-col items-center">
              <Reveal direction="up" delay={0.08} duration={0.7} distance={20}>
                <p className="mb-6 flex items-center justify-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white/75 sm:mb-8">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-none bg-white/75" />
                  Contact Us
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.18} duration={1} distance={60}>
                <h2
                  id="global-cta-heading"
                  className="mb-10 max-w-[9ch] text-[13vw] font-black uppercase leading-[0.86] tracking-[-0.055em] text-balance text-white sm:mb-12 sm:text-[9vw] md:text-[4.9rem] lg:max-w-none lg:text-[6.3rem] xl:text-[7.2rem]"
                >
                  LET&apos;S BUILD
                  <br />
                  SOMETHING LASTING
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.35} duration={0.8}>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <InteractiveHoverButton href="/contact" variant="light" className="z-10">
                      GET A FREE ESTIMATE
                    </InteractiveHoverButton>
                    <a
                      href="/showroom"
                      className="z-10 inline-flex items-center justify-center rounded-none border border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white/10"
                    >
                      Visit Our Showroom
                    </a>
                  </div>
                  <a
                    href={businessContact.phoneHref}
                    className="z-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {businessContact.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      <footer className="relative z-10 min-h-[100svh] w-full overflow-hidden bg-black text-white md:min-h-[100dvh]">
        <div className="site-shell relative z-10 flex min-h-[100svh] w-full flex-col px-4 pb-18 pt-18 sm:px-5 sm:pb-20 md:min-h-[100dvh] md:px-7 md:pt-20 md:pb-22 lg:px-9 lg:pt-22 lg:pb-24">
          <div className="mx-auto flex w-full max-w-[84rem] flex-1 flex-col">
            <div className="border-t border-white/10" />

            <div className="grid flex-1 content-start gap-12 pt-7 md:grid-cols-[minmax(0,1fr)_minmax(13rem,0.72fr)_minmax(0,1.08fr)] md:gap-x-12 md:pt-9 lg:gap-x-16">
              <Reveal direction="up" delay={0.08} duration={0.9} distance={42}>
                <div className="flex max-w-[22rem] flex-col text-left">
                  <p className={footerSectionLabelClassName}>• CONTACT</p>
                  <div className="space-y-6">
                    <div>
                      <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                        Construction Office
                      </p>
                      <a
                        href={businessContact.mapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className={`${footerDisplayLinkClassName} flex-col leading-[1.04]`}
                        style={{ fontSize: "clamp(1.55rem, 2.1vw, 2.65rem)" }}
                      >
                        <span>{businessContact.addressLine1}</span>
                        <span>{businessContact.cityRegionPostal}</span>
                      </a>
                    </div>
                    <div>
                      <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                        Showroom
                      </p>
                      <a
                        href={showroomContact.mapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className={`${footerDisplayLinkClassName} flex-col leading-[1.04]`}
                        style={{ fontSize: "clamp(1.2rem, 1.6vw, 2rem)" }}
                      >
                        <span>{showroomContact.addressLine1}</span>
                        <span>{showroomContact.cityRegionPostal}</span>
                      </a>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-white/60">
                    <a href={businessContact.emailHref} className={metaLinkClassName}>
                      {businessContact.email.toUpperCase()}
                    </a>
                    <a href={businessContact.phoneHref} className={metaLinkClassName}>
                      {businessContact.phone}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.16} duration={0.9} distance={42}>
                <div className="flex flex-col text-left">
                  <p className={footerSectionLabelClassName}>• SITEMAP</p>
                  <div className="flex flex-col">
                    {navItems.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={footerDisplayLinkClassName}
                        style={{ fontSize: "clamp(1.9rem, 2.35vw, 3.2rem)" }}
                      >
                        <TextRoll className="text-[inherit] font-[inherit] tracking-[inherit] leading-[0.98]">
                          {link.label.toUpperCase()}
                        </TextRoll>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.24} duration={0.9} distance={42}>
                <div className="flex max-w-[28rem] flex-col text-left md:justify-self-end">
                  <p className={footerSectionLabelClassName}>• PROJECTS</p>
                  <div className="flex flex-col gap-1.5">
                    {featuredProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className={`${footerDisplayLinkClassName} max-w-[13ch] text-balance leading-[0.94]`}
                        style={{ fontSize: "clamp(1.9rem, 2.15vw, 3rem)" }}
                      >
                        <span>{project.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-8">
              <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="inline-flex min-h-8 items-center justify-center rounded-none border border-white/15 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/50 transition-colors hover:border-white/40 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={trustLinks.find((l) => l.label === "BBB Accredited")?.href ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="BBB Accredited Business"
                    className="inline-flex min-h-8 items-center justify-center rounded-none border border-white/15 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/50 transition-colors hover:border-white/40 hover:text-white"
                  >
                    BBB Accredited
                  </a>
                </div>
                <p className="text-[0.75rem] text-white/40">
                  © {new Date().getFullYear()} All rights reserved.
                </p>
                  </div>
              <div className="mt-6 border-t border-white/10" />
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 select-none">
          <p
            className="block w-full whitespace-nowrap px-4 text-center font-semibold uppercase leading-[0.82] tracking-[-0.04em] text-white/90"
            style={{
              fontSize: "clamp(3.2rem, 6vw, 7.4rem)",
              WebkitMaskImage:
                "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)",
              maskImage:
                "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)",
              marginBottom: "-0.18em",
            }}
          >
            Canada Victoria Remodeling
          </p>
        </div>
      </footer>
    </>
  );
}
