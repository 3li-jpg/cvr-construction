import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { JournalsIndex } from "@/components/JournalsIndex";
import { Navbar } from "@/components/Navbar";
import { buildPageMetadata } from "@/lib/metadata";

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
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />
      <JournalsIndex />
      <div className="relative z-[60] bg-black">
        <Footer showCta />
      </div>
    </main>
  );
}
