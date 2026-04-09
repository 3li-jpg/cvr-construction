import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Navbar } from "@/components/Navbar";
import { buildPageMetadata } from "@/lib/metadata";
import { getProjectBySlug, projects } from "@/lib/site-data";

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
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${project.title} | CVR Construction`,
    description: project.summary,
    dateModified: project.updatedAt,
    image: `https://www.cvrconstruction.ca${project.heroImage}`,
    about: [
      project.category,
      project.location,
      ...project.scope,
      ...project.highlights,
    ],
  };

  return (
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />
      <Script
        id={`project-schema-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, projectSchema]),
        }}
      />

      <section className="px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
        <div className="mx-auto flex max-w-[1560px] flex-col gap-12">
          <div className="flex flex-col gap-6">
            <Link
              href="/projects"
              className="w-fit text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/54 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
            >
              ← Back To Projects
            </Link>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                  {project.category} / {project.location}
                </p>
                <h1 className="max-w-[12ch] text-[3.2rem] font-black uppercase leading-[0.88] tracking-[-0.06em] text-black sm:text-[4.4rem] md:text-[5.5rem] lg:max-w-none lg:text-[6.6rem]">
                  {project.title}
                </h1>
              </div>

              <div className="grid gap-3 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-black/55 sm:grid-cols-3 lg:min-w-[34rem]">
                <div>
                  <p className="mb-2 text-black/35">Year</p>
                  <p className="text-black">{project.year}</p>
                </div>
                <div>
                  <p className="mb-2 text-black/35">Type</p>
                  <p className="text-black">{project.category}</p>
                </div>
                <div>
                  <p className="mb-2 text-black/35">Location</p>
                  <p className="text-black">{project.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-12">
            <div className="relative aspect-[1.28/1] overflow-hidden bg-black">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                priority
                quality={90}
                sizes="(max-width: 1023px) 100vw, 65vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between gap-8 border border-black/10 bg-black/[0.02] p-6 sm:p-8">
              <div>
                <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                  Project Overview
                </p>
                <p className="text-[1rem] leading-7 text-black/72 sm:text-[1.06rem]">
                  {project.intro}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h2 className="mb-3 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                    Scope
                  </h2>
                  <ul className="space-y-2 text-[0.96rem] leading-6 text-black/72">
                    {project.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                    Highlights
                  </h2>
                  <ul className="space-y-2 text-[0.96rem] leading-6 text-black/72">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="max-w-xl">
              <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Outcome
              </p>
              <p className="text-[1rem] leading-7 text-black/72 sm:text-[1.08rem]">
                {project.outcome}
              </p>
            </div>

	            {project.galleryImages.length > 0 ? (
	            <div className="grid gap-4 sm:grid-cols-3">
	              {project.galleryImages.map((image, index) => (
	                <div
	                  key={image}
	                  className={`relative overflow-hidden bg-black/5 ${
	                    index === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[1.05/1]" : "aspect-[0.9/1]"
	                  }`}
	                >
	                  <Image
	                    src={image}
	                    alt={`${project.title} image ${index + 1}`}
	                    fill
	                    loading="eager"
	                    quality={90}
	                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
	                    className="object-cover"
	                  />
	                </div>
	              ))}
	            </div>
	            ) : null}
	          </div>

          {project.storySections.length > 0 ? (
            <div className="grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-[minmax(18rem,0.36fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                  Project Notes
                </p>
                <h2 className="max-w-[12ch] text-[2.3rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[2.9rem] md:text-[3.4rem]">
                  Why This Project Works
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {project.storySections.map((section) => (
                  <section
                    key={section.heading}
                    className="border border-black/10 bg-black/[0.02] p-6"
                  >
                    <h3 className="mb-3 text-[1.2rem] font-black uppercase tracking-[-0.04em]">
                      {section.heading}
                    </h3>
                    <p className="text-[0.98rem] leading-7 text-black/70">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          ) : null}

          {relatedProjects.length > 0 ? (
            <div className="border-t border-black/10 pt-10">
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                    Related Work
                  </p>
                  <h2 className="text-[2.1rem] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[2.8rem]">
                    More Built Proof
                  </h2>
                </div>
                <p className="max-w-xl text-[0.95rem] leading-7 text-black/68">
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
                    className="group grid gap-6 border border-black/10 bg-white p-5 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:grid-cols-[14rem_minmax(0,1fr)]"
                  >
                    <div className="relative aspect-[1/1] overflow-hidden bg-black/5">
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
                          <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                            {relatedProject.category}
                          </p>
                          <h3 className="text-[1.35rem] font-black uppercase leading-[0.96] tracking-[-0.04em]">
                            {relatedProject.title}
                          </h3>
                        </div>
                        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/45">
                          {relatedProject.year}
                        </span>
                      </div>

                      <p className="text-[0.96rem] leading-7 text-black/68">
                        {relatedProject.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-5 border-t border-black/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                Start A Similar Project
              </p>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-black/68">
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
          </div>
        </div>
      </section>

      <div className="relative z-[60] bg-black">
        <Footer />
      </div>
    </main>
  );
}
