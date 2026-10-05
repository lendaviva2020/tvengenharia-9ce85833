import { trackEvent } from "@/lib/analytics";
import heroVideo from "@/assets/hero-flythrough.mp4";
import heroVideoWebm from "@/assets/hero-flythrough.webm";
import heroPoster from "@/assets/hero-flythrough-poster.jpg";
import { useHeroVideo } from "@/hooks/use-hero-video";
import { WA_ANGELICA_BASE, WA_DEFAULT_CONTEXT, WA_PRE_MESSAGE, whatsappLink } from "@/data/siteData";

export function Hero() {
  const { sectionRef, videoRef, layerRef, enabled, ready } = useHeroVideo();
  return (
    <section ref={sectionRef} id="top" className="hero-scroll-section relative">
      <div className="diagonal-gold hero-stage relative flex min-h-screen items-center overflow-hidden">
      <div ref={layerRef} className="hero-video-layer absolute inset-0" aria-hidden="true">
      <img
        src={heroPoster}
        alt=""
        width={720}
        height={1280}
        fetchPriority="high"
        loading="eager"
        className="hero-media absolute inset-0 size-full object-cover"
      />
      {enabled && <video
        ref={videoRef}
        poster={heroPoster}
        muted
        playsInline
        preload="auto"
        width={720}
        height={1280}
        className={`hero-media absolute inset-0 size-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <source src={heroVideoWebm} type="video/webm" />
        <source src={heroVideo} type="video/mp4" />
      </video>}
      </div>
      <div className="hero-shade absolute inset-0" />
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
      </div>
    </section>
  );
}
