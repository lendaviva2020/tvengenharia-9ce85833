import { GoldIcon, SectionTitle } from "./ui";
import { diferenciais } from "@/data/siteData";

export function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionTitle kicker="Sobre a TV Engenharia" title="Seu sonho, nossa missão!" />
      <p className="max-w-2xl text-lg text-muted-foreground">
        Nosso compromisso é entregar qualidade, segurança e tranquilidade em cada etapa da sua obra.
      </p>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {diferenciais.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
          >
            <GoldIcon>
              <Icon className="size-6" strokeWidth={1.4} />
            </GoldIcon>
            <p className="mt-6 font-display text-lg uppercase tracking-wide">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 grid gap-6 rounded-3xl border border-gold/30 bg-card p-8 shadow-[var(--shadow-soft)] md:grid-cols-2 md:p-10">
        <div>
          <h3 className="font-display text-xl uppercase tracking-wide">Tiago Visnieski</h3>
          <p className="mt-1 text-sm text-gold">Engenheiro · CREA-PR 125668/D</p>
          <a
            href="https://servicos.crea-pr.org.br/publico/profissional"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-muted-foreground underline transition-colors hover:text-gold"
          >
            Consultar registro no CREA-PR
          </a>
        </div>
        <div>
          <h3 className="font-display text-xl uppercase tracking-wide">Angélica Bloinski</h3>
          <p className="mt-1 text-sm text-gold">Engenheira Civil · CREA-PR 207026/D</p>
          <a
            href="https://servicos.crea-pr.org.br/publico/profissional"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-muted-foreground underline transition-colors hover:text-gold"
          >
            Consultar registro no CREA-PR
          </a>
        </div>
        <p className="text-muted-foreground md:col-span-2">
          Todos os projetos são acompanhados pessoalmente pela dupla técnica responsável, do
          primeiro traço à entrega das chaves.
        </p>
      </div>
    </section>
  );
}
