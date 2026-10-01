import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { CREDITO, srcSetDe, variantes, type Projeto } from "@/data/portfolioData";

type PortfolioModalProps = {
  projeto: Projeto;
  onClose: () => void;
};

export function PortfolioModal({ projeto, onClose }: PortfolioModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = dialogRef.current;
    node?.focus();

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [projeto, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={projeto.titulo}
        tabIndex={-1}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card shadow-[var(--shadow-elegant)] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={projeto.img}
          srcSet={srcSetDe(projeto)}
          sizes="(min-width: 768px) 768px, calc(100vw - 32px)"
          width={variantes[projeto.id]!.w}
          height={variantes[projeto.id]!.h}
          alt={projeto.titulo}
          className="w-full rounded-t-3xl object-cover"
        />
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl uppercase tracking-[0.12em]">{projeto.titulo}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {projeto.cidade} · {projeto.categoria}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
            >
              Fechar
            </button>
          </div>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {projeto.detalhes.map((d) => (
              <li key={d} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.6} />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-border pt-4 font-serif text-sm text-gold">{CREDITO}</p>
        </div>
      </div>
    </div>
  );
}
