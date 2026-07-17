"use client";

import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SocialIconLink } from "@/components/SocialIconLink";
import { businessContact, showroomContact } from "@/lib/site-data";

const contacts = [
  {
    eyebrow: "CVR Construction",
    sublabel: "Main Office",
    addressLine1: businessContact.addressLine1,
    cityRegionPostal: businessContact.cityRegionPostal,
    phone: businessContact.phone,
    phoneHref: businessContact.phoneHref,
    email: businessContact.email,
    emailHref: businessContact.emailHref,
    whatsapp: businessContact.whatsapp,
    mapsHref: businessContact.mapsHref,
  },
  {
    eyebrow: "CVR Showroom",
    sublabel: "Kitchen & Bath Showroom",
    addressLine1: showroomContact.addressLine1,
    cityRegionPostal: showroomContact.cityRegionPostal,
    phone: showroomContact.phone,
    phoneHref: showroomContact.phoneHref,
    email: showroomContact.email,
    emailHref: showroomContact.emailHref,
    mapsHref: showroomContact.mapsHref,
  },
];

const showroomSocialLinks = [
  { href: showroomContact.instagram, label: "Instagram" },
  { href: showroomContact.facebook, label: "Facebook" },
  { href: "https://www.tiktok.com/@cvr.construction", label: "TikTok" },
  { href: "https://www.youtube.com/@cvrconstructionltd", label: "YouTube" },
  { href: "https://maps.app.goo.gl/WpiNvvknAfY1fdir6", label: "Google" },
  { href: "https://wa.me/12508801270", label: "WhatsApp" },
] as const;

type ContactBlockSectionProps = {
  showroomOnly?: boolean;
};

export function ContactBlockSection({ showroomOnly = false }: ContactBlockSectionProps) {
  const visibleContacts = showroomOnly
    ? contacts.filter((contact) => contact.eyebrow === "CVR Showroom")
    : contacts;
  const showroom = contacts.find((contact) => contact.eyebrow === "CVR Showroom");

  if (showroomOnly && showroom) {
    return (
      <section className="relative w-full overflow-hidden bg-[var(--showroom-bg)] py-14 text-[var(--showroom-text)] md:py-16 lg:py-18 xl:py-20">
        <div
          aria-hidden="true"
          className="hidden"
        />
        <div className="site-shell relative z-10">
          <Reveal direction="up" delay={0} duration={0.8}>
            <div className="mb-8 flex flex-col items-center gap-3 text-center lg:mb-10">
              <SectionEyebrow className="justify-center text-[0.78rem] tracking-[0.14em] text-[var(--showroom-text)]">
                VISIT THE SHOWROOM
              </SectionEyebrow>
              <h2 className="max-w-[14ch] text-[2.4rem] font-black uppercase leading-[0.88] tracking-[-0.055em] text-[var(--showroom-text)] sm:text-[3.1rem] md:text-[3.6rem] lg:text-[3.9rem] xl:text-[4.25rem]">
                Come See The Products In Person
              </h2>
            </div>
          </Reveal>

          <div className="grid items-stretch gap-8 pt-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-12 lg:pt-8 xl:gap-14">
            <Reveal direction="up" delay={0.08} duration={0.85} distance={30} className="h-full">
              <div data-showroom-contact-card className="relative h-full overflow-hidden border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] p-5 shadow-[0_24px_80px_var(--showroom-shadow)] backdrop-blur-sm sm:p-6 lg:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--showroom-text)] to-transparent opacity-[0.35]"
                />

                <div className="flex h-full flex-col gap-6">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--showroom-soft)]">
                        CVR Showroom
                      </p>
                      <h3 className="mt-3 max-w-[10ch] text-[2rem] font-black uppercase leading-[0.9] tracking-[-0.055em] text-[var(--showroom-text)] sm:text-[2.55rem] lg:text-[2.8rem]">
                        Kitchen & Bath Showroom
                      </h3>
                    </div>
                    <span className="border border-[color:var(--showroom-line)] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
                      Victoria
                    </span>
                  </div>

                  <div className="grid gap-3 border-y border-[color:var(--showroom-line)] py-5">
                    <a
                      href={showroom.mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid gap-1 text-white transition-opacity hover:opacity-75"
                    >
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
                        Visit
                      </span>
                      <span className="text-[1.08rem] leading-7 text-[var(--showroom-muted)]">
                        {showroom.addressLine1}
                        <br />
                        {showroom.cityRegionPostal}
                      </span>
                    </a>
                  </div>

                  <div className="grid gap-2">
                    <a
                      href={showroom.phoneHref}
                      className="group flex items-center justify-between gap-4 border border-[color:var(--showroom-line)] px-4 py-3.5 transition-colors hover:border-[color:var(--showroom-inverse)] hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)]"
                    >
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)] transition-colors group-hover:text-[var(--showroom-inverse-text)] group-hover:opacity-[0.55]">
                        Call
                      </span>
                      <span className="text-right text-[1rem] font-black uppercase tracking-[-0.025em] sm:text-[1.1rem]">
                        {showroom.phone}
                      </span>
                    </a>
                    <a
                      href={showroom.emailHref}
                      className="group flex flex-col items-start gap-2 border border-[color:var(--showroom-line)] px-4 py-3.5 transition-colors hover:border-[color:var(--showroom-inverse)] hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)] transition-colors group-hover:text-[var(--showroom-inverse-text)] group-hover:opacity-[0.55]">
                        Email
                      </span>
                      <span className="break-all text-[0.84rem] font-black uppercase tracking-[0.08em] sm:text-right">
                        {showroom.email}
                      </span>
                    </a>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border border-[color:var(--showroom-line)] bg-[color:var(--showroom-grid)] p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
                      Follow The Showroom
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {showroomSocialLinks.map((link) => (
                        <SocialIconLink
                          key={link.label}
                          href={link.href}
                          label={link.label}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 w-11 items-center justify-center border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] text-[var(--showroom-text)] transition-colors hover:border-[color:var(--showroom-inverse)] hover:bg-[var(--showroom-inverse)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--showroom-inverse)]"
                          iconClassName="h-4.5 w-4.5"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3">
                    <a
                      href={showroom.mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-14 items-center justify-center gap-2 border border-[color:var(--showroom-line)] px-4 text-[0.62rem] font-semibold uppercase tracking-widest text-[var(--showroom-text)] transition-colors hover:border-[color:var(--showroom-inverse)] hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)]"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
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
                      Directions
                    </a>
                    <a
                      href={showroom.phoneHref}
                      className="inline-flex h-14 items-center justify-center gap-2 border border-[color:var(--showroom-inverse)] bg-[var(--showroom-inverse)] px-4 text-[0.62rem] font-bold uppercase tracking-widest text-[var(--showroom-inverse-text)] transition-opacity hover:opacity-[0.82]"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Call
                    </a>
                    <a
                      href={showroom.emailHref}
                      className="inline-flex h-14 items-center justify-center gap-2 border border-[color:var(--showroom-line)] px-4 text-[0.62rem] font-semibold uppercase tracking-widest text-[var(--showroom-text)] transition-colors hover:border-[color:var(--showroom-inverse)] hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)]"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <rect
                          x="2"
                          y="4"
                          width="20"
                          height="16"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.16} duration={0.85} distance={30} className="h-full">
              <div data-showroom-contact-map className="relative h-full min-h-[24rem] overflow-hidden border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] md:min-h-[26rem] lg:min-h-[28rem] xl:min-h-[30rem]">
                <iframe
                  title="CVR Showroom map"
                  src="https://www.google.com/maps?q=1057%20Fort%20St%2C%20Victoria%2C%20BC%20V8V%203K5&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full dark:contrast-[1.18] dark:saturate-[1.35] dark:brightness-[0.82] dark:invert dark:hue-rotate-180"
                />
                <div className="hidden" />
                <div className="absolute left-4 top-4 border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] px-4 py-3 shadow-[0_16px_40px_var(--showroom-shadow)] backdrop-blur-md md:left-5 md:top-5">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--showroom-soft)]">
                    Map
                  </p>
                  <p className="mt-1 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[var(--showroom-text)]">
                    Fort St, Victoria
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 text-black dark:bg-[#0f0f0e] dark:text-white md:py-20 lg:py-24">
      <div className="site-shell">
        <Reveal direction="up" delay={0} duration={0.8}>
          <div className="mb-10 flex flex-col items-center gap-4 text-center lg:mb-14">
            <SectionEyebrow className="justify-center text-[0.78rem] tracking-[0.14em] text-black dark:text-white">
              VISIT THE SHOWROOM
            </SectionEyebrow>
            <h2 className="max-w-[14ch] text-[2.4rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem]">
              Come See The Products In Person
            </h2>
          </div>
        </Reveal>

        <div className={`grid gap-4 ${showroomOnly ? "mx-auto max-w-[62rem]" : "sm:grid-cols-2"}`}>
          {visibleContacts.map((contact, index) => (
            <Reveal
              key={contact.eyebrow}
              direction="up"
              delay={0.08 + index * 0.1}
              duration={0.85}
              distance={30}
            >
              <div className="flex h-full flex-col gap-8 border border-black/12 p-6 dark:border-white/12 md:p-8 lg:p-10">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/48 dark:text-[var(--showroom-soft)]">
                    {contact.eyebrow}
                  </span>
                  <span className="text-[0.82rem] font-medium leading-[1.3] tracking-[-0.01em] text-black/70 dark:text-white/70">
                    {contact.sublabel}
                  </span>
                  <a
                    href={contact.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit text-[0.82rem] font-medium leading-[1.45] tracking-[-0.01em] text-black/72 transition-opacity hover:opacity-60 dark:text-white/72"
                  >
                    <span className="block">{contact.addressLine1}</span>
                    <span className="block">{contact.cityRegionPostal}</span>
                  </a>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={contact.phoneHref}
                    className="text-[1.6rem] font-black uppercase leading-[1.02] tracking-[-0.04em] transition-opacity hover:opacity-60 md:text-[2rem] lg:text-[2.2rem]"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={contact.emailHref}
                    className="break-all text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-black/60 transition-opacity hover:opacity-60 dark:text-white/60"
                  >
                    {contact.email}
                  </a>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  <a
                    href={contact.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-none border border-black/15 px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-widest text-black transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
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
                    Get Directions
                  </a>
                  <a
                    href={contact.phoneHref}
                    className="inline-flex items-center gap-2 rounded-none bg-black px-5 py-3 text-[0.68rem] font-bold uppercase tracking-widest text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Call Now
                  </a>
                  {contact.whatsapp ? (
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-none border border-black/15 px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-widest text-black transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      WhatsApp
                    </a>
                  ) : null}
                  <a
                    href={contact.emailHref}
                    className="inline-flex items-center gap-2 rounded-none border border-black/15 px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-widest text-black transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="2"
                        y="4"
                        width="20"
                        height="16"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Email
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
