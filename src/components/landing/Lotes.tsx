import { Check } from "lucide-react";
import { GoldIcon, SectionTitle } from "./ui";
import { itensLote, vantagens } from "@/data/siteData";

const blocos = [
  {
    title: "Desmembramento de Lotes",
    desc: "Transformamos um terreno maior em dois ou mais lotes menores, de forma legal e segura.",
    highlight: "Mais valor para o seu patrimônio!",
  },
  {
    title: "Unificação de Lotes",
    desc: "Unimos dois ou mais lotes em um único terreno, garantindo mais espaço e possibilidades para o seu projeto.",
    highlight: "Mais espaço. Mais liberdade. Mais valor!",
  },
];

export function Lotes() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionTitle kicker="Regularização" title="Soluções para o seu terreno" />
      <div className="grid gap-8 md:grid-cols-2">
        {blocos.map((b) => (
          <div
            key={b.title}
            className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:p-10"
          >
            <h3 className="font-display text-2xl uppercase tracking-wide">{b.title}</h3>
            <p className="mt-4 text-muted-foreground">{b.desc}</p>
            <ul className="mt-7 space-y-3">
              {itensLote.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={2} />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-lg uppercase tracking-wide text-gold">
              {b.highlight}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-8 border-t border-gold/30 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {vantagens.map(({ icon: Icon, text }) => (
          <div key={text} className="flex flex-col items-center gap-4 text-center">
            <GoldIcon>
              <Icon className="size-6" strokeWidth={1.4} />
            </GoldIcon>
            <p className="font-display text-sm uppercase tracking-[0.15em]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
