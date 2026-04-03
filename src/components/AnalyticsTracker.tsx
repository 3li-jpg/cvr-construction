"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const search =
      typeof window === "undefined" ? "" : window.location.search;
    const path = search ? `${pathname}${search}` : pathname;
    trackEvent({
      event: "page_view",
      path,
    });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trackedElement = target.closest<HTMLElement>("[data-analytics-event]");

      if (!trackedElement?.dataset.analyticsEvent) {
        return;
      }

      trackEvent({
        event: trackedElement.dataset.analyticsEvent,
        label: trackedElement.dataset.analyticsLabel,
        location: trackedElement.dataset.analyticsLocation,
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
