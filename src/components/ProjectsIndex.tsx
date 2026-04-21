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
import { EASE_OUT_EXPO } from "@/lib/motion";
import { proseBodyClassName } from "@/lib/prose";
import { projects, projectsHero, type ProjectEntry } from "@/lib/site-data";

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
}: {
  project: ProjectEntry;
  index: number;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rawY = useParallax(containerRef);
  const imageY = prefersReducedMotion ? 0 : rawY;

  const isReversed = index % 2 === 1;
  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={containerRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
      className="relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        data-analytics-event="project_card_clicked"
        data-analytics-label={project.slug}
        data-analytics-location="projects-index"
        className="group grid items-center gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 md:gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
      >
        <div
          className={`relative overflow-hidden bg-black ${
            isReversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] lg:aspect-[1.15/1]">
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-x-0 -top-[8%] -bottom-[8%]"
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                quality={92}
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="object-cover transition-[filter,transform] duration-[1200ms] ease-out group-hover:brightness-105 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </div>

        <div
          className={`flex flex-col gap-6 lg:max-w-[34rem] ${
            isReversed ? "lg:order-1 lg:pr-10" : "lg:order-2 lg:pl-10"
          }`}
        >
          <div className="flex items-center justify-between gap-6 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-black/48">
            <span>{numberLabel} /</span>
            <span>{project.year}</span>
          </div>

          <h2 className="max-w-[14ch] text-[2.9rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-[3.7rem] md:text-[4.45rem] lg:text-[5rem] xl:text-[5.45rem]">
            {project.title}
          </h2>

          <div className="flex flex-col gap-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-black/55 sm:flex-row sm:items-center sm:gap-6">
            <span>{project.category}</span>
            <span aria-hidden="true" className="hidden text-black/30 sm:inline">
              /
            </span>
            <span>{project.location}</span>
          </div>

          <p className={`max-w-[32rem] ${proseBodyClassName}`}>
            {project.summary}
          </p>

          <span className="mt-2 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-black transition-transform duration-500 ease-out group-hover:translate-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            View Project
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProjectsIndex() {
  return (
    <>
      <PageIntro
        eyebrow="Projects / Built Work"
        title={"Work That Holds Up"}
        scrollTargetId="projects"
        backgroundImage={projectsHero}
      />

      <section
        id="projects"
        aria-labelledby="projects-list-heading"
        className="site-shell px-6 pb-24 pt-14 sm:px-8 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pb-32 lg:pt-20"
      >
        <h2 id="projects-list-heading" className="sr-only">
          Selected projects
        </h2>

        <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
          {projects.map((project, index) => (
            <div id={`project-${project.slug}`} key={project.slug}>
              <ProjectRow project={project} index={index} />
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
