 "use client";

import Link from 'next/link';
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Reveal } from "@/components/Reveal";
import TextRoll from "@/components/ui/text-roll";
import { navItems, projects, socialLinks } from "@/lib/site-data";

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
      <footer className="relative w-full overflow-x-hidden">
      {showCta ? (
        <div className="bg-white text-black">
          <div className="site-shell px-2 pb-24 pt-24 text-center sm:px-3 lg:px-4">
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
                <InteractiveHoverButton href="/contact" variant="default" className="z-10">
                  SEND US AN ENQUIRY
                </InteractiveHoverButton>
              </Reveal>
            </div>
          </div>
        </div>
        </div>
      ) : null}

      <div className="bg-black text-white">
        <div
        className={`site-shell w-full px-2 sm:px-3 lg:px-4 pb-0 ${
          showCta ? "pt-2" : "pt-14 md:pt-16 lg:pt-20"
        }`}
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

        {/* Bottom bar: socials left, copyright center */}
        <div
          className="mt-24 flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center"
          style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
        >
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
      </div>
    </footer>
  );
}
