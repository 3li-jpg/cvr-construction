import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Footer } from "@/components/Footer";
import { GalleryLightboxGrid } from "@/components/GalleryLightboxGrid";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { buildPageMetadata } from "@/lib/metadata";
import { projectProseClassName } from "@/lib/prose";
import { getProjectBySlug, projects } from "@/lib/site-data";

const projectDetailTitleClassName =
  "mx-auto max-w-[12ch] text-center text-balance text-[clamp(3rem,10vw,7.6rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-white";

const projectSectionHeadingClassName =
  "text-[3.2rem] font-black uppercase leading-[0.88] tracking-[-0.03em] text-foreground sm:text-[4.2rem] md:text-[5rem] lg:text-[5.8rem] xl:text-[6.4rem]";

const projectSideHeadingClassName =
  "max-w-[8ch] text-[clamp(3rem,8vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-foreground lg:text-[clamp(3.4rem,4vw,4.8rem)]";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return buildPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.heroImage,
    imageAlt: `${project.title} by CVR Construction`,
    imageHeight: 1020,
    modifiedTime: project.updatedAt,
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const pageUrl = `https://www.cvrconstruction.ca/projects/${project.slug}`;
  const relatedProjects = projects
    .filter((candidate) => candidate.slug !== project.slug)
    .sort(
      (left, right) =>
        Number(right.category === project.category) -
        Number(left.category === project.category)
    )
    .slice(0, 2);
  const projectGalleryImages = Array.from(
    new Set([project.heroImage, ...project.galleryImages])
  );
  const projectGalleryItems = projectGalleryImages.map((image, index) => ({
    image,
    alt: `${project.title} project image ${index + 1}`,
    category: project.category,
    title: `${project.title} / ${String(index + 1).padStart(2, "0")}`,
  }));
  const beforeAfterComparison = project.beforeAfterImages?.[0];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.cvrconstruction.ca/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://www.cvrconstruction.ca/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: pageUrl,
      },
    ],
  };
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#project`,
    name: project.title,
    headline: `${project.title} | CVR Construction`,
    abstract: project.summary,
    description: project.intro,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    dateModified: project.updatedAt,
    creator: {
      "@type": "Organization",
      name: "CVR Construction",
      url: "https://www.cvrconstruction.ca",
    },
    contentLocation: {
      "@type": "Place",
      name: project.location,
    },
    image: projectGalleryImages.map(
      (image) => `https://www.cvrconstruction.ca${image}`
    ),
    keywords: [project.category, project.location, ...project.scope],
    genre: "Construction project case study",
  };

  return (
    <main id="main-content" className="relative bg-background text-foreground">
      <Navbar />
      <Script
        id={`project-schema-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, projectSchema]),
        }}
      />

      <PageIntro
        eyebrow={`Projects / ${project.category}`}
        title={project.title}
        titleClassName={projectDetailTitleClassName}
        scrollTargetId="project-detail"
        backgroundImage={{
          src: project.heroImage,
          alt: `${project.title} by CVR Construction`,
        }}
      />

      <section
        id="project-detail"
        aria-labelledby="project-detail-heading"
        className="site-shell px-6 pb-16 pt-16 sm:px-8 md:px-12 md:pb-20 md:pt-20 lg:px-20 lg:pb-24 lg:pt-24"
      >
        <h2 id="project-detail-heading" className="sr-only">
          {project.title} — Project details
        </h2>

        <div className="flex flex-col gap-12">
          <Reveal className="flex flex-col gap-6">
            <Link
              href="/projects"
              className="w-fit text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              ← Back To Projects
            </Link>

            <div className="grid gap-3 border-t border-border pt-8 project-kicker sm:grid-cols-3 md:pt-10">
              <div>
                <p className="mb-2 text-muted-foreground/70">Year</p>
                <p className="text-foreground">{project.year}</p>
              </div>
              <div>
                <p className="mb-2 text-muted-foreground/70">Type</p>
                <p className="text-foreground">{project.category}</p>
              </div>
              <div>
                <p className="mb-2 text-muted-foreground/70">Location</p>
                <p className="text-foreground">{project.location}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-12">
            <div className="relative aspect-[1.28/1] overflow-hidden bg-muted">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                quality={90}
                sizes="(max-width: 1023px) 100vw, 65vw"
                className="object-cover"
              />
            </div>

            <div className="project-panel flex flex-col justify-between gap-8 p-6 sm:p-8">
              <div>
                <SectionEyebrow className="mb-3 project-kicker">
                  Project Overview
                </SectionEyebrow>
                <p className={projectProseClassName}>{project.intro}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h2 className="mb-3 project-kicker">
                    Scope
                  </h2>
                  <ul className="space-y-2 text-[0.96rem] leading-6 text-muted-foreground">
                    {project.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 project-kicker">
                    Highlights
                  </h2>
                  <ul className="space-y-2 text-[0.96rem] leading-6 text-muted-foreground">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="max-w-3xl border-t border-border pt-10">
            <SectionEyebrow className="mb-4 project-kicker">
              Outcome
            </SectionEyebrow>
            <p className={projectProseClassName}>{project.outcome}</p>
          </Reveal>

          {beforeAfterComparison ? (
            <section
              aria-labelledby="before-after-heading"
              className="border-t border-border pt-10"
            >
              <Reveal className="mb-8 flex flex-col gap-4 md:mb-10">
                <SectionEyebrow className="project-kicker">
                  Before / After
                </SectionEyebrow>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <h2 id="before-after-heading" className={projectSectionHeadingClassName}>
                    Transformation
                  </h2>
                  <p className={`max-w-[34rem] ${projectProseClassName}`}>
                    Slide through the existing condition and final result to see how the space changed.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <BeforeAfterSlider
                  comparison={beforeAfterComparison}
                  projectTitle={project.title}
                  priority
                />
              </Reveal>
            </section>
          ) : null}

          {projectGalleryItems.length > 0 ? (
            <section
              aria-labelledby="project-gallery-heading"
              className="relative left-1/2 w-screen -translate-x-1/2 border-t border-border px-5 pt-10 sm:px-8 lg:px-10"
            >
              <Reveal className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-10">
                <div>
                  <SectionEyebrow className="mb-2 project-kicker">
                    Project Gallery
                  </SectionEyebrow>
                  <h2 id="project-gallery-heading" className={projectSectionHeadingClassName}>
                    Built Details
                  </h2>
                </div>

                <div className="flex flex-col gap-2 sm:items-end sm:text-right">
                  <span className="project-kicker">
                    {String(projectGalleryItems.length).padStart(2, "0")} Images
                  </span>
                  <p className={`max-w-[34rem] ${projectProseClassName}`}>
                    Browse the full project sequence with the same lightbox view used in the main gallery.
                  </p>
                </div>
              </Reveal>

              <GalleryLightboxGrid
                items={projectGalleryItems}
                priorityCount={1}
                variant="reference"
              />
            </section>
          ) : null}

          {project.storySections.length > 0 ? (
            <Reveal className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[minmax(18rem,0.36fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <SectionEyebrow className="mb-4 project-kicker">
                  Project Notes
                </SectionEyebrow>
                <h2 className={projectSideHeadingClassName}>
                  Why This Project Works
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {project.storySections.map((section) => (
                  <section
                    key={section.heading}
                    className="project-panel p-6"
                  >
                    <h3 className="mb-3 text-[1.55rem] font-black uppercase leading-[0.9] tracking-[-0.035em] text-foreground">
                      {section.heading}
                    </h3>
                    <p className="text-[0.98rem] leading-7 text-muted-foreground">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </Reveal>
          ) : null}

          {relatedProjects.length > 0 ? (
            <Reveal className="border-t border-border pt-10">
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <SectionEyebrow className="mb-2 project-kicker">
                    Related Work
                  </SectionEyebrow>
                  <h2 className={projectSectionHeadingClassName}>
                    More Built Proof
                  </h2>
                </div>
                <p className={`max-w-xl ${projectProseClassName}`}>
                  Explore adjacent projects to understand how the same level of planning and finish shows up across different scopes.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    href={`/projects/${relatedProject.slug}`}
                    data-analytics-event="related_project_clicked"
                    data-analytics-label={relatedProject.slug}
                    data-analytics-location="project-detail"
                    className="group grid gap-6 border border-border bg-card p-5 text-card-foreground transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:grid-cols-[14rem_minmax(0,1fr)]"
                  >
                    <div className="relative aspect-[1/1] overflow-hidden bg-muted">
                      <Image
                        src={relatedProject.coverImage}
                        alt={relatedProject.title}
                        fill
                        quality={90}
                        sizes="(max-width: 639px) 100vw, 224px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="mb-2 project-kicker tracking-[0.14em]">
                            {relatedProject.category}
                          </p>
                          <h3 className="text-[1.65rem] font-black uppercase leading-[0.9] tracking-[-0.035em] text-foreground">
                            {relatedProject.title}
                          </h3>
                        </div>
                        <span className="project-kicker tracking-[0.14em]">
                          {relatedProject.year}
                        </span>
                      </div>

                      <p className="text-[0.96rem] leading-7 text-muted-foreground">
                        {relatedProject.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          ) : null}

          <Reveal className="flex flex-col gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionEyebrow className="mb-2 project-kicker">
                Start A Similar Project
              </SectionEyebrow>
              <p className={`max-w-2xl ${projectProseClassName}`}>
                If you are planning a renovation, custom space, or detail-driven upgrade in Victoria, we can help shape the scope and finish level early.
              </p>
            </div>

            <InteractiveHoverButton
              href="/contact"
              data-analytics-event="project_detail_contact_clicked"
              data-analytics-label={project.slug}
              data-analytics-location="project-detail"
              className="w-fit"
            >
              Start Your Project
            </InteractiveHoverButton>
          </Reveal>
        </div>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
