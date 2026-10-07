import { Link } from "@tanstack/react-router";
import { AtSign, Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/Logo";
import { THREADS_URL } from "@/data/siteData";

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
        <p className="leading-none">
          <Logo width={110} tagline={false} />
        </p>
        <nav aria-label="Rodapé" className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-display text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <a href="/#sobre" className="hover:text-gold">Sobre</a>
          <a href="/#servicos" className="hover:text-gold">Serviços</a>
          <a href="/#portfolio" className="hover:text-gold">Portfólio</a>
          <a href="/#contato" className="hover:text-gold">Contato</a>
        </nav>
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground sm:flex-row sm:gap-4">
          <a href="tel:+5545999213004" className="hover:text-gold">(45) 99921-3004</a>
          <a href="tel:+5545998176765" className="hover:text-gold">(45) 99817-6765</a>
          <a href="mailto:angelicabloinski@hotmail.com" className="break-all hover:text-gold">angelicabloinski@hotmail.com</a>
        </div>
        <div className="flex items-center gap-6 text-gold">
          <a
            href="https://instagram.com/t.v_engenharia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @t.v_engenharia"
          >
            <Instagram className="size-5" strokeWidth={1.5} />
          </a>
          <a
            href={THREADS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads @t.v_engenharia"
          >
            <AtSign className="size-5" strokeWidth={1.5} />
          </a>
          <a
            href="https://www.facebook.com/share/1DijWGi1sU/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook TV Engenharia"
          >
            <Facebook className="size-5" strokeWidth={1.5} />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          Tiago Visnieski — CREA-PR 125668/D · Angélica Bloinski — CREA-PR 207026/D · Cafelândia e
          região, Paraná
        </p>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TV Engenharia — Projetos e Soluções
          </p>
          <Link
            to="/privacidade"
            className="text-xs text-muted-foreground underline transition-colors hover:text-gold"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
