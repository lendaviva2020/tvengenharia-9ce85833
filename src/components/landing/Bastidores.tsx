import { useRef, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { etapasObra } from "@/data/portfolioData";

export function Bastidores() {
  const trilhoRef = useRef<HTMLDivElement | null>(null);

  const rolar = (dir: number) => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    trilho.scrollBy({ left: dir * trilho.clientWidth * 0.8, behavior: "smooth" });
  };

  const onTrilhoKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      rolar(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      rolar(-1);
    }
  };

  return (
    <section
      id="bastidores"
      aria-labelledby="bastidores-titulo"
      className="mx-auto max-w-6xl px-5 py-24 md:py-32"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-display text-xs uppercase tracking-[0.35em] text-gold">
            Bastidores da obra
          </p>
          <h2
            id="bastidores-titulo"
            className="max-w-3xl text-3xl uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl"
          >
            Da fundação às chaves
          </h2>
          <div className="mt-5 h-px w-24 bg-gold" />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Fotos reais da obra da Residência Ravena, registradas durante a execução — porque
            confiança se constrói mostrando o processo, não só o resultado.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => rolar(-1)}
            aria-label="Foto anterior"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => rolar(1)}
            aria-label="Próxima foto"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={trilhoRef}
        tabIndex={0}
        role="group"
        aria-label="Fotos da obra — use as setas do teclado para navegar"
        onKeyDown={onTrilhoKeyDown}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 outline-none [scrollbar-width:thin] focus-visible:ring-2 focus-visible:ring-gold"
      >
        {etapasObra.map((foto, i) => (
          <figure
            key={foto.img}
            className="group w-[78vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
          >
            <img
              src={foto.img}
              srcSet={`${foto.w480} 480w, ${foto.w960} 960w, ${foto.img} ${foto.w}w`}
              sizes="(min-width: 640px) 384px, 78vw"
              alt={`Obra da Residência Ravena — ${foto.etapa}: ${foto.descricao}`}
              width={foto.w}
              height={foto.h}
              loading={i === 0 ? "eager" : "lazy"}
              className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-display text-sm uppercase tracking-[0.12em]">{foto.etapa}</p>
                <p className="mt-1 text-xs text-muted-foreground">{foto.descricao}</p>
              </div>
              <span className="shrink-0 font-display text-xs tracking-[0.2em] text-gold">
                {String(i + 1).padStart(2, "0")}/{String(etapasObra.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Residência Ravena · Loteamento Ravena, Cafelândia/PR — Projeto: Angélica Bloinski ·
        Execução: Tiago Visnieski
      </p>
    </section>
  );
}
