"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SORO_EMBED_SRC =
  "https://app.trysoro.com/api/embed/1985232b-5886-4796-b142-1cfaa7959cef?theme=dark";

const getBrowserLocationKey = () =>
  typeof window === "undefined"
    ? ""
    : `${window.location.pathname}${window.location.search}`;

export function SoroBlogEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [locationKey, setLocationKey] = useState(getBrowserLocationKey);

  const getLocationKey = useCallback(() => getBrowserLocationKey(), []);

  const updateLocationKey = useCallback(() => {
    setLocationKey((currentLocationKey) => {
      const nextLocationKey = getLocationKey();
      return currentLocationKey === nextLocationKey
        ? currentLocationKey
        : nextLocationKey;
    });
  }, [getLocationKey]);

  useEffect(() => {
    window.addEventListener("popstate", updateLocationKey);

    return () => {
      window.removeEventListener("popstate", updateLocationKey);
    };
  }, [updateLocationKey]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="/journals"]'
      );
      if (!link) return;

      event.preventDefault();
      event.stopPropagation();
      const nextUrl = new URL(link.href, window.location.origin);
      const nextLocationKey = `${nextUrl.pathname}${nextUrl.search}`;
      if (getLocationKey() !== nextLocationKey) {
        window.history.pushState(null, "", nextLocationKey);
      }
      setLocationKey(nextLocationKey);
      window.setTimeout(() => {
        container.scrollIntoView({ block: "start", behavior: "smooth" });
      }, 120);
    };

    container.addEventListener("click", handleClick, true);

    return () => {
      container.removeEventListener("click", handleClick, true);
    };
  }, [getLocationKey]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !locationKey) return;

    container.innerHTML =
      '<div class="soro-blog-loading">Loading journal articles...</div>';
    document
      .querySelectorAll('script[data-soro-blog-embed="true"]')
      .forEach((script) => script.remove());

    const script = document.createElement("script");
    script.src = SORO_EMBED_SRC;
    script.defer = true;
    script.dataset.soroBlogEmbed = "true";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [locationKey]);

  return <div id="soro-blog" ref={containerRef} className="min-h-[24rem]" />;
}
