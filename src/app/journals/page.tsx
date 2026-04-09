import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Navbar } from "@/components/Navbar";
import { RouteIntro } from "@/components/RouteIntro";
import { buildPageMetadata } from "@/lib/metadata";
import { journalPosts } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Journals",
  description:
    "Read project-planning and renovation insights from CVR Construction, including guidance on kitchens, bathrooms, contractor selection, and premium finish quality.",
  path: "/journals",
  image: journalPosts[0]?.heroImage ?? "/images/victoria-garden-studio-exterior.webp",
  imageAlt: "Renovation planning journal by CVR Construction",
});

export default function JournalsPage() {
  const [featuredPost, ...remainingPosts] = journalPosts;

  if (!featuredPost) {
    return (
      <main id="main-content" className="relative bg-white text-black">
        <Navbar />
        <section className="px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
          <div className="mx-auto max-w-[900px]">
            <p className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
              Journals / Client Guidance
            </p>
            <h1 className="max-w-[12ch] text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-[4.2rem] md:text-[5.2rem]">
              Insights Are Coming Soon
            </h1>
          </div>
        </section>
        <div className="relative z-[60] bg-black">
          <Footer />
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />

      <section className="px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-[1480px]">
          <RouteIntro
            eyebrow="Journals / Client Guidance"
            title={
              <>
                Insight Beyond
                <br />
                The Build
              </>
            }
            titleClassName="max-w-[10ch] text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-[4.2rem] md:text-[5.2rem] lg:max-w-none lg:text-[6.3rem]"
            description="These articles are here to help clients make better renovation decisions before work begins. They are written to improve clarity, reduce avoidable mistakes, and explain what quality really looks like on site."
          />

          <div className="mt-14 grid gap-8 border border-black/10 bg-black/[0.02] p-5 sm:p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.85fr)] lg:p-8">
            <div className="relative aspect-[1.25/1] overflow-hidden bg-black">
              <Image
                src={featuredPost.heroImage}
                alt={featuredPost.title}
                fill
                priority
                quality={90}
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                  Featured Journal
                </p>
                <h2 className="max-w-[14ch] text-[2rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[2.5rem] lg:text-[3rem]">
                  {featuredPost.title}
                </h2>
              </div>

              <p className="text-[0.98rem] leading-7 text-black/70">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-col gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48 sm:flex-row sm:items-center sm:justify-between">
                <time dateTime={featuredPost.publishedAt}>{featuredPost.date}</time>
                <span>{featuredPost.readingTime}</span>
              </div>

              <InteractiveHoverButton
                href={`/journals/${featuredPost.slug}`}
                data-analytics-event="journal_card_clicked"
                data-analytics-label={featuredPost.slug}
                data-analytics-location="journals-index"
                className="w-fit"
              >
                Read Article
              </InteractiveHoverButton>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/journals/${post.slug}`}
                data-analytics-event="journal_card_clicked"
                data-analytics-label={post.slug}
                data-analytics-location="journals-index"
                className="grid gap-5 border border-black/10 p-5 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:grid-cols-[11rem_minmax(0,1fr)]"
              >
                <div className="relative aspect-[1/1] overflow-hidden bg-black">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    quality={90}
                    sizes="(max-width: 639px) 100vw, 176px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[1.45rem] font-black uppercase leading-[0.95] tracking-[-0.045em]">
                      {post.title}
                    </h2>
                    <div className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48 sm:flex-row sm:items-center sm:gap-3">
                      <time dateTime={post.publishedAt}>{post.date}</time>
                      <span aria-hidden="true">•</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <p className="text-[0.96rem] leading-7 text-black/68">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
