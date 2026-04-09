import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Navbar } from "@/components/Navbar";
import { RouteIntro } from "@/components/RouteIntro";
import { buildPageMetadata } from "@/lib/metadata";
import { processSteps, projects } from "@/lib/site-data";

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

      <section className="px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-[1600px]">
          <RouteIntro
            eyebrow="Projects / Built Work"
            title={
              <>
                Work That
                <br />
                Holds Up
              </>
            }
            titleClassName="max-w-[12ch] text-balance text-[3.1rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:max-w-[11ch] sm:text-[4.4rem] md:max-w-[10ch] md:text-[5.6rem] lg:max-w-none lg:text-[6.8rem]"
            description="This page is structured as proof, not filler. Each featured project shows the kind of finish quality, coordination, and decision-making that clients should expect from a premium renovation partner."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                data-analytics-event="project_card_clicked"
                data-analytics-label={project.slug}
                data-analytics-location="projects-index"
                className="group flex flex-col overflow-hidden border border-black/10 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
              >
                <div className="relative aspect-[0.95/1] overflow-hidden bg-black">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    quality={90}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                        {project.category}
                      </p>
                      <h2 className="text-[1.35rem] font-black uppercase leading-[0.95] tracking-[-0.04em]">
                        {project.title}
                      </h2>
                    </div>
                    <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-[0.96rem] leading-7 text-black/68">
                    {project.summary}
                  </p>
                  <span className="mt-auto text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                    View Project →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 border-t border-black/10 pt-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
              <div>
                <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                  How Projects Move
                </p>
                <h2 className="max-w-[12ch] text-[2.4rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[3rem] md:text-[3.6rem]">
                  Disciplined From Scope To Handover
                </h2>
              </div>

              <div className="divide-y divide-black/10 border-t border-black/10">
                {processSteps.map((step) => (
                  <div
                    key={step.num}
                    className="grid gap-4 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                      {step.num}
                    </p>
                    <div className="max-w-[46rem]">
                      <h3 className="mb-3 text-[1.15rem] font-black uppercase tracking-[-0.04em]">
                        {step.title}
                      </h3>
                      <p className="text-[0.95rem] leading-7 text-black/68">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-black/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Ready To Start
              </p>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-black/68">
                If you are planning a kitchen, bathroom, custom space, or upgrade in Victoria, we can help shape the scope before the site work begins.
              </p>
            </div>
            <InteractiveHoverButton
              href="/contact"
              data-analytics-event="projects_contact_clicked"
              data-analytics-label="start-your-project"
              data-analytics-location="projects-index"
              className="w-fit"
            >
              Start Your Project
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
