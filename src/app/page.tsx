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

      <div className="relative z-0 overflow-hidden lg:sticky lg:top-0 lg:h-[100dvh]">
        <HeroSection />
      </div>

      <div className="relative z-10 min-h-[100svh] bg-white md:min-h-[100dvh]">
        <StudioSection />
      </div>

      <div className="relative z-20 overflow-hidden bg-black">
        <ShowcaseSection />
      </div>

      <div className="relative z-30 flex min-h-[78svh] flex-col justify-center bg-white md:min-h-[82dvh]">
        <StorySection />
      </div>

      <div className="relative z-40 min-h-[100svh] bg-white md:min-h-[100dvh]">
        <ProjectsSection />
      </div>

      <div className="relative z-50 min-h-[100svh] bg-white md:min-h-[100dvh]">
        <ServicesSection />
      </div>

      <div className="relative z-[60] bg-white">
        <ProcessSection />
        <GallerySection />
        <JournalSection />
        <Footer showCta />
      </div>
    </main>
  );
}
