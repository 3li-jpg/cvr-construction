"use client";

import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
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
    sublabel: "Walk-In Showroom",
    addressLine1: showroomContact.addressLine1,
    cityRegionPostal: showroomContact.cityRegionPostal,
    phone: showroomContact.phone,
    phoneHref: showroomContact.phoneHref,
    email: showroomContact.email,
    emailHref: showroomContact.emailHref,
    mapsHref: showroomContact.mapsHref,
  },
];

export function ContactBlockSection() {
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

        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((contact, index) => (
            <Reveal
              key={contact.eyebrow}
              direction="up"
              delay={0.08 + index * 0.1}
              duration={0.85}
              distance={30}
            >
              <div className="flex h-full flex-col gap-8 border border-black/12 p-6 dark:border-white/12 md:p-8 lg:p-10">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/48 dark:text-white/48">
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
