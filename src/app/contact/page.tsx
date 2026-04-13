import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { RouteIntro } from "@/components/RouteIntro";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact CVR Construction in Victoria, BC for premium renovations, kitchens, bathrooms, custom spaces, and commercial upgrades.",
  path: "/contact",
  image: "/images/victoria-front-entry-rebuild.webp",
  imageAlt: "Front entry rebuild by CVR Construction in Victoria BC",
});

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-[100dvh] flex-col justify-between bg-white text-black"
    >
      <Navbar />

      <section className="min-h-[100dvh] bg-white px-6 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32 lg:px-10 lg:pt-40">
        <div className="mx-auto max-w-[1680px]">
          <RouteIntro
            eyebrow="Contact / Start A Project"
            title={
              <>
                Start Your
                <br />
                Next Project
              </>
            }
            titleClassName="max-w-[12ch] text-balance text-[2.6rem] font-black uppercase leading-[0.92] tracking-[-0.05em] text-black sm:max-w-[11ch] sm:text-[3.9rem] md:max-w-[10ch] md:text-[5.4rem] lg:max-w-none lg:text-[6.1rem]"
            description={
              <>
                <p>
                  Use the form to outline your project and we will open a
                  WhatsApp draft with the details prefilled. If you prefer a
                  faster first conversation, you can call or email CVR directly.
                </p>
                <p className="mt-4">
                  The goal is to make first contact simple: clarify the scope,
                  choose the fastest way to talk, and move toward pricing and
                  scheduling without friction.
                </p>
              </>
            }
          />

          <div className="mt-14 border-y border-black/10">
            <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-4">
              <div className="border-b border-black/10 py-5 md:border-r md:px-0 xl:border-b-0 xl:pr-8">
                <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                  Direct Contact
                </p>
                <div className="space-y-1 text-[1rem] leading-7 text-black/74">
                  <a
                    href="mailto:info@cvrconstruction.ca"
                    data-analytics-event="contact_secondary_cta_clicked"
                    data-analytics-label="email"
                    data-analytics-location="contact-page"
                    className="block transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                  >
                    info@cvrconstruction.ca
                  </a>
                  <a
                    href="tel:+12508801270"
                    data-analytics-event="contact_secondary_cta_clicked"
                    data-analytics-label="phone"
                    data-analytics-location="contact-page"
                    className="block transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                  >
                    +1 250 880 1270
                  </a>
                </div>
              </div>

              <div className="border-b border-black/10 py-5 md:px-8 xl:border-b-0 xl:border-r">
                <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                  Service Area
                </p>
                <p className="text-[1rem] leading-7 text-black/72">
                  Victoria, Greater Victoria, and select Vancouver Island
                  projects.
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

          <div className="mt-12 grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
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
                <p className="max-w-[42rem] text-[0.98rem] leading-7 text-black/70">
                  We review your scope, location, timing, and whether the
                  project is a fit for our current workload.
                </p>
              </div>
              <div className="grid gap-4 py-5 sm:grid-cols-[5.25rem_minmax(0,1fr)] sm:gap-6">
                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-black/52">
                  02 / Talk
                </p>
                <p className="max-w-[42rem] text-[0.98rem] leading-7 text-black/70">
                  For most enquiries, WhatsApp, phone, or email is the fastest
                  way to clarify the scope before a site visit.
                </p>
              </div>
              <div className="grid gap-4 py-5 sm:grid-cols-[5.25rem_minmax(0,1fr)] sm:gap-6">
                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-black/52">
                  03 / Scope
                </p>
                <p className="max-w-[42rem] text-[0.98rem] leading-7 text-black/70">
                  If the project moves forward, we define priorities, finish
                  level, and the next steps toward pricing and scheduling.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 mx-auto w-full max-w-[1280px]">
            <ContactForm />
          </div>
        </div>
      </section>

      <div className="relative z-[60] w-full bg-black shadow-[0_-20px_80px_rgba(0,0,0,0.9)]">
        <Footer />
      </div>
    </main>
  );
}
