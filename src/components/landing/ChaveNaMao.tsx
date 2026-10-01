import { SectionTitle } from "./ui";
import { etapas } from "@/data/siteData";

export function ChaveNaMao() {
  return (
    <section id="servicos" className="border-y border-border bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker="Serviço principal" title="Projeto Chave na Mão" />
        <div className="relative grid gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="absolute inset-x-0 top-7 hidden h-px bg-gold/30 lg:block" />
          {etapas.map(({ icon: Icon, title }, i) => (
            <div key={title} className="relative text-center">
              <div className="flex justify-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/50 bg-background text-gold">
                  <Icon className="size-6" strokeWidth={1.4} />
                </span>
              </div>
              <p className="mt-4 font-display text-xs uppercase tracking-[0.25em] text-gold">
                Etapa {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-base uppercase leading-snug tracking-wide">
                {title}
              </p>
            </div>
          ))}
        </div>
        <div className="ribbon-gold mx-auto mt-16 max-w-4xl px-12 py-6 text-center">
          <p className="font-display text-sm uppercase tracking-[0.15em] sm:text-lg">
            Do projeto à entrega das chaves, nós cuidamos de tudo para você!
          </p>
        </div>
      </div>
    </section>
  );
}
