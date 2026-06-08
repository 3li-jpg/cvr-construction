import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectsIndex } from "@/components/ProjectsIndex";
import { buildPageMetadata } from "@/lib/metadata";
import { projects, type ProjectEntry } from "@/lib/site-data";

const bathroomProjectSlugs = [
  "luxury-bathroom-remodel",
  "modern-bath-and-laundry-suite",
  "framed-bathroom-renovation",
  "dark-gray-kitchen-and-bath",
] as const;

const bathroomProjects = bathroomProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is ProjectEntry => Boolean(project));

export const metadata: Metadata = buildPageMetadata({
  title: "Bathroom Remodeling Projects",
  description:
    "Explore bathroom remodeling and bathroom renovation projects by CVR Construction in Victoria, BC, including full remodels, fixture updates, tile work, and kitchen-and-bath transformations.",
  path: "/projects/bathroom-remodeling",
  image: "/images/victoria-luxury-bathroom-renovation.webp",
  imageAlt: "Bathroom remodeling project by CVR Construction in Victoria BC",
});

export default function BathroomRemodelingProjectsPage() {
  return (
    <main id="main-content" className="relative bg-background text-foreground">
      <Navbar />
      <ProjectsIndex
        projects={bathroomProjects}
        eyebrow="Projects / Bathroom Remodeling"
        title="Bathroom Remodeling Projects"
        description="Explore bathroom remodeling work across Victoria, from full bathroom renovations and tile details to coordinated kitchen-and-bath transformations."
        listHeading="Bathroom remodeling projects"
        analyticsLocation="bathroom-remodeling-projects"
        backgroundImage={{
          src: "/images/victoria-luxury-bathroom-renovation.webp",
          alt: "Bathroom remodeling project by CVR Construction in Victoria BC",
        }}
      />
      <div className="relative z-[60] bg-black">
        <Footer showCta />
      </div>
    </main>
  );
}
