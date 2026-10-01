import { useRef, useState } from "react";
import { SectionTitle } from "./ui";
import { PortfolioModal } from "./PortfolioModal";
import { outros } from "@/data/siteData";
import { categorias, projetos, srcSetDe, variantes, type Projeto } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

export function OutrosEPortfolio() {
  return (
    <section id="portfolio" className="border-y border-border bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker="Complementares" title="Outros serviços" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outros.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <Icon className="size-6 shrink-0 text-gold" strokeWidth={1.4} />
              <p className="font-display text-sm uppercase tracking-[0.12em]">{text}</p>
            </div>
          ))}
        </div>

        <Portfolio />
      </div>
    </section>
  );
}

function Portfolio() {
  const [filtro, setFiltro] = useState<(typeof categorias)[number]>("Todos");
  const [aberto, setAberto] = useState<Projeto | null>(null);
  const lista = projetos.filter((p) => filtro === "Todos" || p.categoria === filtro);

  const origemRef = useRef<HTMLButtonElement | null>(null);

  const abrir = (p: Projeto, el: HTMLButtonElement) => {
    origemRef.current = el;
    setAberto(p);
  };

  const fechar = () => {
    setAberto(null);
    origemRef.current?.focus();
  };

  return (
    <div className="mt-24">
      <SectionTitle kicker="Projetos executados" title="Projetos Concluídos" />

      <div className="mb-8 flex flex-wrap gap-3">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFiltro(c)}
            className={`rounded-full border px-5 py-2 font-display text-xs uppercase tracking-[0.15em] transition-colors ${
              filtro === c
                ? "border-gold bg-gold text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {lista.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={(e) => {
              abrir(p, e.currentTarget);
              trackEvent("portfolio_project_click", { projeto: p.titulo, cidade: p.cidade });
            }}
            className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
          >
            <img
              src={p.img}
              srcSet={srcSetDe(p)}
              sizes="(min-width: 1024px) 373px, (min-width: 768px) 33vw, calc(100vw - 40px)"
              width={variantes[p.id]!.w}
              height={variantes[p.id]!.h}
              alt={`${p.titulo} — ${p.cidade}`}
              loading="lazy"
              className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-5">
              <p className="font-display text-sm uppercase tracking-[0.14em]">{p.titulo}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.cidade}</p>
              <span className="mt-3 inline-block rounded-full border border-gold/40 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-gold">
                {p.categoria}
              </span>
            </div>
          </button>
        ))}
      </div>

      {aberto && <PortfolioModal projeto={aberto} onClose={fechar} />}
    </div>
  );
}
