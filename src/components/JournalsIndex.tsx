"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PageIntro } from "@/components/PageIntro";
import { proseBodyClassName } from "@/lib/prose";
import { journalPosts, journalsHero, type JournalEntry } from "@/lib/site-data";

const sectionEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: sectionEase, delay: i * 0.08 },
  }),
};

function JournalRow({
  post,
  index,
}: {
  post: JournalEntry;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={rowVariants}
      className="group relative border-b border-black/10 first:border-t"
    >
      <Link
        href={`/journals/${post.slug}`}
        data-analytics-event="journal_card_clicked"
        data-analytics-label={post.slug}
        data-analytics-location="journals-index"
        className="grid grid-cols-[2.5rem_1fr] items-start gap-4 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8 sm:py-8 md:py-10 lg:py-12"
      >
        <span className="pt-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-black/40 sm:pt-0 sm:text-[0.82rem]">
          {numberLabel} /
        </span>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex flex-col gap-2 sm:flex-1">
            <h2 className="text-[2.1rem] font-black uppercase leading-[0.95] tracking-[-0.05em] transition-all duration-500 ease-out group-hover:translate-x-1 sm:text-[2.8rem] md:text-[3.6rem] lg:text-[4.2rem] xl:text-[4.6rem]">
              {post.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/50 sm:hidden">
              <time dateTime={post.publishedAt}>{post.date}</time>
              <span aria-hidden="true">•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div
            className={`relative block aspect-[4/5] w-[12rem] shrink-0 overflow-hidden bg-black transition-all duration-[700ms] ease-out sm:aspect-[3/4] sm:w-[8rem] sm:scale-95 sm:opacity-0 ${
              prefersReducedMotion
                ? ""
                : "sm:group-hover:w-[14rem] sm:group-hover:scale-100 sm:group-hover:opacity-100 md:group-hover:w-[16rem] lg:group-hover:w-[18rem]"
            }`}
          >
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              quality={90}
              sizes="(max-width: 639px) 192px, (max-width: 1023px) 14rem, 18rem"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <div className="hidden items-center gap-8 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-black/55 sm:flex">
          <time dateTime={post.publishedAt} className="whitespace-nowrap">
            {post.date}
          </time>
          <span
            aria-hidden="true"
            className="text-black/45 transition-transform duration-500 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function JournalsIndex() {
  return (
    <>
      <PageIntro
        eyebrow="Journals / Client Guidance"
        title={"Insight Beyond The Build"}
        scrollTargetId="journals"
        backgroundImage={journalsHero}
      />

      <section
        id="journals"
        aria-labelledby="journals-list-heading"
        className="site-shell px-6 pb-24 pt-14 sm:px-8 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pb-32 lg:pt-20"
      >
        <h2 id="journals-list-heading" className="sr-only">
          Latest journals
        </h2>

        <div className="mb-10 border-t border-black/10 pt-10 md:mb-14">
          <p className={`max-w-[34rem] ${proseBodyClassName}`}>
            Written to help clients make better renovation decisions before the site work begins. Calmer scopes, cleaner finishes, fewer avoidable mistakes.
          </p>
        </div>

        <div className="flex flex-col">
          {journalPosts.map((post, index) => (
            <JournalRow key={post.slug} post={post} index={index} />
          ))}
        </div>

      </section>
    </>
  );
}
