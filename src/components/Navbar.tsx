"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatedThemeToggler } from "@/components/AnimatedThemeToggler";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import TextRoll from "@/components/ui/text-roll";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { navItems, socialLinks } from "@/lib/site-data";

// Display order for the top-of-page horizontal nav and the expanded menu
// overlay. Home leads, Contact is excluded (it has its own CTA button).
const orderedNavItems = [
  ...navItems.filter((item) => item.href === "/"),
  ...navItems.filter((item) => item.href !== "/" && item.href !== "/contact"),
];
const desktopNavItems = orderedNavItems;
const menuNavItems = orderedNavItems;

// Menu curtain animation. The panel uses the site-wide expo-out easing so it
// feels connected to the page-transition curtain. Children are staggered via
// `staggerChildren` + `delayChildren` so the nav items and footer block
// progressively reveal AFTER the panel has landed (on open) and retract BEFORE
// the panel lifts (on close) — this is the "play along" choreography.
const menuPanelVariants: Variants = {
  hidden: { y: "-100%" },
  show: {
    y: "0%",
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
  exit: {
    y: "-100%",
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO, delay: 0.15 },
  },
};

const menuContentVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.38 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: 24,
    transition: { duration: DURATION.xs, ease: EASE_OUT_EXPO },
  },
};

function focusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const desktopMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const isHomePage = pathname === "/";
  const isContactPage = pathname === "/contact";
  const showExpandedNav = !isPastHero && !isOpen;
  const showMobileContactFab = !isContactPage && !isOpen;

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isHomePage
        ? window.innerHeight * 0.85
        : Math.min(window.innerHeight * 0.18, 180);

      setIsPastHero(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      const [firstFocusable] = focusableElements(menuRef.current);
      firstFocusable?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = focusableElements(menuRef.current);

      if (elements.length === 0) {
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuButtonLabel = isOpen ? "Close site navigation" : "Open site navigation";
  const hiddenMenuTabIndex = isOpen ? 0 : -1;
  const expandedHeaderTabIndex = showExpandedNav ? 0 : -1;
  const desktopActionClassName =
    "min-h-11 whitespace-nowrap px-5 py-3 text-[0.76rem] tracking-[0.12em]";

  return (
    <>
      <header
        aria-hidden={!showExpandedNav}
        className={`fixed inset-x-0 top-0 z-[99] hidden text-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:block ${
          showExpandedNav
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="site-shell pt-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <Link
              href="/"
              onClick={closeMenu}
              tabIndex={expandedHeaderTabIndex}
              className="justify-self-start text-[2.2rem] font-bold uppercase tracking-[-0.05em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[2.45rem]"
            >
              CVR
            </Link>

            <nav aria-label="Primary" className="flex items-center gap-8 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={expandedHeaderTabIndex}
                  className="transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {item.label.toUpperCase()}
                </Link>
              ))}
            </nav>

            <div className="justify-self-end pr-[13.5rem]" />
          </div>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] hidden lg:block">
        <div className="site-shell flex justify-end pt-8">
          <div className="pointer-events-auto flex items-center gap-3">
            <InteractiveHoverButton
              href="/contact"
              className={desktopActionClassName}
            >
              CONTACT US
            </InteractiveHoverButton>
            <AnimatedThemeToggler className="h-11 w-11 border-black/10 bg-white text-black dark:border-white/12 dark:bg-[#1a1a18] dark:text-white" />
            <button
              ref={desktopMenuButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls={menuId}
              aria-haspopup="dialog"
              aria-label={menuButtonLabel}
              onClick={() => setIsOpen((current) => !current)}
              className={`${desktopActionClassName} min-w-[7.25rem] rounded-full bg-[#e6e6e2] font-semibold uppercase text-black transition-colors hover:bg-[#dcdcd7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:bg-[#1a1a18] dark:text-white dark:hover:bg-[#232320] dark:focus-visible:ring-white dark:focus-visible:ring-offset-black`}
            >
              <TextRoll
                center
                className="text-[inherit] font-[inherit] tracking-[inherit] leading-[0.9]"
              >
                {isOpen ? "CLOSE" : "MENU"}
              </TextRoll>
            </button>
          </div>
        </div>
      </header>

      <header
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-black/8 bg-white/96 px-4 pb-2 pt-2 backdrop-blur dark:border-white/10 dark:bg-black/92 lg:hidden"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 0.625rem)",
          paddingLeft: "max(env(safe-area-inset-left), 1rem)",
          paddingRight: "max(env(safe-area-inset-right), 1rem)",
        }}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="text-[1.95rem] font-bold uppercase tracking-[-0.05em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black md:text-[2.2rem]"
        >
          CVR
        </Link>

        <div className="flex items-center gap-1.5">
          <AnimatedThemeToggler className="h-10 w-10 border-black/8 bg-white text-black dark:border-white/10 dark:bg-[#1a1a18] dark:text-white" />
          <InteractiveHoverButton
            ref={mobileMenuButtonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={menuButtonLabel}
            onClick={() => setIsOpen((current) => !current)}
            className="min-h-10 min-w-[4.9rem] whitespace-nowrap rounded-full bg-[#e6e6e2] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#dcdcd7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:bg-[#1a1a18] dark:text-white dark:hover:bg-[#232320] dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
          >
            <TextRoll
              center
              className="text-[inherit] font-[inherit] tracking-[inherit] leading-[0.9]"
            >
              {isOpen ? "CLOSE" : "MENU"}
            </TextRoll>
          </InteractiveHoverButton>
        </div>
      </header>

      <div
        aria-hidden={!showMobileContactFab}
        className={`fixed left-1/2 z-[101] -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden ${
          showMobileContactFab
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{
          bottom: "max(env(safe-area-inset-bottom, 0px), 1rem)",
        }}
      >
        <InteractiveHoverButton
          href="/contact"
          size="sm"
          showDot={false}
          tabIndex={showMobileContactFab ? 0 : -1}
          className="min-h-11 whitespace-nowrap px-5 py-2.5 text-[0.68rem] tracking-[0.1em] shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
        >
          CONTACT US
        </InteractiveHoverButton>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={menuPanelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-black px-5 pb-6 pt-20 sm:px-6 md:px-12 md:pb-8 md:pt-24 lg:px-20"
            style={{
              paddingTop: "calc(env(safe-area-inset-top) + 5rem)",
              paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
            }}
          >
            <motion.div
              variants={menuContentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex min-h-full flex-col items-center justify-center gap-8 text-center md:gap-10"
            >
              <nav
                aria-label="Expanded site navigation"
                className="flex flex-col items-center gap-1 text-[clamp(1.7rem,5.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tighter text-white"
              >
                {menuNavItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={menuItemVariants}
                    className="overflow-hidden"
                  >
                    <Link
                      href={item.href}
                      tabIndex={hiddenMenuTabIndex}
                      onClick={closeMenu}
                      className="block w-fit text-center transition-colors duration-300 hover:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <TextRoll className="text-[inherit] font-[inherit] tracking-[inherit] leading-[0.95]">
                        {item.label.toUpperCase()}
                      </TextRoll>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                variants={menuItemVariants}
                className="flex w-full max-w-[42rem] flex-col items-center gap-3 border-t border-white/12 pt-5 text-center text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/50 sm:text-xs md:gap-4 md:pt-6"
              >
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[0.7rem] text-white/60">Get in touch</p>
                  <a
                    href="mailto:info@cvrconstruction.ca"
                    tabIndex={hiddenMenuTabIndex}
                    className="break-all text-sm tracking-[0.14em] text-white transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-base"
                  >
                    INFO@CVRCONSTRUCTION.CA
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                  {socialLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={hiddenMenuTabIndex}
                      className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {item.label.toUpperCase()}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
