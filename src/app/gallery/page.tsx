import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GalleryLightboxGrid } from "@/components/GalleryLightboxGrid";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { buildPageMetadata } from "@/lib/metadata";
import { proseBodyClassName } from "@/lib/prose";
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
    <main id="main-content" className="relative bg-white text-black">
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
        className="site-shell px-6 pb-24 pt-10 sm:px-8 md:px-12 md:pb-28 md:pt-14 lg:px-20 lg:pb-32 lg:pt-16"
      >
        <h2 id="gallery-grid-heading" className="sr-only">
          Visual gallery
        </h2>

        <div className="mb-10 flex flex-col gap-6 border-t border-black/10 pt-10 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <div className="flex flex-col gap-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-black/48">
            <span>Gallery Index</span>
            <span className="text-black">
              {String(galleryItems.length).padStart(2, "0")} Selected Images
            </span>
          </div>
          <p className={`max-w-[34rem] ${proseBodyClassName}`}>
            A visual proof layer across kitchens, bathrooms, custom spaces, and exterior upgrades. Click any image to open the full-resolution view.
          </p>
        </div>

        <GalleryLightboxGrid />
      </section>

      <div className="relative z-[60] bg-black">
        <Footer showCta />
      </div>
    </main>
  );
}
