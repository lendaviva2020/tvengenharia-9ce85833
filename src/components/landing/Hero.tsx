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
        <h1 className="max-w-4xl text-4xl uppercase leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          TV Engenharia
        </h1>
        <p className="mt-5 max-w-xl text-base text-foreground sm:text-lg">
          Projetos e execução com excelência.
        </p>
        <div className="mt-8 flex">
          <a
            href={whatsappLink(WA_ANGELICA_BASE, WA_PRE_MESSAGE, WA_DEFAULT_CONTEXT)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("hero_cta_click", { text: "Fale sobre seu projeto" })
            }
            className="rounded-full bg-gold px-7 py-4 text-center font-display text-sm uppercase tracking-[0.15em] text-primary-foreground shadow-[var(--shadow-elegant)] transition-opacity hover:opacity-90"
          >
            Fale sobre seu projeto
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
