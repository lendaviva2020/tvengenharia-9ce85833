import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { WA_ANGELICA_BASE, WA_DEFAULT_CONTEXT, WA_PRE_MESSAGE, whatsappLink } from "@/data/siteData";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const apply = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="leading-none" aria-label="TV Engenharia — voltar ao topo">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 font-display text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <a href="#sobre" className="transition-colors hover:text-gold">
            Sobre
          </a>
          <a href="#servicos" className="transition-colors hover:text-gold">
            Serviços
          </a>
          <a href="#portfolio" className="transition-colors hover:text-gold">
            Portfólio
          </a>
          <a href="#contato" className="transition-colors hover:text-gold">
            Contato
          </a>
        </nav>
        <a
          href={whatsappLink(WA_ANGELICA_BASE, WA_PRE_MESSAGE, WA_DEFAULT_CONTEXT)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gold px-5 py-2.5 font-display text-xs uppercase tracking-[0.18em] text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
        >
          Fale no WhatsApp
        </a>
      </div>
    </header>
  );
}
