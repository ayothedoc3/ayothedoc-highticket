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

type AttributionSnapshot = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
  captured_at?: string;
};

const FIRST_TOUCH_STORAGE_KEY = "ay_attribution_first_touch";
const LAST_TOUCH_STORAGE_KEY = "ay_attribution_last_touch";
const UTM_KEYS: Array<keyof AttributionSnapshot> = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function getMeasurementId(): string | undefined {
  if (typeof window !== "undefined") {
    const runtimeId = window.__AY_CONFIG__?.gaMeasurementId?.trim();
    if (runtimeId) return runtimeId;
  }

  const value = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();
  return value || undefined;
}

function readSnapshot(storageKey: string): AttributionSnapshot {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as AttributionSnapshot;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeSnapshot(storageKey: string, snapshot: AttributionSnapshot): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
}

function hasUtm(snapshot: AttributionSnapshot): boolean {
  return UTM_KEYS.some((key) => Boolean(snapshot[key]));
}

function collectCurrentSnapshot(): AttributionSnapshot {
  if (typeof window === "undefined" || typeof document === "undefined") return {};

  const query = new URLSearchParams(window.location.search);
  return {
    utm_source: query.get("utm_source") || undefined,
    utm_medium: query.get("utm_medium") || undefined,
    utm_campaign: query.get("utm_campaign") || undefined,
    utm_term: query.get("utm_term") || undefined,
    utm_content: query.get("utm_content") || undefined,
    referrer: document.referrer || undefined,
    landing_path: `${window.location.pathname}${window.location.search}`,
    captured_at: new Date().toISOString(),
  };
}

export function initAttribution(): void {
  if (typeof window === "undefined") return;

  const firstTouch = readSnapshot(FIRST_TOUCH_STORAGE_KEY);
  const lastTouch = readSnapshot(LAST_TOUCH_STORAGE_KEY);
  const current = collectCurrentSnapshot();

  if (!firstTouch.captured_at) {
    const initialTouch: AttributionSnapshot = hasUtm(current)
      ? current
      : {
          utm_source: "direct",
          utm_medium: "none",
          referrer: current.referrer,
          landing_path: current.landing_path,
          captured_at: current.captured_at,
        };
    writeSnapshot(FIRST_TOUCH_STORAGE_KEY, initialTouch);
  }

  const mergedLastTouch: AttributionSnapshot = {
    ...lastTouch,
    ...current,
    utm_source: current.utm_source || lastTouch.utm_source || "direct",
    utm_medium: current.utm_medium || lastTouch.utm_medium || "none",
    utm_campaign: current.utm_campaign || lastTouch.utm_campaign,
    utm_term: current.utm_term || lastTouch.utm_term,
    utm_content: current.utm_content || lastTouch.utm_content,
    referrer: current.referrer || lastTouch.referrer,
    landing_path: current.landing_path || lastTouch.landing_path,
    captured_at: current.captured_at,
  };
  writeSnapshot(LAST_TOUCH_STORAGE_KEY, mergedLastTouch);
}

export function getAttribution(): Record<string, unknown> {
  if (typeof window === "undefined") return {};

  const firstTouch = readSnapshot(FIRST_TOUCH_STORAGE_KEY);
  const lastTouch = readSnapshot(LAST_TOUCH_STORAGE_KEY);

  return {
    utm_source: lastTouch.utm_source,
    utm_medium: lastTouch.utm_medium,
    utm_campaign: lastTouch.utm_campaign,
    utm_term: lastTouch.utm_term,
    utm_content: lastTouch.utm_content,
    utm_referrer: lastTouch.referrer,
    utm_landing_path: lastTouch.landing_path,
    first_utm_source: firstTouch.utm_source,
    first_utm_medium: firstTouch.utm_medium,
    first_utm_campaign: firstTouch.utm_campaign,
    first_utm_term: firstTouch.utm_term,
    first_utm_content: firstTouch.utm_content,
    first_utm_referrer: firstTouch.referrer,
    first_utm_landing_path: firstTouch.landing_path,
  };
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
    ...getAttribution(),
  });
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  const measurementId = getMeasurementId();
  if (!measurementId) {
    if (import.meta.env.DEV) console.debug("[analytics] event", eventName, params);
    return;
  }
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    send_to: measurementId,
    ...getAttribution(),
    ...(params || {}),
  });
}

export {};
