"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { PageIntro } from "@/components/PageIntro";
import { DURATION, EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";
import { projectProseClassName } from "@/lib/prose";
import { projects as allProjects, projectsHero, type ProjectEntry } from "@/lib/site-data";

function useParallax(ref: React.RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    damping: 34,
    stiffness: 110,
    mass: 0.5,
  });
  return useTransform(smooth, [0, 1], [48, -48]);
}

function ProjectRow({
  project,
  index,
  analyticsLocation,
}: {
  project: ProjectEntry;
  index: number;
  analyticsLocation: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rawY = useParallax(containerRef);
  const imageY = prefersReducedMotion ? 0 : rawY;

  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={containerRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.lg, ease: EASE_OUT_EXPO }}
      className="relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        data-analytics-event="project_card_clicked"
        data-analytics-label={project.slug}
        data-analytics-location={analyticsLocation}
        className="group grid items-center gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:gap-10 lg:gap-12 xl:gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.78fr)]"
      >
        <div className="relative w-full max-w-[34rem] overflow-hidden bg-muted lg:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] lg:aspect-[1.12/1]">
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-x-0 -top-[8%] -bottom-[8%]"
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                quality={90}
                sizes="(max-width: 1023px) 100vw, 34rem"
                className="object-cover transition-[filter,transform] duration-[1200ms] ease-out group-hover:brightness-105 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5 lg:order-2 lg:max-w-[30rem]">
          <div className="flex items-center justify-between gap-6 project-kicker tracking-[0.2em]">
            <span>{numberLabel} /</span>
            <span>{project.year}</span>
          </div>

          <h2 className="max-w-[12ch] text-[clamp(2.7rem,5.1vw,4.35rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-foreground">
            {project.title}
          </h2>

          <div className="flex flex-col gap-1 project-kicker sm:flex-row sm:items-center sm:gap-6">
            <span>{project.category}</span>
            <span aria-hidden="true" className="hidden text-border sm:inline">
              /
            </span>
            <span>{project.location}</span>
          </div>

          <p className={`max-w-[28rem] ${projectProseClassName}`}>
            {project.summary}
          </p>

          <span className="mt-2 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground transition-transform duration-500 ease-out group-hover:translate-x-1">
            <span className="h-1.5 w-1.5 rounded-none bg-current" />
            View Project
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

type ProjectCollectionLink = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

type ProjectsIndexProps = {
  projects?: readonly ProjectEntry[];
  eyebrow?: string;
  title?: string;
  description?: string;
  listHeading?: string;
  analyticsLocation?: string;
  collectionLink?: ProjectCollectionLink;
  backgroundImage?: {
    src: string;
    alt?: string;
  };
};

export function ProjectsIndex({
  projects = allProjects,
  eyebrow = "Projects / Built Work",
  title = "Work That Holds Up",
  description,
  listHeading = "Selected projects",
  analyticsLocation = "projects-index",
  collectionLink,
  backgroundImage = projectsHero,
}: ProjectsIndexProps) {
  return (
    <>
      <PageIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleClassName="mx-auto max-w-[12ch] text-center text-balance text-[clamp(3.2rem,10vw,8rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-white"
        scrollTargetId="projects"
        backgroundImage={backgroundImage}
      />

      <section
        id="projects"
        aria-labelledby="projects-list-heading"
        className="site-shell px-6 pb-20 pt-12 sm:px-8 md:px-12 md:pb-24 md:pt-14 lg:px-16 lg:pb-28 lg:pt-16"
      >
        <h2 id="projects-list-heading" className="sr-only">
          {listHeading}
        </h2>

        {collectionLink ? (
          <Link
            href={collectionLink.href}
            data-analytics-event="project_collection_clicked"
            data-analytics-label="bathroom-remodeling"
            data-analytics-location={analyticsLocation}
            className="group mb-16 grid gap-6 border border-border bg-card p-6 text-card-foreground transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:mb-20 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:p-8 lg:mb-24"
          >
            <div>
              <p className="mb-4 project-kicker tracking-[0.14em] text-muted-foreground">
                {collectionLink.eyebrow}
              </p>
              <h2 className="max-w-[11ch] text-[clamp(2.35rem,4.3vw,4.1rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-foreground">
                {collectionLink.title}
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-5 md:max-w-[32rem] md:justify-self-end">
              <p className={projectProseClassName}>{collectionLink.description}</p>
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground transition-transform duration-500 ease-out group-hover:translate-x-1">
                <span className="h-1.5 w-1.5 rounded-none bg-current" />
                {collectionLink.ctaLabel}
              </span>
            </div>
          </Link>
        ) : null}

        <div className="flex flex-col gap-20 md:gap-24 lg:gap-28">
          {projects.map((project, index) => (
            <div id={`project-${project.slug}`} key={project.slug}>
              <ProjectRow
                project={project}
                index={index}
                analyticsLocation={analyticsLocation}
              />
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
