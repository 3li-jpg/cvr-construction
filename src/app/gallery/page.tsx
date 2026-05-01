import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GalleryLightboxGrid } from "@/components/GalleryLightboxGrid";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { buildPageMetadata } from "@/lib/metadata";
import { projectProseClassName } from "@/lib/prose";
import { galleryHero, galleryItems } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery",
  description:
    "Browse the CVR Construction image gallery featuring kitchens, bathrooms, custom spaces, and exterior upgrades from projects across Victoria, BC.",
  path: "/gallery",
  image: galleryItems[0]?.image ?? "/images/victoria-garden-studio-exterior.webp",
  imageAlt: "Project gallery by CVR Construction in Victoria BC",
});

export default function GalleryPage() {
  return (
    <main id="main-content" className="relative bg-background text-foreground">
      <Navbar />

      <PageIntro
        eyebrow="Gallery / Project Photography"
        title={"Design In Focus"}
        scrollTargetId="gallery"
        backgroundImage={galleryHero}
      />

      <section
        id="gallery"
        aria-labelledby="gallery-grid-heading"
        className="site-shell px-6 pb-16 pt-16 sm:px-8 md:px-12 md:pb-20 md:pt-20 lg:px-20 lg:pb-24 lg:pt-24"
      >
        <section
          aria-labelledby="gallery-grid-heading"
          className="relative left-1/2 w-screen -translate-x-1/2 border-t border-border px-5 pt-10 sm:px-8 lg:px-10"
        >
          <Reveal className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-10">
            <div>
              <SectionEyebrow className="mb-2 project-kicker">
                Gallery Index
              </SectionEyebrow>
              <h2 id="gallery-grid-heading" className="text-[3.2rem] font-black uppercase leading-[0.88] tracking-[-0.03em] text-foreground sm:text-[4.2rem] md:text-[5rem] lg:text-[5.8rem] xl:text-[6.4rem]">
                Built Details
              </h2>
            </div>

            <div className="flex flex-col gap-2 sm:items-end sm:text-right">
              <span className="project-kicker">
                {String(galleryItems.length).padStart(2, "0")} Images
              </span>
              <p className={`max-w-[34rem] ${projectProseClassName}`}>
                A visual proof layer across kitchens, bathrooms, custom spaces, and exterior upgrades. Click any image to open the full-resolution view.
              </p>
            </div>
          </Reveal>

          <GalleryLightboxGrid priorityCount={1} variant="reference" />
        </section>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer showCta />
      </div>
    </main>
  );
}
