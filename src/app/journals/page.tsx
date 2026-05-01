import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { SoroBlogEmbed } from "@/components/SoroBlogEmbed";
import { buildPageMetadata } from "@/lib/metadata";
import { proseBodyClassName } from "@/lib/prose";
import { journalsHero } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Journals",
  description:
    "Editorial and planning insights from CVR Construction for homeowners considering premium renovations, custom spaces, and trades coordination in Victoria, BC.",
  path: "/journals",
  image: "/images/victoria-premium-kitchen-interior.webp",
  imageAlt: "Premium kitchen renovation in Victoria BC",
});

export default function JournalsPage() {
  return (
    <main id="main-content" className="relative bg-background text-foreground">
      <Navbar />

      <PageIntro
        eyebrow="Journals / Client Guidance"
        title={"Insight Beyond The Build"}
        scrollTargetId="journals"
        backgroundImage={journalsHero}
      />

      <section
        id="journals"
        aria-labelledby="journals-embed-heading"
        className="site-shell px-6 pb-16 pt-14 sm:px-8 md:px-12 md:pb-20 md:pt-16 lg:px-20 lg:pb-24 lg:pt-20"
      >
        <h2 id="journals-embed-heading" className="sr-only">
          Latest journals
        </h2>

        <div className="mb-10 border-t border-border pt-10 md:mb-14">
          <p className={`max-w-[34rem] ${proseBodyClassName}`}>
            Written to help clients make better renovation decisions before the site work begins. Calmer scopes, cleaner finishes, fewer avoidable mistakes.
          </p>
        </div>

        <SoroBlogEmbed />
      </section>

      <div className="relative z-[60] bg-black">
        <Footer showCta />
      </div>
    </main>
  );
}
