"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { TextAnimate } from "@/components/TextAnimate";
import { projects } from "@/lib/site-data";

const projectMotion = [
  { side: "left" as const, targetX: -42 },
  { side: "right" as const, targetX: 84 },
  { side: "left" as const, targetX: -68 },
  { side: "right" as const, targetX: 108 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const projectCardFrameClassName =
  "w-[min(100%,12.75rem)] sm:w-[14.25rem] lg:w-[17.25rem] xl:w-[19.5rem]";

function ProjectCard({
  projectIndex,
  setCardRef,
  setImageRef,
  frameClassName,
}: {
  projectIndex: number;
  setCardRef: (index: number, node: HTMLDivElement | null) => void;
  setImageRef: (index: number, node: HTMLDivElement | null) => void;
  frameClassName?: string;
}) {
  const project = projects[projectIndex];
  const projectDetailHref = `/projects/${project.slug}`;

  return (
    <article className={frameClassName}>
      <Link
        href={projectDetailHref}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
      >
        <div
          ref={(node) => {
            setCardRef(projectIndex, node);
          }}
          className="w-full transform-gpu will-change-transform"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-black">
            <div
              ref={(node) => {
                setImageRef(projectIndex, node);
              }}
              className="absolute inset-x-0 top-[-12%] h-[124%] transform-gpu will-change-transform"
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                quality={90}
                sizes="(max-width: 639px) 12.75rem, (max-width: 1023px) 14.25rem, (max-width: 1279px) 17.25rem, 19.5rem"
                className="object-cover brightness-[0.92] transition-[filter] duration-500 ease-out group-hover:brightness-100"
              />
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="max-w-[74%] sm:max-w-[70%]">
              <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-black/48 sm:text-[0.69rem]">
                {project.category}
              </p>
              <h3 className="text-[1.05rem] font-bold uppercase tracking-[-0.04em] sm:text-[1.18rem] lg:text-[1.32rem] xl:text-[1.42rem]">
                {project.title}
              </h3>
            </div>
            <span className="text-[0.8rem] font-semibold tracking-[-0.03em] text-black/75 sm:text-[0.92rem]">
              {project.year}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ProjectsSection() {
  const desktopCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const desktopImageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileImageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const leftProjectIndexes = projects
    .map((_, index) => index)
    .filter((index) => index % 2 === 0);
  const rightProjectIndexes = projects
    .map((_, index) => index)
    .filter((index) => index % 2 === 1);

  const setDesktopCardRef = (index: number, node: HTMLDivElement | null) => {
    desktopCardRefs.current[index] = node;
  };

  const setDesktopImageRef = (index: number, node: HTMLDivElement | null) => {
    desktopImageRefs.current[index] = node;
  };

  const setMobileCardRef = (index: number, node: HTMLDivElement | null) => {
    mobileCardRefs.current[index] = node;
  };

  const setMobileImageRef = (index: number, node: HTMLDivElement | null) => {
    mobileImageRefs.current[index] = node;
  };

  const projectsHeadingClassName =
    "text-[2.0rem] sm:text-[2.7rem] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.4rem] font-black tracking-[-0.03em] uppercase leading-[0.9]";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let frame = 0;

    const updateTransforms = () => {
      frame = 0;

      const isDesktop = window.innerWidth >= 1024;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const activeCardRefs = isDesktop
        ? desktopCardRefs.current
        : mobileCardRefs.current;
      const activeImageRefs = isDesktop
        ? desktopImageRefs.current
        : mobileImageRefs.current;
      const inactiveCardRefs = isDesktop
        ? mobileCardRefs.current
        : desktopCardRefs.current;
      const inactiveImageRefs = isDesktop
        ? mobileImageRefs.current
        : desktopImageRefs.current;

      inactiveCardRefs.forEach((card) => {
        if (card) {
          card.style.transform = "translate3d(0, 0, 0)";
        }
      });

      inactiveImageRefs.forEach((image) => {
        if (image) {
          image.style.transform = "translate3d(0, 0, 0) scale(1.06)";
        }
      });

      projects.forEach((_, index) => {
        const card = activeCardRefs[index];
        const image = activeImageRefs[index];

        if (!card || !image) return;

        const rect = card.getBoundingClientRect();

        if (!isDesktop && (rect.bottom < -120 || rect.top > viewportHeight + 120)) {
          card.style.transform = "translate3d(0, 0, 0)";
          image.style.transform = "translate3d(0, 0, 0) scale(1.06)";
          return;
        }

        const progress = clamp(
          (viewportHeight - rect.top) / (viewportHeight + rect.height),
          0,
          1
        );

        if (isDesktop) {
          const cardEase = clamp((progress - 0.08) / 0.84, 0, 1);
          const outwardDrift = 1 - Math.pow(1 - cardEase, 1.45);
          const imageOffset = (0.5 - progress) * 92;
          const horizontalOffset =
            projectMotion[index % projectMotion.length].targetX * outwardDrift;
          const verticalOffset = (0.5 - progress) * 18;

          card.style.transform = `translate3d(${horizontalOffset.toFixed(2)}px, ${verticalOffset.toFixed(2)}px, 0)`;
          image.style.transform = `translate3d(0, ${imageOffset.toFixed(2)}px, 0) scale(1.08)`;
          return;
        }

        const imageOffset = (0.5 - progress) * 70;
        const cardEase = clamp((progress - 0.05) / 0.85, 0, 1);
        const outwardDrift = 1 - Math.pow(1 - cardEase, 1.5);
        const mobileTargetX = index % 2 === 0 ? -42 : 42;
        const horizontalOffset = mobileTargetX * outwardDrift;
        const verticalOffset = (0.5 - progress) * 14;

        card.style.transform = `translate3d(${horizontalOffset.toFixed(2)}px, ${verticalOffset.toFixed(2)}px, 0)`;
        image.style.transform = `translate3d(0, ${imageOffset.toFixed(2)}px, 0) scale(1.06)`;
      });
    };

    const requestTick = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateTransforms);
      }
    };

    const visualViewport = window.visualViewport;

    requestTick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    visualViewport?.addEventListener("resize", requestTick);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      visualViewport?.removeEventListener("resize", requestTick);
    };
  }, []);

  return (
    <section className="w-full overflow-x-clip bg-white py-20 text-black lg:py-24">
      <div className="site-shell">
        <div className="mb-10 flex flex-col items-center text-center lg:hidden">
          <SectionEyebrow className="mb-5 justify-center text-[0.68rem] tracking-widest text-black">
            PROJECTS
          </SectionEyebrow>
          <TextAnimate
            as="h2"
            by="line"
            animation="slideUp"
            once
            duration={0.56}
            className={projectsHeadingClassName}
            segmentClassName="block"
          >
            {"SELECTED\nPROJECTS"}
          </TextAnimate>
        </div>

        <div className="flex flex-col gap-10 sm:gap-12 lg:hidden">
          {projects.map((project, projectIndex) => (
            <div
              key={project.title}
              className={projectIndex % 2 === 0 ? "flex justify-end" : "flex justify-start"}
            >
              <ProjectCard
                projectIndex={projectIndex}
                setCardRef={setMobileCardRef}
                setImageRef={setMobileImageRef}
                frameClassName={projectCardFrameClassName}
              />
            </div>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(15rem,20rem)_minmax(0,1fr)] lg:gap-x-[1.5vw]">
          <div className="order-2 flex flex-col items-end gap-14 sm:gap-16 lg:order-1 lg:gap-[9rem]">
            {leftProjectIndexes.map((projectIndex) => (
              <ProjectCard
                key={projects[projectIndex].title}
                projectIndex={projectIndex}
                setCardRef={setDesktopCardRef}
                setImageRef={setDesktopImageRef}
                frameClassName={projectCardFrameClassName}
              />
            ))}
          </div>

          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center text-center">
                <SectionEyebrow className="mb-5 justify-center text-[0.68rem] tracking-widest text-black">
                  PROJECTS
                </SectionEyebrow>
                <TextAnimate
                  as="h2"
                  by="line"
                  animation="blurInUp"
                  once
                  duration={0.8}
                  className={projectsHeadingClassName}
                  segmentClassName="block"
                >
                  {"SELECTED\nPROJECTS"}
                </TextAnimate>
              </div>
            </div>
          </div>

          <div className="order-3 flex flex-col items-start gap-14 sm:gap-16 lg:gap-[9rem] lg:pt-[7rem]">
            {rightProjectIndexes.map((projectIndex) => (
              <ProjectCard
                key={projects[projectIndex].title}
                projectIndex={projectIndex}
                setCardRef={setDesktopCardRef}
                setImageRef={setDesktopImageRef}
                frameClassName={projectCardFrameClassName}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-12 sm:pt-14 lg:pt-20">
          <InteractiveHoverButton href="/projects" className="px-4 text-[0.64rem] font-bold tracking-[0.12em] md:px-4.5 md:text-[0.72rem] md:tracking-[0.12em]">
            VIEW ALL PROJECTS
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
