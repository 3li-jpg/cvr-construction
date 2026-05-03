"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BlurTextAnimation from "@/components/ui/blur-text-animation";

export function HeroSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame = 0;

    const updateTransform = () => {
      frame = 0;
      if (!imageWrapRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const translateY = (0.5 - progress) * 10 * rect.height / 100;

      imageWrapRef.current.style.transform = `translateY(${translateY}px)`;
    };

    const requestTick = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateTransform);
      }
    };

    requestTick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, [prefersReducedMotion]);

  const indicatorAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, animation: "heroFadeIn 0.8s ease 0.8s forwards" };

  const ctaAnimation = prefersReducedMotion
    ? { opacity: 1, filter: "blur(0px)", transform: "translateY(0) scale(1)" }
    : {
        opacity: 0,
        filter: "blur(14px)",
        transform: "translateY(18px) scale(0.98)",
        animation: "heroCtaBlurIn 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.05s forwards",
      };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#000000] md:h-[100dvh] md:min-h-[100dvh]"
    >
      <div
        ref={imageWrapRef}
        className="absolute inset-x-0 top-[-5%] h-[110%] will-change-transform"
      >
        <Image
          src="/images/victoria-garden-studio-hero.png"
          alt="CVR Construction backyard garden studio in Victoria BC"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          unoptimized
          className="object-cover object-[center_70%]"
        />
      </div>

      <div className="absolute inset-0 bg-[#000000] opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-50" />

      <div className="relative z-10 h-full w-full">
        <div className="site-shell relative flex h-full flex-col items-center justify-center pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-24 lg:pt-32">
          <div className="flex w-full flex-col items-center">
            {prefersReducedMotion ? (
              <h1 className="text-center font-bold uppercase leading-[0.84] tracking-tighter text-[#ffffff]">
                <span
                  className="block whitespace-nowrap text-[clamp(3.1rem,14vw,4.4rem)] normal-case leading-[0.82] tracking-normal lg:text-[5.74rem]"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 400 }}
                >
                  Victoria&apos;s{" "}
                  <em className="normal-case">
                    Premium
                  </em>
                </span>
                <span className="mt-1 block whitespace-nowrap text-[clamp(3.05rem,13.6vw,4.25rem)] leading-[0.82] lg:hidden">
                  HOME
                </span>
                <span className="block whitespace-nowrap text-[clamp(3.05rem,13.6vw,4.25rem)] leading-[0.82] lg:hidden">
                  REMODELING
                </span>
                <span className="mt-1 hidden whitespace-nowrap text-[5.95rem] leading-[0.82] lg:block">
                  HOME REMODELING
                </span>
              </h1>
            ) : (
              <h1 className="text-center font-bold uppercase leading-[0.84] tracking-tighter text-[#ffffff]">
                <span
                  className="block whitespace-nowrap text-[clamp(3.1rem,14vw,4.4rem)] normal-case leading-[0.82] tracking-normal lg:text-[5.74rem]"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 400 }}
                >
                  <BlurTextAnimation
                    text="Victoria's Premium"
                    className="block"
                    fontSize="text-[inherit]"
                    fontFamily="font-inherit"
                    textColor="text-[#ffffff]"
                    initialDelay={100}
                    animationDelay={3000}
                    repeat={false}
                  />
                </span>
                <span className="mt-1 block whitespace-nowrap text-[clamp(3.05rem,13.6vw,4.25rem)] leading-[0.82] lg:hidden">
                  <BlurTextAnimation
                    text="HOME"
                    className="block"
                    fontSize="text-[inherit]"
                    fontFamily="font-inherit"
                    textColor="text-[#ffffff]"
                    animationDelay={3000}
                    repeat={false}
                  />
                </span>
                <span className="block whitespace-nowrap text-[clamp(3.05rem,13.6vw,4.25rem)] leading-[0.82] lg:hidden">
                  <BlurTextAnimation
                    text="REMODELING"
                    className="block"
                    fontSize="text-[inherit]"
                    fontFamily="font-inherit"
                    textColor="text-[#ffffff]"
                    animationDelay={3000}
                    repeat={false}
                  />
                </span>
                <span className="mt-1 hidden whitespace-nowrap text-[5.95rem] leading-[0.82] lg:block">
                  <BlurTextAnimation
                    text="HOME REMODELING"
                    className="block"
                    fontSize="text-[inherit]"
                    fontFamily="font-inherit"
                    textColor="text-[#ffffff]"
                    animationDelay={3000}
                    repeat={false}
                  />
                </span>
              </h1>
            )}

            <div className="mt-5 flex justify-center md:mt-6">
              {prefersReducedMotion ? (
                <p className="text-center text-[0.72rem] font-black uppercase tracking-tighter text-[#ffffff] sm:text-[0.82rem] md:text-[0.86rem]">
                  Kitchen · Bathroom · Full Home · Custom Spaces
                </p>
              ) : (
                <div className="font-black">
                  <BlurTextAnimation
                    text="KITCHEN · BATHROOM · FULL HOME · CUSTOM SPACES"
                    className="flex justify-center"
                    fontSize="text-center text-[0.72rem] tracking-tighter sm:text-[0.82rem] md:text-[0.86rem]"
                    fontFamily="font-inherit"
                    textColor="text-[#ffffff]"
                    initialDelay={800}
                    animationDelay={3000}
                    repeat={false}
                  />
                </div>
              )}
            </div>
            <div
              className="mt-7 grid w-full max-w-[22rem] grid-cols-2 gap-2.5 sm:mt-8 sm:max-w-[34rem] sm:gap-3"
              style={ctaAnimation}
            >
              <a
                href="/contact"
                className="group relative inline-flex box-border h-12 w-full items-center justify-center overflow-hidden rounded-none border border-[#ffffff] !bg-[#ffffff] px-2 py-0 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.07em] !text-[#000000] transition-colors duration-300 hover:!text-[#ffffff] sm:px-5 sm:text-[0.76rem] sm:tracking-[0.12em]"
              >
                <span className="relative inline-flex items-center whitespace-nowrap">
                  <span className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 bg-[#000000] transition-all duration-300 ease-out group-hover:-left-32 group-hover:h-32 group-hover:w-96 sm:size-2" />
                  <span className="relative ml-3 sm:ml-4">Book Consultation</span>
                </span>
              </a>
              <a
                href="/showroom"
                className="inline-flex box-border h-12 w-full items-center justify-center rounded-none border border-white/45 bg-transparent px-2 py-0 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.07em] text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:px-5 sm:text-[0.76rem] sm:tracking-[0.12em]"
              >
                Visit Showroom
              </a>
            </div>

          </div>

          <div
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffffff]/70 sm:flex lg:bottom-10"
            style={indicatorAnimation}
          >
            <span>SCROLL DOWN</span>
            <div className="flex flex-col items-center gap-1">
              <div className="h-6 w-[1px] bg-[#ffffff] opacity-50" />
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#ffffff]/55 flex sm:hidden"
            style={{
              bottom: "calc(env(safe-area-inset-bottom, 0px) + 4.5rem)",
              ...(prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, animation: "heroFadeIn 0.8s ease 0.9s forwards" }),
            }}
          >
            <span>SCROLL</span>
            <div className="h-4 w-[1px] bg-[#ffffff]/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
