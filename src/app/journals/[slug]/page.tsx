import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Navbar } from "@/components/Navbar";
import { buildPageMetadata } from "@/lib/metadata";
import { getJournalPostBySlug, journalPosts } from "@/lib/site-data";

type JournalDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return journalPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: JournalDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) {
    return {
      title: "Journal Not Found",
    };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/journals/${post.slug}`,
    image: post.heroImage,
    imageAlt: `${post.title} by CVR Construction`,
    imageHeight: 1020,
    openGraphType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
  });
}

export default async function JournalDetailPage({
  params,
}: JournalDetailPageProps) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const pageUrl = `https://www.cvrconstruction.ca/journals/${post.slug}`;
  const relatedPosts = journalPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.cvrconstruction.ca/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journals",
        item: "https://www.cvrconstruction.ca/journals",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    mainEntityOfPage: pageUrl,
    headline: post.title,
    description: post.description,
    image: `https://www.cvrconstruction.ca${post.heroImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "CVR Construction",
    },
    publisher: {
      "@type": "Organization",
      name: "CVR Construction",
      logo: {
        "@type": "ImageObject",
        url: "https://www.cvrconstruction.ca/images/2024-01-13.webp",
      },
    },
  };

  return (
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />
      <Script
        id={`journal-schema-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, articleSchema]),
        }}
      />

      <article className="px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-10">
          <div className="flex flex-col gap-5">
            <Link
              href="/journals"
              className="w-fit text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/54 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
            >
              ← Back To Journals
            </Link>

            <div className="max-w-4xl">
              <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Journal / Advice For Renovation Clients
              </p>
              <h1 className="text-[3rem] font-black uppercase leading-[0.9] tracking-[-0.055em] sm:text-[4rem] md:text-[5rem] lg:text-[5.8rem]">
                {post.title}
              </h1>
            </div>

            <div className="flex flex-col gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48 sm:flex-row sm:items-center sm:gap-4">
              <time dateTime={post.publishedAt}>{post.date}</time>
              <span aria-hidden="true">•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div className="relative aspect-[1.45/1] overflow-hidden bg-black">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 1280px"
              className="object-cover"
            />
          </div>

	          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
	            <div>
	              <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
	                Summary
              </p>
	              <p className="text-[1rem] leading-7 text-black/72 sm:text-[1.08rem]">
	                {post.excerpt}
	              </p>

                {post.keyTakeaways.length > 0 ? (
                  <div className="mt-8 border border-black/10 bg-black/[0.02] p-5">
                    <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                      Key Takeaways
                    </p>
                    <ul className="space-y-3 text-[0.96rem] leading-7 text-black/70">
                      {post.keyTakeaways.map((takeaway) => (
                        <li key={takeaway} className="flex gap-3">
                          <span className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
	            </div>

	            <div className="space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="mb-4 text-[1.4rem] font-black uppercase tracking-[-0.04em] sm:text-[1.7rem]">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-[1rem] leading-7 text-black/72">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
	            </div>
	          </div>

          {relatedPosts.length > 0 ? (
            <div className="border-t border-black/10 pt-10">
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                    Related Journals
                  </p>
                  <h2 className="text-[2.1rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[2.8rem]">
                    Keep Reading
                  </h2>
                </div>
                <p className="max-w-xl text-[0.95rem] leading-7 text-black/68">
                  These articles are written to reduce planning mistakes before a renovation gets expensive.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/journals/${relatedPost.slug}`}
                    data-analytics-event="related_journal_clicked"
                    data-analytics-label={relatedPost.slug}
                    data-analytics-location="journal-detail"
                    className="group grid gap-5 border border-black/10 p-5 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:grid-cols-[11rem_minmax(0,1fr)]"
                  >
                    <div className="relative aspect-[1/1] overflow-hidden bg-black/5">
                      <Image
                        src={relatedPost.heroImage}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 639px) 100vw, 176px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[1.35rem] font-black uppercase leading-[0.95] tracking-[-0.045em]">
                          {relatedPost.title}
                        </h3>
                        <div className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48 sm:flex-row sm:items-center sm:gap-3">
                          <time dateTime={relatedPost.publishedAt}>{relatedPost.date}</time>
                          <span aria-hidden="true">•</span>
                          <span>{relatedPost.readingTime}</span>
                        </div>
                      </div>
                      <p className="text-[0.96rem] leading-7 text-black/68">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

	          <div className="flex flex-col gap-5 border-t border-black/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
	            <div>
              <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Planning A Project?
              </p>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-black/68">
                If you are preparing for a renovation in Victoria, we can help shape the scope, timeline, and finish standard before the work begins.
              </p>
            </div>

	            <InteractiveHoverButton
	              href="/contact"
                data-analytics-event="journal_detail_contact_clicked"
                data-analytics-label={post.slug}
                data-analytics-location="journal-detail"
	              className="w-fit"
	            >
              Start A Conversation
            </InteractiveHoverButton>
          </div>
        </div>
      </article>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
