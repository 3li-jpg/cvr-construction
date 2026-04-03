export type AnalyticsPayload = {
  event: string;
  path?: string;
  label?: string;
  location?: string;
  method?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, string>>;
  }
}

export function trackEvent(payload: AnalyticsPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const event = {
    ...payload,
    path: payload.path ?? window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(
    Object.fromEntries(
      Object.entries(event).map(([key, value]) => [key, String(value)])
    )
  );

  window.dispatchEvent(
    new CustomEvent("cvr:analytics", {
      detail: event,
    })
  );
}
