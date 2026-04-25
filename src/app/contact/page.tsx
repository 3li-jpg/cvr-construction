import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { buildPageMetadata } from "@/lib/metadata";
import { proseBodyClassName } from "@/lib/prose";
import { businessContact, contactHero } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact CVR Construction in Victoria, BC for premium renovations, kitchens, bathrooms, custom spaces, and commercial upgrades.",
  path: "/contact",
  image: contactHero.src,
  imageAlt: contactHero.alt,
});

export default function ContactPage() {
  return (
    <main id="main-content" className="relative bg-white text-black">
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
        className="site-shell px-6 pb-24 pt-16 sm:px-8 md:px-12 md:pt-20 md:pb-28 lg:px-20 lg:pb-32 lg:pt-24"
      >
        <h2 id="contact-heading" className="sr-only">
          Contact CVR Construction
        </h2>

        <div className="border-y border-black/10">
          <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-4">
            <div className="border-b border-black/10 py-5 md:border-r md:px-0 md:pr-8 xl:border-b-0">
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                Direct Contact
              </p>
              <div className="space-y-1 text-[1rem] leading-7 text-black/74">
                <a
                  href={businessContact.emailHref}
                  data-analytics-event="contact_secondary_cta_clicked"
                  data-analytics-label="email"
                  data-analytics-location="contact-page"
                  className="block transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                >
                  {businessContact.email}
                </a>
                <a
                  href={businessContact.phoneHref}
                  data-analytics-event="contact_secondary_cta_clicked"
                  data-analytics-label="phone"
                  data-analytics-location="contact-page"
                  className="block transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                >
                  {businessContact.phone}
                </a>
              </div>
            </div>

            <div className="border-b border-black/10 py-5 md:px-8 xl:border-b-0 xl:border-r">
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                Office
              </p>
              <p className="text-[1rem] leading-7 text-black/72">
                {businessContact.addressLine1}
                <br />
                {businessContact.cityRegionPostal}
              </p>
            </div>

            <div className="border-b border-black/10 py-5 md:border-r md:px-0 md:pr-8 xl:border-b-0 xl:px-8">
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                What Helps Most
              </p>
              <p className="text-[1rem] leading-7 text-black/72">
                Scope, timing, neighborhood, and the finish standard you want
                the project to meet.
              </p>
            </div>

            <div className="py-5 md:px-8 xl:px-8">
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                Best First Step
              </p>
              <p className="text-[1rem] leading-7 text-black/72">
                Send the WhatsApp draft or call directly if the project is
                already defined and you want to move quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-black/10 pt-12 md:mt-20 lg:mt-24 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16 lg:pt-14">
          <div>
            <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
              What Happens Next
            </p>
            <h2 className="max-w-[11ch] text-[2.4rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[3rem] md:text-[3.7rem]">
              Clear, Calm, And Fast
            </h2>
          </div>

          <div className="divide-y divide-black/10">
            <div className="grid gap-4 py-5 sm:grid-cols-[5.25rem_minmax(0,1fr)] sm:gap-6">
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-black/52">
                01 / Review
              </p>
              <p className={`max-w-[42rem] ${proseBodyClassName}`}>
                We review your scope, location, timing, and whether the
                project is a fit for our current workload.
              </p>
            </div>
            <div className="grid gap-4 py-5 sm:grid-cols-[5.25rem_minmax(0,1fr)] sm:gap-6">
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-black/52">
                02 / Talk
              </p>
              <p className={`max-w-[42rem] ${proseBodyClassName}`}>
                For most enquiries, WhatsApp, phone, or email is the fastest
                way to clarify the scope before a site visit.
              </p>
            </div>
            <div className="grid gap-4 py-5 sm:grid-cols-[5.25rem_minmax(0,1fr)] sm:gap-6">
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-black/52">
                03 / Scope
              </p>
              <p className={`max-w-[42rem] ${proseBodyClassName}`}>
                If the project moves forward, we define priorities, finish
                level, and the next steps toward pricing and scheduling.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-[1280px] md:mt-20 lg:mt-24">
          <ContactForm />
        </div>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
