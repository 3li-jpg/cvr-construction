import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { buildPageMetadata } from "@/lib/metadata";
import { businessContact, contactHero, showroomContact } from "@/lib/site-data";

const contactLocations = [
  {
    name: "CVR Construction",
    label: "Construction Office",
    contact: businessContact,
  },
  {
    name: "CVR Showroom",
    label: "Kitchen & Bath Showroom",
    contact: showroomContact,
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact CVR Construction and the CVR Showroom in Victoria, BC for premium renovations, kitchens, bathrooms, custom spaces, and commercial upgrades.",
  path: "/contact",
  image: contactHero.src,
  imageAlt: contactHero.alt,
});

export default function ContactPage() {
  return (
    <main id="main-content" className="relative bg-background text-foreground">
      <Navbar />

      <PageIntro
        eyebrow="Contact / Start A Project"
        title={"Start Your Next Project"}
        scrollTargetId="contact"
        backgroundImage={contactHero}
      />

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="site-shell px-6 pb-24 pt-16 sm:px-8 md:px-12 md:pb-28 md:pt-20 lg:px-20 lg:pb-32 lg:pt-24"
      >
        <div className="grid gap-10 border-t border-border pt-12 md:gap-12 md:pt-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-16 lg:pt-20 xl:gap-20">
          <Reveal direction="up" duration={0.8} distance={28}>
            <div className="flex h-full flex-col gap-8 lg:gap-10">
              <div className="space-y-5">
                <SectionEyebrow className="text-[0.78rem] tracking-[0.14em] text-foreground">
                  Start A Project
                </SectionEyebrow>
                <div className="space-y-4">
                  <h2
                    id="contact-heading"
                    className="max-w-[11ch] text-[2.5rem] font-black uppercase leading-[0.9] tracking-[-0.055em] text-foreground sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem]"
                  >
                    Let&apos;s Talk About The Space
                  </h2>
                  <p className="max-w-[34rem] text-[1.02rem] leading-7 tracking-[-0.01em] text-muted-foreground md:text-[1.08rem] md:leading-8">
                    Share the scope, timing, location, and finish standard you want to reach.
                    We&apos;ll review the project, reach out directly, and help you decide the best
                    next step.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {contactLocations.map(({ name, label, contact }, index) => (
                  <article
                    key={name}
                    className="group relative overflow-hidden border border-border bg-card/45 p-5 text-card-foreground transition-colors duration-300 hover:border-foreground/35 md:p-6"
                  >
                    <span className="absolute right-5 top-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:right-6 md:top-6">
                      0{index + 1}
                    </span>

                    <div className="max-w-[24rem] pr-12">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {name}
                      </p>
                      <h3 className="mt-2 text-[1.35rem] font-black uppercase leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[1.55rem]">
                        {label}
                      </h3>
                    </div>

                    <div className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)] sm:items-end lg:grid-cols-1 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)]">
                      <a
                        href={contact.mapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className="w-fit text-[0.95rem] leading-6 text-foreground/72 transition-opacity hover:opacity-60"
                      >
                        {contact.addressLine1}
                        <br />
                        {contact.cityRegionPostal}
                        <br />
                        {contact.country}
                      </a>

                      <div className="grid gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em]">
                        <a
                          href={contact.phoneHref}
                          className="flex flex-col items-start gap-2 border border-border px-4 py-3 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:border-foreground focus-visible:bg-foreground focus-visible:text-background sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                        >
                          <span className="text-muted-foreground transition-colors group-hover:text-muted-foreground">
                            Call
                          </span>
                          <span className="tracking-[-0.02em] sm:text-right">{contact.phone}</span>
                        </a>
                        <a
                          href={contact.emailHref}
                          className="flex flex-col items-start gap-2 border border-border px-4 py-3 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:border-foreground focus-visible:bg-foreground focus-visible:text-background sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                        >
                          <span className="text-muted-foreground transition-colors group-hover:text-muted-foreground">
                            Email
                          </span>
                          <span className="break-all tracking-[-0.02em] sm:text-right">
                            {contact.email}
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.08} duration={0.85} distance={30}>
            <div className="border border-border bg-card p-6 text-card-foreground shadow-[0_18px_60px_rgba(0,0,0,0.06)] md:p-8 lg:p-10 dark:shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
              <div className="max-w-[34rem] space-y-3 border-b border-border pb-6 md:pb-7">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Send A Message
                </p>
                <h3 className="text-[1.9rem] font-black uppercase leading-[0.96] tracking-[-0.045em] text-card-foreground sm:text-[2.2rem] md:text-[2.5rem]">
                  Start The Conversation
                </h3>
                <p className="text-[0.98rem] leading-7 text-muted-foreground md:text-[1rem]">
                  The email draft stays prefilled so you can review everything before sending.
                </p>
              </div>

              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
