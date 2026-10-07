import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CONSENT_KEY, initAnalytics } from "@/lib/analytics";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(CONSENT_KEY));
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    if (value === "accepted") initAnalytics();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)] sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-sm text-muted-foreground">
        Usamos cookies de métricas (Google Analytics) para melhorar o site, somente com sua
        autorização, conforme a LGPD. Saiba mais na{" "}
        <Link to="/privacidade" className="text-gold underline">Política de Privacidade</Link>.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="rounded-full border border-border px-6 py-2.5 font-display text-xs uppercase tracking-[0.15em] text-foreground hover:border-gold"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full bg-gold px-6 py-2.5 font-display text-xs uppercase tracking-[0.15em] text-primary-foreground hover:opacity-90"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
