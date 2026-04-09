 "use client";

import Link from 'next/link';
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Reveal } from "@/components/Reveal";
import { navItems, projects, socialLinks } from "@/lib/site-data";

interface FooterProps {
  showCta?: boolean;
}

export function Footer({ showCta = false }: FooterProps) {
  const featuredProjects = [...projects].slice(0, 4).reverse();

  return (
      <footer className="w-full bg-black text-white relative overflow-hidden">
      {showCta ? (
        <div className="px-6 pb-24 pt-24 text-center sm:px-8 md:px-12 lg:px-20">
          <div className="relative mx-auto flex min-h-[24rem] w-full max-w-[70rem] items-center justify-center sm:min-h-[28rem] md:min-h-[34rem]">
            <div className="relative z-10 flex max-w-[58rem] flex-col items-center">
              <Reveal direction="up" delay={0.1} duration={1.1} distance={100}>
                <h2 className="mb-10 max-w-[9ch] text-[16vw] font-black uppercase leading-[0.86] tracking-[-0.055em] text-balance sm:mb-12 sm:text-[11vw] md:text-[5.8rem] lg:max-w-none lg:text-[7.5rem] xl:text-[8.6rem]">
                  LET&apos;S BUILD
                  <br />
                  SOMETHING LASTING
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.35} duration={0.8}>
                <InteractiveHoverButton
                  href="/contact"
                  variant="light"
                  className="z-10"
                >
                  SEND US AN ENQUIRY
                </InteractiveHoverButton>
              </Reveal>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`w-full px-6 pb-0 sm:px-8 md:px-12 lg:px-20 ${
          showCta ? "pt-2" : "pt-14 md:pt-16 lg:pt-20"
        }`}
      >
        <div className="grid w-full grid-cols-1 gap-14 md:grid-cols-3 lg:gap-16">
          {/* Column 1: Address + Contact */}
          <Reveal direction="up" delay={0.08} duration={0.9} distance={42}>
            <div className="flex flex-col gap-0 text-left">
              <p className="mb-10 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-white/55">
                • CONTACT
              </p>

              <a
                href="https://maps.app.goo.gl/WpiNvvknAfY1fdir6"
                target="_blank"
                rel="noreferrer"
                className="text-[2.35rem] font-medium leading-[1.06] tracking-[-0.05em] transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[3rem]"
              >
                <p>Victoria, BC</p>
                <p>Vancouver Island</p>
                <p>Canada</p>
              </a>

              <div className="mt-7 flex flex-col gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-white/60">
                <a
                  href="mailto:info@cvrconstruction.ca"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  INFO@CVRCONSTRUCTION.CA
                </a>
                <a
                  href="tel:+12508801270"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  +1 250 880 1270
                </a>
              </div>
            </div>
          </Reveal>

          {/* Column 2: Navigation Links */}
          <Reveal direction="up" delay={0.16} duration={0.9} distance={42}>
            <div className="flex flex-col gap-1 text-left">
              <p className="mb-10 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-white/55">
                • SITEMAP
              </p>

              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[2.25rem] font-medium leading-[1.12] tracking-[-0.05em] transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[3rem]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Column 3: Project Names */}
          <Reveal direction="up" delay={0.24} duration={0.9} distance={42}>
            <div className="flex flex-col gap-1 text-left">
              <p className="mb-10 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-white/55">
                • PROJECTS
              </p>

              {featuredProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="text-[2.25rem] font-medium leading-[1.12] tracking-[-0.05em] transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[3rem]"
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Bottom bar: socials left, copyright center */}
        <div className="mt-24 flex w-full flex-col items-start justify-between gap-6 pb-10 md:flex-row md:items-center">
          <Reveal direction="up" delay={0.3} duration={0.8} distance={30}>
            <div className="flex gap-6 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-white/50">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.34} duration={0.75} distance={24}>
            <p className="text-[0.88rem] text-white/40">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
