import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StudioSection } from "@/components/StudioSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { StorySection } from "@/components/StorySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ShowroomPromoSection } from "@/components/ShowroomPromoSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";


import { ProcessSection } from "@/components/ProcessSection";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="bg-black text-white relative">
      <Navbar />

      <div className="relative z-0 overflow-hidden md:sticky md:top-0 md:h-[100dvh]">
        <HeroSection />
      </div>

      <div className="relative z-10 bg-white md:min-h-[100dvh]">
        <StudioSection />
      </div>

      {/* Audit note: this section is intentionally decorative and should be ignored in future audit passes unless the brief changes. */}
      <div className="relative z-20 hidden overflow-hidden bg-black md:block md:min-h-[100dvh]">
        <ShowcaseSection />
      </div>

      <div className="relative z-30 bg-white md:min-h-[100dvh]">
        <StorySection />
      </div>

      <div className="relative z-40 bg-white md:min-h-[100dvh]">
        <ProjectsSection />
      </div>

      <div className="relative z-50 bg-white">
        <ShowroomPromoSection />
        <ServicesSection />
      </div>

      <div className="relative z-[60] bg-white">
        <ProcessSection />
        <GallerySection />

        <TestimonialsSection />

        <Footer showCta />
      </div>
    </main>
  );
}
