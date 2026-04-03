"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatedThemeToggler } from "@/components/AnimatedThemeToggler";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { navItems, socialLinks } from "@/lib/site-data";

const primaryNavItems = navItems.filter((item) => item.href !== "/contact");

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
  const showExpandedWhiteNav = isHomePage && !isPastHero && !isOpen;
  const showExpandedBlackNav = !isHomePage && !isPastHero && !isOpen;

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[99] hidden px-8 pt-8 text-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:block lg:px-10 ${
          showExpandedWhiteNav
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            onClick={closeMenu}
            className="justify-self-start text-[2.2rem] font-bold uppercase tracking-[-0.05em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[2.45rem]"
          >
            CVR
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="justify-self-end pr-[13.5rem]" />
        </div>
      </header>

      <header
        className={`fixed inset-x-0 top-0 z-[99] hidden px-8 pt-8 text-black transition-all duration-300 md:block lg:px-10 ${
          showExpandedBlackNav
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            onClick={closeMenu}
            className="justify-self-start text-[2.2rem] font-bold uppercase tracking-[-0.05em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:text-[2.45rem]"
          >
            CVR
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-black">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="justify-self-end pr-[13.5rem]" />
        </div>
      </header>

      <header className="fixed right-0 top-0 z-[100] hidden px-6 pt-6 md:block lg:px-10 lg:pt-8">
        <div className="flex items-center gap-3">
          <InteractiveHoverButton
            href="/contact"
            className="whitespace-nowrap px-7 py-3.5 text-[0.78rem]"
          >
            CONTACT US
          </InteractiveHoverButton>
          <AnimatedThemeToggler className="h-12 w-12 border-black/10 bg-white text-black dark:border-white/12 dark:bg-[#1a1a18] dark:text-white" />
          <button
            ref={desktopMenuButtonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={menuButtonLabel}
            onClick={() => setIsOpen((current) => !current)}
            className="whitespace-nowrap rounded-full bg-[#e6e6e2] px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#dcdcd7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:bg-[#1a1a18] dark:text-white dark:hover:bg-[#232320] dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
          >
            {isOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-black/8 bg-white/96 px-4 py-2.5 backdrop-blur dark:border-white/10 dark:bg-black/92 md:hidden">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-[2.2rem] font-bold uppercase tracking-[-0.05em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black md:text-[2.45rem]"
        >
          CVR
        </Link>

        <div className="flex items-center gap-2">
          <InteractiveHoverButton
            href="/contact"
            size="sm"
            className="whitespace-nowrap px-3 py-1.5 text-[9px]"
          >
            CONTACT US
          </InteractiveHoverButton>
          <AnimatedThemeToggler className="h-11 w-11 border-black/8 bg-white text-black dark:border-white/10 dark:bg-[#1a1a18] dark:text-white" />
          <button
            ref={mobileMenuButtonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={menuButtonLabel}
            onClick={() => setIsOpen((current) => !current)}
            className="min-h-11 whitespace-nowrap rounded-full bg-[#e6e6e2] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#dcdcd7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:bg-[#1a1a18] dark:text-white dark:hover:bg-[#232320] dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
          >
            {isOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[95] flex flex-col justify-center bg-black px-6 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:px-20 ${
          isOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
      >
        <nav aria-label="Expanded site navigation" className="flex flex-col gap-4 text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl lg:text-8xl">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={hiddenMenuTabIndex}
              onClick={closeMenu}
              className="w-fit transition-all duration-300 hover:translate-x-4 hover:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-12 left-6 flex w-full flex-col justify-between gap-8 pr-12 text-sm font-medium uppercase tracking-widest text-white/50 md:left-20 md:flex-row md:pr-40">
          <div>
            <p className="mb-2 text-white">Get in touch</p>
            <a
              href="mailto:info@cvrconstruction.ca"
              tabIndex={hiddenMenuTabIndex}
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              info@cvrconstruction.ca
            </a>
          </div>
          <div className="flex gap-6">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={hiddenMenuTabIndex}
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
