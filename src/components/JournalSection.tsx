 "use client";

import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { TextAnimate } from "@/components/TextAnimate";
import { journalPosts } from "@/lib/site-data";

export function JournalSection() {
  const journalHeadingClassName =
    "text-[2.9rem] sm:text-[3.7rem] md:text-[4.45rem] lg:text-[5rem] xl:text-[5.45rem] font-black tracking-[-0.045em] uppercase leading-[0.9]";

  return (
    <section className="w-full bg-white py-20 text-black dark:bg-[#0f0f0e] dark:text-white md:py-24">
      <div className="site-shell">
        <div className="mb-14 flex flex-col items-center gap-6 text-center lg:mb-16">
          <div className="flex flex-col items-center text-center">
            <Reveal direction="up" delay={0} duration={0.8}>
              <SectionEyebrow className="mb-5 justify-center text-[0.78rem] tracking-[0.14em] text-black dark:text-white">
                JOURNALS
              </SectionEyebrow>
            </Reveal>
            <Reveal direction="up" delay={0.15} duration={1} distance={80}>
              <TextAnimate
                as="h2"
                by="line"
                animation="blurInUp"
                once
                duration={0.7}
                className={journalHeadingClassName}
                segmentClassName="block"
              >
                {"BEYOND THE\nBLUEPRINT"}
              </TextAnimate>
            </Reveal>
          </div>
          <Reveal direction="up" delay={0.25} duration={0.8}>
            <InteractiveHoverButton
              href="/journals"
              variant="light"
              className="border-black/15 dark:border-white/12"
            >
              VIEW ALL JOURNALS
            </InteractiveHoverButton>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {journalPosts.map((post, i) => (
            <Reveal key={post.slug} direction="up" delay={0.1 + i * 0.12} duration={1} distance={70}>
              <Link
                href={`/journals/${post.slug}`}
                className="group flex flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-white dark:bg-[#131311]">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    quality={90}
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[72%] text-[0.9rem] font-bold uppercase tracking-[0.08em] md:text-[1rem]">
                    {post.title}
                  </h3>
                  <time
                    dateTime={post.publishedAt}
                    className="whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.12em] text-black/50 dark:text-white/48"
                  >
                    {post.date}
                  </time>
                </div>
                <p className="text-[0.92rem] leading-relaxed text-black/60 dark:text-white/60">
                  {post.excerpt}
                </p>
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48 dark:text-white/46">
                  {post.readingTime}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
