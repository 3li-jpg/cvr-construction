"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatedThemeToggler } from "@/components/AnimatedThemeToggler";
import { Logo } from "@/components/Logo";
import { SocialIconLink } from "@/components/SocialIconLink";
import TextRoll from "@/components/ui/text-roll";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import {
  businessContact,
  navItems,
  showroomContact,
  socialLinks,
} from "@/lib/site-data";

// Display order for the top-of-page horizontal nav and the expanded menu
// overlay.
const orderedNavItems = navItems;
const desktopNavItems = orderedNavItems.filter((item) => item.href !== "/");
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
  const [isCallChooserOpen, setIsCallChooserOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const isHomePage = pathname === "/";
  const isContactPage = pathname === "/contact";
  const isShowroomPage = pathname === "/showroom";
  const showExpandedNav = !isPastHero && !isOpen;
  const showMobileContactFab = !isContactPage && !isOpen && isPastHero && !isFooterVisible;
  const constructionCallOption = {
    label: "Construction Office",
    chooserLabel: "Construction Office Number",
    phone: businessContact.phone,
    phoneHref: businessContact.phoneHref,
  };
  const showroomCallOption = {
    label: "Showroom",
    chooserLabel: "Showroom Number",
    phone: showroomContact.phone,
    phoneHref: showroomContact.phoneHref,
  };
  const callOptions = isShowroomPage
    ? [showroomCallOption, constructionCallOption]
    : [constructionCallOption, showroomCallOption];

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
    const footer = document.getElementById("site-footer");

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.02 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, [pathname]);

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

  useEffect(() => {
    if (!isCallChooserOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCallChooserOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCallChooserOpen]);

  const toggleMenu = () => {
    setIsCallChooserOpen(false);
    setIsOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsCallChooserOpen(false);
  };

  const menuButtonLabel = isOpen ? "Close site navigation" : "Open site navigation";
  const hiddenMenuTabIndex = isOpen ? 0 : -1;
  const expandedHeaderTabIndex = showExpandedNav ? 0 : -1;
  return (
    <>
      <header
        aria-hidden={!showExpandedNav}
        className={`fixed inset-x-0 top-0 z-[99] hidden text-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] xl:block ${
          showExpandedNav
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="site-shell pt-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center">
            <Link
              href="/"
              onClick={closeMenu}
              tabIndex={expandedHeaderTabIndex}
              className="justify-self-start text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="CVR Construction home"
            >
              <Logo className="h-11 w-auto text-[#FDFBF7]" />
            </Link>

            <nav aria-label="Primary" className="flex items-center justify-center gap-5 xl:gap-8 text-[11.5px] xl:text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={expandedHeaderTabIndex}
                  className="transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <TextRoll className="text-[inherit] font-[inherit] tracking-[inherit] leading-[0.95]">
                    {item.label.toUpperCase()}
                  </TextRoll>
                </Link>
              ))}
            </nav>

            <div className="justify-self-end" style={{width: "20.25rem"}} />
          </div>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] hidden xl:block">
        <div className="site-shell flex justify-end pt-8">
          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              href="/contact"
              className="inline-flex h-11 min-w-[7.75rem] items-center justify-center gap-2 rounded-none border border-black bg-black px-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 dark:border-white dark:bg-white dark:text-black xl:min-w-[8.25rem]"
            >
              CONTACT US
            </Link>
            <AnimatedThemeToggler className="!h-11 !w-11 border-black/10 bg-white text-black dark:border-white/12 dark:bg-[#161F1F] dark:text-white" />
            <button
              ref={desktopMenuButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls={menuId}
              aria-haspopup="dialog"
              aria-label={menuButtonLabel}
              onClick={toggleMenu}
              className="inline-flex h-11 min-w-[7.75rem] items-center justify-center rounded-none bg-[#e6e6e2] px-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#dcdcd7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:bg-[#33403f] dark:text-white dark:hover:bg-[#3e4c4b] dark:focus-visible:ring-white dark:focus-visible:ring-offset-black xl:min-w-[8.25rem]"
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
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-black/8 bg-white/96 px-4 pb-2 pt-2 backdrop-blur dark:border-white/10 dark:bg-[#161f1f]/92 xl:hidden"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 0.625rem)",
          paddingLeft: "max(env(safe-area-inset-left), 1rem)",
          paddingRight: "max(env(safe-area-inset-right), 1rem)",
        }}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
          aria-label="CVR Construction home"
        >
          <Logo className="h-12 w-auto text-[#161F1F] dark:text-[#FDFBF7]" />
        </Link>

        <div className="flex items-center gap-1.5">
          <Link
            href="/contact"
            className="hidden md:flex h-12 items-center justify-center rounded-none border border-black/8 bg-black px-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 dark:border-white/10 dark:bg-white dark:text-black"
          >
            CONTACT US
          </Link>
          <AnimatedThemeToggler className="h-12 w-12 border-black/8 bg-white text-black dark:border-white/10 dark:bg-[#161F1F] dark:text-white" />
          <button
            ref={mobileMenuButtonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={menuButtonLabel}
            onClick={toggleMenu}
            className="flex h-12 min-w-[5.35rem] items-center justify-center rounded-none border border-black/8 bg-[#e6e6e2] px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#dcdcd7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:border-white/10 dark:bg-[#33403f] dark:text-white dark:hover:bg-[#3e4c4b] dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
          >
            <TextRoll
              center
              className="text-[inherit] font-[inherit] tracking-[inherit] leading-[0.9]"
            >
              {isOpen ? "CLOSE" : "MENU"}
            </TextRoll>
          </button>
        </div>
      </header>

      <div
        aria-hidden={!showMobileContactFab}
        className={`fixed left-1/2 z-[101] -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] xl:hidden ${
          showMobileContactFab
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{
          bottom: "max(env(safe-area-inset-bottom, 0px), 1rem)",
        }}
      >
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isCallChooserOpen}
          onClick={() => setIsCallChooserOpen(true)}
          tabIndex={showMobileContactFab ? 0 : -1}
          className="inline-flex min-h-[3.45rem] whitespace-nowrap items-center gap-2.5 rounded-none bg-black px-6 py-3 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-opacity hover:opacity-80 dark:bg-white dark:text-black"
        >
          <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
          </svg>
          CALL NOW
        </button>
      </div>

      <AnimatePresence>
        {isCallChooserOpen ? (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 px-4 py-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setIsCallChooserOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="call-chooser-title"
              className="w-full max-w-sm rounded-none bg-white p-5 text-black shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p id="call-chooser-title" className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-black/55">
                    Choose a number
                  </p>
                  <p className="mt-1 text-lg font-black uppercase leading-tight tracking-[-0.03em]">
                    Call CVR
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close call options"
                  onClick={() => setIsCallChooserOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-none border border-black/10 text-xl leading-none transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  ×
                </button>
              </div>

              <div className="grid gap-2.5">
                {callOptions.map((option) => (
                  <a
                    key={option.label}
                    href={option.phoneHref}
                    className="flex min-h-16 flex-col justify-center rounded-none border border-black/10 px-4 py-3 text-left transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    onClick={() => setIsCallChooserOpen(false)}
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] opacity-60">{option.chooserLabel}</span>
                    <span className="mt-1 text-base font-semibold tracking-[-0.01em]">{option.phone}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
                className="flex flex-col items-center gap-[0.3rem] text-[clamp(2.76rem,8.94vw,4rem)] font-black uppercase leading-[0.95] tracking-tighter text-white md:gap-1 md:text-[clamp(1.7rem,5.5vw,4rem)]"
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
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[0.7rem] text-white/60">Get in touch</p>
                  <div className="flex flex-col items-center gap-1.5 text-sm tracking-[0.14em] text-white md:text-base">
                    {callOptions.map((option) => (
                      <a
                        key={option.label}
                        href={option.phoneHref}
                        tabIndex={hiddenMenuTabIndex}
                        className="transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      >
                        {option.label} / {option.phone}
                      </a>
                    ))}
                    <a
                      href={businessContact.emailHref}
                      tabIndex={hiddenMenuTabIndex}
                      className="break-all transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {businessContact.email.toUpperCase()}
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {socialLinks.map((item) => (
                    <SocialIconLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={hiddenMenuTabIndex}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-none border border-white/15 text-white/56 transition-colors hover:border-white/45 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      iconClassName="h-4 w-4"
                    />
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
