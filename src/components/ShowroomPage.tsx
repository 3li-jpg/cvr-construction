import Image from "next/image";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { RouteIntro } from "@/components/RouteIntro";
import {
  showroomBrands,
  showroomCollections,
  showroomContact,
  showroomReasons,
  showroomSchema,
} from "@/lib/site-data";

function ContactLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-9 self-start items-center justify-center rounded-full border border-black bg-black px-4.5 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-300 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white dark:bg-white dark:text-black md:min-h-11 md:px-5 md:py-3 md:text-[0.76rem] md:tracking-[0.12em]"
    >
      {label}
    </a>
  );
}

function BrandWordmark({ brand }: { brand: (typeof showroomBrands)[number] }) {
  const brandClassName =
    brand === "KOHLER"
      ? "text-[1.45rem] tracking-[-0.08em]"
      : brand === "Moen"
        ? "text-[1.35rem] normal-case tracking-[-0.05em]"
        : brand === "PEARL"
          ? "text-[1.25rem] tracking-[0.28em]"
          : brand === "Grohe"
            ? "text-[1.3rem] normal-case tracking-[-0.05em]"
            : brand === "Delta"
              ? "text-[1.3rem] normal-case tracking-[-0.05em]"
              : brand === "Glacier Bay"
                ? "text-[1.1rem] normal-case tracking-[0.02em]"
                : brand === "RAINLEX"
                  ? "text-[1.15rem] tracking-[0.18em]"
                  : brand === "American Standard"
                    ? "text-[0.98rem] normal-case tracking-[0.04em]"
                    : brand === "Pfister"
                      ? "text-[1.22rem] normal-case tracking-[-0.04em]"
                      : "text-[1.25rem] tracking-[0.18em]";

  return (
    <div className="flex min-h-[7rem] items-center justify-center border border-white/14 px-5 py-6 text-center">
      <span
        className={`font-black uppercase leading-none text-white ${brandClassName}`}
      >
        {brand}
      </span>
    </div>
  );
}

export function ShowroomPage() {
  return (
    <main id="main-content" className="relative bg-white text-black">
      <Script
        id="showroom-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showroomSchema) }}
      />
      <Navbar />

      <section className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/victoria-premium-kitchen-interior.webp"
            alt="Premium kitchen and fixture display for the CVR showroom in Victoria BC"
            fill
            priority
            fetchPriority="high"
            quality={90}
            sizes="100vw"
            className="object-cover opacity-78"
          />
        </div>
        <div className="absolute inset-0 bg-black/34" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/55 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-6 pt-28 sm:px-8 md:px-12 md:pb-10 md:pt-32 lg:px-10 lg:pb-12 lg:pt-36">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(17rem,0.9fr)] lg:items-end">
            <div>
              <p className="mb-6 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/62">
                Showroom / In-Person Product Selection
              </p>
              <h1 className="max-w-[1100px] text-left text-[3.7rem] font-bold uppercase leading-[0.88] tracking-tighter text-balance text-white sm:text-[4.8rem] md:text-[6rem] lg:text-[6.9rem] xl:text-[7.5rem]">
                SEE IT.
                <br />
                COMPARE IT.
                <br />
                CHOOSE IT.
              </h1>
            </div>

            <div className="border border-white/18 bg-black/35 p-5 backdrop-blur-sm md:p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/56">
                CVR Showroom
              </p>
              <p className="mt-4 text-[1rem] leading-7 text-white/76">
                A dedicated in-person showroom for clients who want to compare
                fixtures, product lines, and finish options with more clarity
                before the final selections are made.
              </p>
              <div className="mt-6 grid gap-3 border-t border-white/14 pt-5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/64">
                <a
                  href={showroomContact.phoneHref}
                  className="transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {showroomContact.phone}
                </a>
                <a
                  href={showroomContact.emailHref}
                  className="break-all transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {showroomContact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 text-white/70 text-[10px] font-semibold uppercase tracking-[0.2em]">
            <span>SCROLL DOWN</span>
            <div className="flex flex-col items-center">
              <div className="h-6 w-[1px] bg-white/50" />
              <svg
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                className="mt-0.5"
              >
                <path
                  d="M1 1L4 4L7 1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-16 sm:px-8 md:px-12 md:pb-20 md:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <RouteIntro
          eyebrow="Showroom / Built For In-Person Decisions"
          title={
            <>
              A SHOWROOM
              <br />
              THAT MOVES
              <br />
              SELECTIONS
              <br />
              FORWARD
            </>
          }
          titleClassName="max-w-[12ch] text-balance text-[3rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:max-w-[11ch] sm:text-[4.2rem] md:max-w-[10ch] md:text-[5.2rem] lg:max-w-none lg:text-[6.1rem]"
          description={
            <>
              <p>
                This page is not about construction services in the abstract.
                It is about the physical showroom: a place where clients can
                review products in person, compare brand options, and make
                sharper decisions before the final spec gets locked.
              </p>
              <p className="mt-4">
                The goal is simple. Better visibility, stronger contrast
                between options, and fewer weak selections once the project is
                moving.
              </p>
            </>
          }
        />
      </section>

      <section className="border-y-2 border-white bg-black text-white">
        <div className="px-6 py-12 sm:px-8 md:px-12 lg:px-20 lg:py-16">
          <div className="mb-10 flex flex-col gap-4 border-b border-white/14 pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/52">
                Brands In Store
              </p>
              <h2 className="max-w-[11ch] text-[2.35rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3rem] md:text-[3.9rem] lg:max-w-none lg:text-[4.7rem]">
                The Lines Clients Ask For, In One Place
              </h2>
            </div>
            <p className="max-w-[28rem] text-[0.98rem] leading-7 text-white/68">
              Visible brand coverage matters here. The names are on the page,
              in the markup, and in the showroom schema so the route reads like
              a real product destination rather than a vague landing page.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {showroomBrands.map((brand) => (
              <BrandWordmark key={brand} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        {showroomCollections.map((collection, index) => {
          const isReversed = index % 2 === 1;

          return (
            <section
              key={collection.index}
              className="border-b border-black/10 px-6 py-10 sm:px-8 md:px-12 lg:px-20 lg:py-14"
            >
              <div
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
                  isReversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[24rem] overflow-hidden bg-black">
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                      {collection.index} / {collection.eyebrow}
                    </p>
                    <h2 className="max-w-[11ch] text-[2.35rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3rem] md:text-[3.9rem] lg:max-w-none lg:text-[4.7rem]">
                      {collection.title}
                    </h2>
                    <p className="mt-6 max-w-[36rem] text-[1rem] leading-7 text-black/70 sm:text-[1.08rem]">
                      {collection.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-black/10 pt-5">
                    <p className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                      What This Changes
                    </p>
                    <p className="mt-3 max-w-[34rem] text-[0.98rem] leading-7 text-black/68">
                      Instead of choosing products from disconnected tabs and
                      spec sheets, the showroom gives clients a place to compare
                      selections with real scale, real finish contrast, and more
                      confidence in the final direction.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/victoria-front-entry-rebuild.webp"
            alt="Front entry renovation project by CVR Construction in Victoria BC"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-black/58" />

        <div className="relative z-10 px-6 py-20 sm:px-8 md:px-12 lg:px-20 lg:py-24">
          <div className="max-w-[58rem]">
            <p className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/52">
              Why The Showroom Matters
            </p>
            <h2 className="max-w-[11ch] text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-[3.8rem] md:text-[5rem] lg:max-w-none lg:text-[6rem]">
              NOT JUST
              <br />
              CATALOG PICKS.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {showroomReasons.map((reason) => (
              <div
                key={reason.title}
                className="border border-white/14 bg-black/30 p-5 backdrop-blur-sm md:p-6"
              >
                <p className="text-[1.15rem] font-black uppercase leading-[1.02] tracking-[-0.04em] text-white">
                  {reason.title}
                </p>
                <p className="mt-4 text-[0.98rem] leading-7 text-white/70">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-20 pt-16 text-black sm:px-8 md:px-12 md:pb-24 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)] lg:items-end">
          <div>
            <p className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
              Visit / Contact The Showroom
            </p>
            <h2 className="max-w-[10ch] text-[2.8rem] font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-[3.9rem] md:text-[4.8rem] lg:max-w-none lg:text-[5.7rem]">
              COME SEE THE PRODUCTS IN PERSON
            </h2>
            <p className="mt-6 max-w-[40rem] text-[1rem] leading-7 text-black/70 sm:text-[1.08rem]">
              If the project is moving into selections, the showroom is the
              fastest way to compare brands, tighten the decision-making, and
              move toward a cleaner final specification.
            </p>
          </div>

          <div className="grid gap-4 border-t border-black/10 pt-6 lg:border-t-0 lg:pt-0">
            <div className="border border-black/10 p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Showroom Phone
              </p>
              <a
                href={showroomContact.phoneHref}
                className="mt-3 block text-[1.25rem] font-medium leading-7 tracking-[-0.03em] text-black/78 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                {showroomContact.phone}
              </a>
            </div>

            <div className="border border-black/10 p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Showroom Email
              </p>
              <a
                href={showroomContact.emailHref}
                className="mt-3 block break-all text-[1.1rem] font-medium leading-7 tracking-[-0.03em] text-black/78 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                {showroomContact.email}
              </a>
            </div>

            <div className="border border-black/10 p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                What To Use This For
              </p>
              <p className="mt-3 text-[0.98rem] leading-7 text-black/68">
                Brand comparison, finish decisions, fixture selection, and a
                more confident direction before products are finalized.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ContactLink href={showroomContact.phoneHref} label="Call The Showroom" />
          <ContactLink href={showroomContact.emailHref} label="Email The Showroom" />
        </div>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
