"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

const directionsHref = "https://maps.app.goo.gl/6AWwv3gmKRYqnbrYA";

export function GrandOpeningPopup() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 px-4 py-6 text-white backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="grand-opening-title"
            className="relative w-full max-w-[30rem] overflow-hidden rounded-none border border-white/18 bg-[#0a0a09] p-7 text-center shadow-[0_28px_90px_rgba(0,0,0,0.6)] sm:p-9"
            initial={{ opacity: 0, y: 44, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 32, scale: 0.94, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.28),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.12),transparent_45%),linear-gradient(160deg,rgba(255,255,255,0.14),transparent_55%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
            <button
              type="button"
              aria-label="Close grand opening message"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center border border-white/16 text-xl leading-none text-white/80 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              ×
            </button>

            <div className="relative z-10 flex flex-col items-center">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center border border-white/18 bg-white/8 text-[0.72rem] font-black uppercase tracking-[0.16em] text-white">
                CVR
              </span>
              <p className="mb-3 flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/58">
                <span className="h-1.5 w-1.5 bg-current" />
                Save The Date
              </p>
              <h2
                id="grand-opening-title"
                className="text-[3rem] font-black uppercase leading-[0.86] tracking-[-0.06em] text-white sm:text-[4rem]"
              >
                Grand Opening
              </h2>
              <p className="mt-4 text-[1.1rem] font-bold uppercase tracking-[0.08em] text-white/85">
                July 12th &middot; 3:00 PM
              </p>
              <p className="mt-5 max-w-[22rem] text-[0.98rem] leading-7 text-white/65">
                Join us for the grand opening of our luxury kitchen and bath showroom in Victoria. Explore fixtures, finishes, and product lines in person.
              </p>
              <div className="mt-7 flex w-full flex-row items-stretch gap-3">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex h-12 flex-1 items-center justify-center overflow-hidden border border-white bg-white px-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:text-white sm:text-[0.7rem]"
                >
                  <span className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 bg-black transition-all duration-300 ease-out group-hover:-left-32 group-hover:h-32 group-hover:w-96" />
                  <span className="relative">Get Directions</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-12 flex-1 items-center justify-center border border-white/30 px-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white hover:text-white sm:text-[0.7rem]"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
