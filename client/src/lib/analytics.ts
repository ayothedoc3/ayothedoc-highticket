declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __ay_ga_initialized__?: boolean;
    __AY_CONFIG__?: {
      gaMeasurementId?: string;
      stripe?: {
        roadmap?: string;
        sprint?: string;
        care?: string;
      };
    };
  }
}

function getMeasurementId(): string | undefined {
  if (typeof window !== "undefined") {
    const runtimeId = window.__AY_CONFIG__?.gaMeasurementId?.trim();
    if (runtimeId) return runtimeId;
  }

  const value = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();
  return value || undefined;
}

export function initAnalytics(): void {
  const measurementId = getMeasurementId();
  if (!measurementId) return;
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__ay_ga_initialized__) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptSrc;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  window.__ay_ga_initialized__ = true;
}

export function trackPageView(path: string): void {
  const measurementId = getMeasurementId();
  if (!measurementId) {
    if (import.meta.env.DEV) console.debug("[analytics] page_view", path);
    return;
  }
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    send_to: measurementId,
    page_path: path,
    page_title: document.title,
  });
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  const measurementId = getMeasurementId();
  if (!measurementId) {
    if (import.meta.env.DEV) console.debug("[analytics] event", eventName, params);
    return;
  }
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, { send_to: measurementId, ...(params || {}) });
}

export {};
