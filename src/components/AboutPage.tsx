import Image from "next/image";
import { Footer } from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Navbar } from "@/components/Navbar";
import { RouteIntro } from "@/components/RouteIntro";
import { processSteps, services, studioPrinciples, studioStats } from "@/lib/site-data";

export function AboutPage() {
  return (
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />

      <section className="px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-[1560px]">
          <RouteIntro
            eyebrow="About / CVR Construction"
            title={
              <>
                Built With
                <br />
                Restraint &
                <br />
                Precision
              </>
            }
            titleClassName="max-w-[13ch] text-balance text-[2.6rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:max-w-[12ch] sm:text-[3.9rem] md:max-w-[11ch] md:text-[5.4rem] lg:max-w-none lg:text-[6.5rem]"
            description={
              <>
                <p>
                  CVR Construction is positioned for clients who want a cleaner
                  process and a better-finished result. The focus is not volume.
                  It is disciplined renovation work that feels sharp on day one
                  and still holds its quality later.
                </p>
                <p className="mt-4">
                  From early scope conversations to final handover, the work is
                  meant to feel calm, exacting, and dependable for homeowners
                  who care about finish quality and clear communication.
                </p>
              </>
            }
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end">
            <div className="relative aspect-[1.38/1] overflow-hidden bg-black">
              <Image
                src="/images/victoria-bathroom-vanity-detail.webp"
                alt="Bathroom renovation detail by CVR Construction"
                fill
                priority
                quality={90}
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <dl className="border-y border-black/10">
              {studioStats.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-3 border-b border-black/10 py-5 last:border-b-0 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-6"
                >
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                    {item.label}
                  </dt>
                  <dd className="text-[1.3rem] leading-[1.2] tracking-[-0.03em] text-black/82 sm:text-[1.55rem]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {studioPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="border-t border-black/10 pt-5"
              >
                <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                  Principle
                </p>
                <h2 className="mb-4 text-[1.55rem] font-black uppercase leading-[0.95] tracking-[-0.045em]">
                  {principle.title}
                </h2>
                <p className="text-[0.96rem] leading-7 text-black/68">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <div>
              <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                What We Deliver
              </p>
              <h2 className="max-w-[12ch] text-[2.4rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[3rem] md:text-[3.6rem]">
                Services With A Higher Standard
              </h2>
            </div>

            <div className="divide-y divide-black/10 border-t border-black/10">
              {services.map((service) => (
                <div
                  key={service.num}
                  className="grid gap-4 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                    {service.num}
                  </p>
                  <div className="max-w-[46rem]">
                    <h3 className="mb-3 text-[1.2rem] font-black uppercase tracking-[-0.04em]">
                      {service.title}
                    </h3>
                    <p className="text-[0.95rem] leading-7 text-black/68">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <div>
              <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Process
              </p>
              <h2 className="max-w-[12ch] text-[2.4rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[3rem] md:text-[3.6rem]">
                Calm, Clear, And Structured
              </h2>
            </div>

            <div className="divide-y divide-black/10 border-t border-black/10">
              {processSteps.map((step) => (
                <div
                  key={step.num}
                  className="grid gap-4 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                    {step.num}
                  </p>
                  <div className="max-w-[46rem]">
                    <h3 className="mb-3 text-[1.2rem] font-black uppercase tracking-[-0.04em]">
                      {step.title}
                    </h3>
                    <p className="text-[0.95rem] leading-7 text-black/68">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-black/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Start A Conversation
              </p>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-black/68">
                If you are planning a renovation in Victoria and want a cleaner scope, steadier delivery, and a more premium finish standard, we can help.
              </p>
            </div>
            <InteractiveHoverButton
              href="/contact"
              className="w-fit"
            >
              Contact CVR
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
