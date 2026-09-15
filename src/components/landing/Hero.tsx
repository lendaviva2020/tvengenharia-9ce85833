import { trackEvent } from "@/lib/analytics";
import { projeto1, projeto1w480, projeto1w960 } from "@/data/portfolioData";
import { WA_ANGELICA_BASE, WA_DEFAULT_CONTEXT, WA_PRE_MESSAGE, whatsappLink } from "@/data/siteData";

export function Hero() {
  return (
    <section id="top" className="diagonal-gold relative flex min-h-screen items-center">
      <img
        src={projeto1}
        srcSet={`${projeto1w480} 480w, ${projeto1w960} 960w, ${projeto1} 1737w`}
        sizes="100vw"
        alt="Residência geminada Jardim Ravena II — projeto e execução TV Engenharia"
        width={1737}
        height={905}
        fetchPriority="high"
        loading="eager"
        className="hero-zoom absolute inset-0 size-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-36 pb-24">
        <p className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-gold">
          Projetos e Soluções · Cafelândia / PR
        </p>
        <h1 className="max-w-4xl text-4xl uppercase leading-[1.05] tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
          Do projeto à entrega das chaves, nós cuidamos de tudo para você.
        </h1>
        <p className="mt-7 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Projeto Chave na Mão — a TV Engenharia cuida de tudo, do projeto à execução da obra.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={whatsappLink(WA_ANGELICA_BASE, WA_PRE_MESSAGE, WA_DEFAULT_CONTEXT)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("hero_cta_click", { text: "Fale conosco e solicite um orçamento" })
            }
            className="rounded-full bg-gold px-7 py-4 text-center font-display text-sm uppercase tracking-[0.15em] text-primary-foreground shadow-[var(--shadow-elegant)] transition-opacity hover:opacity-90"
          >
            Fale conosco e solicite um orçamento
          </a>
          <a
            href="#servicos"
            className="rounded-full border border-gold/60 px-7 py-4 text-center font-display text-sm uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold/10"
          >
            Conheça os serviços
          </a>
        </div>
      </div>
    </section>
  );
}
