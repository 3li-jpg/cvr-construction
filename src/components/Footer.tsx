 "use client";

import Image from "next/image";
import Link from 'next/link';
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Reveal } from "@/components/Reveal";
import TextRoll from "@/components/ui/text-roll";
import { navItems, projects, socialLinks } from "@/lib/site-data";

const ctaBackgroundImage = {
  src: "/images/victoria-whole-home-renovation-interior.webp",
  alt: "",
};

interface FooterProps {
  showCta?: boolean;
}

export function Footer({ showCta = false }: FooterProps) {
  const featuredProjects = [...projects].slice(0, 4).reverse();
  const eyebrowClassName =
    "mb-10 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-white/55";
  const largeLinkClassName =
    "text-[2.35rem] font-medium leading-[1.06] tracking-[-0.05em] text-white transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[3rem]";
  const sitemapLinkClassName =
    "text-[2.25rem] font-medium leading-[1.12] tracking-[-0.05em] text-white transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[3rem]";
  const metaLinkClassName =
    "transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  return (
    <>
      {showCta ? (
        <section
          aria-labelledby="global-cta-heading"
          className="relative isolate flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black text-white md:h-[100dvh] md:min-h-[100dvh]"
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
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white/75" />
                  Contact Us
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.18} duration={1} distance={60}>
                <h2
                  id="global-cta-heading"
                  className="mb-10 max-w-[9ch] text-[16vw] font-black uppercase leading-[0.86] tracking-[-0.055em] text-balance text-white sm:mb-12 sm:text-[11vw] md:text-[5.8rem] lg:max-w-none lg:text-[7.5rem] xl:text-[8.6rem]"
                >
                  LET&apos;S BUILD
                  <br />
                  SOMETHING LASTING
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.35} duration={0.8}>
                <InteractiveHoverButton href="/contact" variant="light" className="z-10">
                  SEND US AN ENQUIRY
                </InteractiveHoverButton>
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      <footer className="relative flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-black text-white md:h-[100dvh]">
        <div
        className="site-shell w-full px-2 sm:px-3 lg:px-4 pt-10 md:pt-14"
      >
        <div className="grid w-full grid-cols-1 gap-14 md:grid-cols-3 lg:gap-16">
          {/* Column 1: Address + Contact */}
          <Reveal direction="up" delay={0.08} duration={0.9} distance={42}>
            <div className="flex flex-col gap-0 text-left">
              <p className={eyebrowClassName}>
                • CONTACT
              </p>

              <a
                href="https://maps.app.goo.gl/WpiNvvknAfY1fdir6"
                target="_blank"
                rel="noreferrer"
                className={largeLinkClassName}
              >
                <p>Victoria, BC</p>
                <p>Vancouver Island</p>
                <p>Canada</p>
              </a>

              <div className="mt-7 flex flex-col gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-white/60">
                <a
                  href="mailto:info@cvrconstruction.ca"
                  className={metaLinkClassName}
                >
                  INFO@CVRCONSTRUCTION.CA
                </a>
                <a
                  href="tel:+12508801270"
                  className={metaLinkClassName}
                >
                  +1 250 880 1270
                </a>
              </div>
            </div>
          </Reveal>

          {/* Column 2: Navigation Links */}
          <Reveal direction="up" delay={0.16} duration={0.9} distance={42}>
            <div className="flex flex-col gap-1 text-left">
              <p className={eyebrowClassName}>
                • SITEMAP
              </p>

              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={sitemapLinkClassName}
                >
                  <TextRoll className="text-[inherit] font-[inherit] tracking-[inherit] leading-[0.96]">
                    {link.label.toUpperCase()}
                  </TextRoll>
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Column 3: Project Names */}
          <Reveal direction="up" delay={0.24} duration={0.9} distance={42}>
            <div className="flex flex-col gap-1 text-left">
              <p className={eyebrowClassName}>
                • PROJECTS
              </p>

              {featuredProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={sitemapLinkClassName}
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Middle: socials + copyright (centered in leftover space between sitemap and brand) */}
      <div className="site-shell w-full px-2 sm:px-3 lg:px-4">
        <div className="flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div className="flex gap-6 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-white/50">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={metaLinkClassName}
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </div>

          <p className="text-[0.88rem] text-white/40">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="w-full select-none">
        <p
          className="block w-full whitespace-nowrap text-center font-semibold uppercase leading-[0.82] tracking-[-0.04em] text-white text-[10.5vw]"
          style={{
            WebkitMaskImage:
              "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)",
            maskImage:
              "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)",
            marginBottom: "-0.2em",
          }}
        >
          Canada Victoria
          <br />
          Remodelling
        </p>
      </div>
      </footer>
    </>
  );
}
