"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatedThemeToggler } from "@/components/AnimatedThemeToggler";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import TextRoll from "@/components/ui/text-roll";
import { navItems, socialLinks } from "@/lib/site-data";

const desktopNavItems = navItems.filter(
  (item) => item.href !== "/contact" && item.href !== "/"
);
const menuNavItems = [
  ...navItems.filter((item) => item.href === "/"),
  ...navItems.filter((item) => item.href !== "/contact" && item.href !== "/"),
];

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
  const showExpandedNav = !isPastHero && !isOpen;

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
        className="fixed bottom-4 left-1/2 z-[101] -translate-x-1/2 lg:hidden"
        style={{
          bottom: "max(env(safe-area-inset-bottom), 1rem)",
        }}
      >
        <InteractiveHoverButton
          href="/contact"
          size="sm"
          showDot={false}
          className="min-h-11 whitespace-nowrap px-5 py-2.5 text-[0.68rem] tracking-[0.1em] shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
        >
          CONTACT US
        </InteractiveHoverButton>
      </div>

      <div
        ref={menuRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-black px-5 pb-8 pt-24 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] sm:px-6 md:px-12 md:pb-12 md:pt-28 lg:px-20 ${
          isOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 6rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <div className="flex min-h-full flex-col items-center justify-center text-center">
          <nav
            aria-label="Expanded site navigation"
            className="flex flex-col items-center gap-4 text-[clamp(2.75rem,12vw,4.75rem)] font-black uppercase tracking-tighter text-white sm:text-7xl lg:text-8xl"
          >
            {menuNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={hiddenMenuTabIndex}
                onClick={closeMenu}
                className="w-fit text-center transition-all duration-300 hover:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <TextRoll className="text-[inherit] font-[inherit] tracking-[inherit] leading-[0.82]">
                  {item.label.toUpperCase()}
                </TextRoll>
              </Link>
            ))}
          </nav>

          <div className="mt-12 flex w-full max-w-[42rem] flex-col items-center gap-8 border-t border-white/12 pt-6 text-center text-sm font-medium uppercase tracking-widest text-white/50 md:mt-16 md:items-center md:justify-center">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-white">Get in touch</p>
              <a
                href="mailto:info@cvrconstruction.ca"
                tabIndex={hiddenMenuTabIndex}
                className="break-all transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                INFO@CVRCONSTRUCTION.CA
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
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
          </div>
        </div>
      </div>
    </>
  );
}
