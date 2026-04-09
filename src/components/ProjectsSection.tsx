"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { TextAnimate } from "@/components/TextAnimate";
import { projects } from "@/lib/site-data";

const projectMotion = [
  { side: "left" as const, targetX: -20 },
  { side: "right" as const, targetX: 72 },
  { side: "left" as const, targetX: -88 },
  { side: "right" as const, targetX: 96 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function ProjectCard({
  projectIndex,
  setCardRef,
  setImageRef,
  cardClassName,
}: {
  projectIndex: number;
  setCardRef: (index: number, node: HTMLDivElement | null) => void;
  setImageRef: (index: number, node: HTMLDivElement | null) => void;
  cardClassName?: string;
}) {
  const project = projects[projectIndex];
  const projectDetailHref = `/projects/${project.slug}`;

  return (
    <article>
      <Link
        href={projectDetailHref}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
      >
        <div
          ref={(node) => {
            setCardRef(projectIndex, node);
          }}
          className={joinClassNames(
            "w-full transform-gpu will-change-transform",
            cardClassName
          )}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-black">
            <div
              ref={(node) => {
                setImageRef(projectIndex, node);
              }}
              className="absolute inset-x-0 top-[-6%] h-[112%] transform-gpu will-change-transform"
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                quality={90}
                sizes="(max-width: 1023px) 100vw, 34rem"
                className="object-cover brightness-[0.92] transition-[filter] duration-500 ease-out group-hover:brightness-100"
              />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="max-w-[74%] sm:max-w-[70%]">
              <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/48">
                {project.category}
              </p>
              <h3 className="text-[1.2rem] font-bold uppercase tracking-[-0.04em] sm:text-[1.35rem] lg:text-[1.55rem]">
                {project.title}
              </h3>
            </div>
            <span className="text-sm font-semibold tracking-[-0.03em] text-black/75 sm:text-base">
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
    "text-[2.9rem] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.1rem] xl:text-[5.5rem] font-black tracking-[-0.03em] uppercase leading-[0.9]";

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
          image.style.transform = "translate3d(0, 0, 0) scale(1.03)";
        }
      });

      projects.forEach((_, index) => {
        const card = activeCardRefs[index];
        const image = activeImageRefs[index];

        if (!card || !image) return;

        const rect = card.getBoundingClientRect();

        if (!isDesktop && (rect.bottom < -120 || rect.top > viewportHeight + 120)) {
          card.style.transform = "translate3d(0, 0, 0)";
          image.style.transform = "translate3d(0, 0, 0) scale(1.03)";
          return;
        }

        const progress = clamp(
          (viewportHeight - rect.top) / (viewportHeight + rect.height),
          0,
          1
        );

        if (isDesktop) {
          const cardEase = clamp((progress - 0.08) / 0.84, 0, 1);
          const outwardDrift = 1 - Math.pow(1 - cardEase, 2);
          const imageOffset = (0.5 - progress) * 72;
          const horizontalOffset =
            projectMotion[index % projectMotion.length].targetX * outwardDrift;

          card.style.transform = `translate3d(${horizontalOffset.toFixed(2)}px, 0, 0)`;
          image.style.transform = `translate3d(0, ${imageOffset.toFixed(2)}px, 0) scale(1.04)`;
          return;
        }

        const imageOffset = (0.5 - progress) * 34;
        const settle = clamp((progress - 0.04) / 0.82, 0, 1);
        const cardOffset = (1 - settle) * 10;

        card.style.transform = `translate3d(0, ${cardOffset.toFixed(2)}px, 0)`;
        image.style.transform = `translate3d(0, ${imageOffset.toFixed(2)}px, 0) scale(1.03)`;
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
    <section className="w-full overflow-x-clip bg-white px-6 py-24 text-black sm:px-8 md:px-10 lg:px-0 lg:py-32">
      <div className="mx-auto w-full max-w-none">
        <div className="mb-14 flex flex-col items-center text-center lg:hidden">
          <p className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-black">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
            PROJECTS
          </p>
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

        <div className="flex flex-col gap-14 sm:gap-16 lg:hidden">
          {projects.map((project, projectIndex) => (
            <div
              key={project.title}
              className={projectIndex % 2 === 0 ? "flex justify-end" : "flex justify-start"}
            >
              <ProjectCard
                projectIndex={projectIndex}
                setCardRef={setMobileCardRef}
                setImageRef={setMobileImageRef}
                cardClassName="max-w-[20.5rem] sm:max-w-[24rem]"
              />
            </div>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(17rem,24rem)_minmax(0,1fr)] lg:gap-x-[2vw]">
          <div className="order-2 flex flex-col items-end gap-14 sm:gap-16 lg:order-1 lg:gap-[18rem]">
            {leftProjectIndexes.map((projectIndex) => (
              <ProjectCard
                key={projects[projectIndex].title}
                projectIndex={projectIndex}
                setCardRef={setDesktopCardRef}
                setImageRef={setDesktopImageRef}
                cardClassName="max-w-[30rem] xl:max-w-[34rem]"
              />
            ))}
          </div>

          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center text-center">
                <p className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-black">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
                  PROJECTS
                </p>
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

          <div className="order-3 flex flex-col items-start gap-14 sm:gap-16 lg:gap-[18rem] lg:pt-[16rem]">
            {rightProjectIndexes.map((projectIndex) => (
              <ProjectCard
                key={projects[projectIndex].title}
                projectIndex={projectIndex}
                setCardRef={setDesktopCardRef}
                setImageRef={setDesktopImageRef}
                cardClassName="max-w-[30rem] xl:max-w-[34rem]"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-16 sm:pt-20 lg:pt-28">
          <InteractiveHoverButton href="/projects" className="px-8 text-sm font-bold tracking-widest">
            VIEW ALL PROJECTS
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
