import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Navbar } from "@/components/Navbar";
import { RouteIntro } from "@/components/RouteIntro";
import { buildPageMetadata } from "@/lib/metadata";
import { galleryItems } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery",
  description:
    "Browse the CVR Construction image gallery featuring kitchens, bathrooms, custom spaces, and exterior upgrades from projects across Victoria, BC.",
  path: "/gallery",
  image: galleryItems[0]?.image ?? "/images/2024-01-13.webp",
  imageAlt: "Project gallery by CVR Construction in Victoria BC",
});

export default function GalleryPage() {
  return (
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />

      <section className="px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-[1600px]">
          <RouteIntro
            eyebrow="Gallery / Project Photography"
            title={
              <>
                A Closer Look
                <br />
                At The Finish
              </>
            }
            titleClassName="max-w-[10ch] text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-[4.2rem] md:text-[5.4rem] lg:max-w-none lg:text-[6.4rem]"
            description="This gallery is built as a visual proof layer. It shows the kinds of rooms, details, and final conditions that shape how our work is judged once the project is complete."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
            {galleryItems.map((item, index) => {
              const isLarge = index % 5 === 0 || index % 5 === 3;

              return (
                <figure
                  key={item.image}
                  className={`group overflow-hidden border border-black/10 bg-white ${
                    isLarge
                      ? "xl:col-span-7"
                      : "xl:col-span-5"
                  }`}
                >
                  <div className={`relative overflow-hidden bg-black ${isLarge ? "aspect-[1.35/1]" : "aspect-[0.92/1]"}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                        {item.category}
                      </p>
                      <p className="text-[0.96rem] font-semibold tracking-[-0.02em] text-black">
                        {item.title}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-black/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Want To See The Full Scope
              </p>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-black/68">
                The gallery shows the finish. The project pages explain the thinking, the scope, and the kind of result clients can expect.
              </p>
            </div>
            <InteractiveHoverButton
              href="/projects"
              className="w-fit"
            >
              View Projects
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
