"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateFromViewport = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const verticallyVisible = rect.top < viewportHeight && rect.bottom > 0;
      const horizontallyVisible = rect.left < viewportWidth && rect.right > 0;

      if (verticallyVisible && horizontallyVisible) {
        setIsVisible(true);
        return true;
      }

      if (!once) {
        setIsVisible(false);
      }

      return false;
    };

    if (typeof IntersectionObserver === "undefined") {
      updateFromViewport();
      return;
    }

    updateFromViewport();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
