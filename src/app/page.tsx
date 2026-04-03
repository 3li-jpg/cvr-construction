import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StudioSection } from "@/components/StudioSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { StorySection } from "@/components/StorySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { GallerySection } from "@/components/GallerySection";
import { JournalSection } from "@/components/JournalSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="bg-black text-white relative">
      <Navbar />
      
      {/* Background Parallax Layer 1 */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <HeroSection />
      </div>

      {/* Card 1 — Studio Section */}
      <div className="relative z-10 min-h-screen bg-white">
        <StudioSection />
      </div>

      {/* Background Parallax Layer 2 */}
      <div className="sticky top-0 h-screen w-full z-20">
        <ShowcaseSection />
      </div>

      {/* Card 2 — Story Section (white bg, side-by-side) */}
      <div className="relative z-30 bg-white min-h-screen flex flex-col justify-center">
        <StorySection />
      </div>

      {/* Card 3 — Projects Section */}
      <div className="relative z-40 min-h-screen bg-white">
        <ProjectsSection />
      </div>

      {/* Card 4 — Services / What We Do */}
      <div className="relative z-50 min-h-screen bg-white">
        <ServicesSection />
      </div>

      {/* Card 5 — Process, Gallery, Journal, Footer (continuous scroll) */}
      <div className="relative z-[60] bg-white">
        <ProcessSection />
        <GallerySection />
        <JournalSection />
        <Footer showCta />
      </div>
    </main>
  );
}
