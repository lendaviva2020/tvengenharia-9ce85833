// Measurement ID do GA4: defina VITE_GA_MEASUREMENT_ID na hospedagem para trocar.
const GA_MEASUREMENT_ID: string =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || "G-DB7E1P9SYN";
export const CONSENT_KEY = "tv-cookie-consent";

export function hasAnalyticsConsent() {
  return typeof window !== "undefined" && window.localStorage.getItem(CONSENT_KEY) === "accepted";
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isRealGaId(id: string) {
  return /^G-[A-Z0-9]+$/i.test(id);
}

function injectGtag() {
  if (typeof window === "undefined" || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

/** Carrega o gtag só com ID real, depois do load da página (não bloqueia a 1ª renderização). */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (!isRealGaId(GA_MEASUREMENT_ID) || !hasAnalyticsConsent()) return;

  const schedule = () => {
    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      ric(() => injectGtag(), { timeout: 4000 });
    } else {
      window.setTimeout(injectGtag, 1);
    }
  };

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params ?? {});
}
