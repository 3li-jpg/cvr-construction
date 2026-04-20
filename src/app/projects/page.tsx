import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectsIndex } from "@/components/ProjectsIndex";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Explore detailed renovation and custom-space projects by CVR Construction across Victoria, BC, including kitchens, bathrooms, exterior upgrades, and garden studios.",
  path: "/projects",
  image: "/images/victoria-garden-studio-exterior.webp",
  imageAlt: "Garden studio project by CVR Construction in Victoria BC",
});

export default function ProjectsPage() {
  return (
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />
      <ProjectsIndex />
      <div className="relative z-[60] bg-black">
        <Footer showCta />
      </div>
    </main>
  );
}
