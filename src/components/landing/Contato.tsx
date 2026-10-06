import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionTitle } from "./ui";
import { Briefing } from "./Briefing";
import { trackEvent } from "@/lib/analytics";
import {
  COMPANY_MAP_EMBED_URL,
  COMPANY_MAP_URL,
  WA_ANGELICA_BASE,
  WA_DEFAULT_CONTEXT,
  WA_PRE_MESSAGE,
  WA_TIAGO_BASE,
  whatsappLink,
} from "@/data/siteData";

type FormErrors = {
  nome?: string;
  telefone?: string;
  bairroCidade?: string;
  mensagem?: string;
};

export function Contato() {
  const [form, setForm] = useState({ nome: "", telefone: "", bairroCidade: "", mensagem: "" });
  const [mapaAtivo, setMapaAtivo] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.nome.trim() || form.nome.length > 100) nextErrors.nome = "Informe seu nome.";
    if (!form.telefone.trim() || form.telefone.length > 40) {
      nextErrors.telefone = "Informe um telefone válido.";
    }
    if (!form.bairroCidade.trim() || form.bairroCidade.length > 120) {
      nextErrors.bairroCidade = "Informe o bairro e a cidade.";
    }
    if (!form.mensagem.trim() || form.mensagem.length > 1000) {
      nextErrors.mensagem = "Escreva sua mensagem (até 1000 caracteres).";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    trackEvent("contact_form_submit");

    const texto = `Olá! Vim pelo site da TV Engenharia e gostaria de saber mais.\n\n${form.mensagem}\n\nMeu nome é ${form.nome}, sou de ${form.bairroCidade}. Pode me chamar no ${form.telefone}!`;
    window.open(whatsappLink(WA_ANGELICA_BASE, texto), "_blank", "noopener");
  };

  return (
    <section id="contato" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionTitle kicker="Contato" title="Vamos tirar seu projeto do papel?" />
      <Briefing />
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="text-lg text-muted-foreground">
            Chame a nossa equipe no WhatsApp e conte sobre o seu terreno ou a sua obra. Atendemos
            Cafelândia e região, no Paraná.
          </p>
          <a
            href={whatsappLink(WA_ANGELICA_BASE, WA_PRE_MESSAGE, WA_DEFAULT_CONTEXT)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-5 text-center font-display text-sm uppercase tracking-[0.15em] text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-5" strokeWidth={1.6} />
            Fale conosco e solicite um orçamento
          </a>
          <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gold/40 p-5">
              <p className="font-display text-sm uppercase tracking-wide">Tiago Visnieski</p>
              <a href="tel:+5545999213004" className="mt-1 block text-sm text-gold hover:underline">
                (45) 99921-3004
              </a>
              <a
                href={whatsappLink(WA_TIAGO_BASE, WA_PRE_MESSAGE, WA_DEFAULT_CONTEXT)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_tiago_click", { profissional: "Tiago Visnieski" })
                }
                className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-gold"
              >
                <MessageCircle className="size-3.5" strokeWidth={1.6} />
                WhatsApp
              </a>
            </div>
            <div className="rounded-2xl border border-gold/40 p-5">
              <p className="font-display text-sm uppercase tracking-wide">Angélica Bloinski</p>
              <a href="tel:+5545998176765" className="mt-1 block text-sm text-gold hover:underline">
                (45) 99817-6765
              </a>
              <a
                href={whatsappLink(WA_ANGELICA_BASE, WA_PRE_MESSAGE, WA_DEFAULT_CONTEXT)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_angelica_click", { profissional: "Angélica Bloinski" })
                }
                className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-gold"
              >
                <MessageCircle className="size-3.5" strokeWidth={1.6} />
                WhatsApp
              </a>
            </div>
            <a
              href="mailto:angelicabloinski@hotmail.com"
              className="min-w-0 rounded-2xl border border-gold/40 p-5 transition-colors hover:bg-gold/10"
            >
              <p className="font-display text-sm uppercase tracking-wide">E-mail</p>
              <p className="mt-1 flex min-w-0 items-start gap-1.5 text-xs text-gold sm:text-[13px]">
                <Mail className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.6} />
                <span className="min-w-0 break-all [overflow-wrap:anywhere]">
                  angelicabloinski@hotmail.com
                </span>
              </p>
            </a>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
        >
          <div>
            <label
              htmlFor="nome"
              className="font-display text-xs uppercase tracking-[0.2em] text-gold"
            >
              Nome
            </label>
            <input
              id="nome"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              maxLength={100}
              aria-invalid={errors.nome ? true : undefined}
              aria-describedby={errors.nome ? "nome-erro" : undefined}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold"
            />
            {errors.nome ? (
              <p id="nome-erro" role="alert" className="mt-1 text-xs text-destructive">
                {errors.nome}
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="telefone"
              className="font-display text-xs uppercase tracking-[0.2em] text-gold"
            >
              Telefone
            </label>
            <input
              id="telefone"
              required
              inputMode="tel"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              maxLength={40}
              aria-invalid={errors.telefone ? true : undefined}
              aria-describedby={errors.telefone ? "telefone-erro" : undefined}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold"
            />
            {errors.telefone ? (
              <p id="telefone-erro" role="alert" className="mt-1 text-xs text-destructive">
                {errors.telefone}
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="bairroCidade"
              className="font-display text-xs uppercase tracking-[0.2em] text-gold"
            >
              Bairro / Cidade
            </label>
            <input
              id="bairroCidade"
              required
              value={form.bairroCidade}
              onChange={(e) => setForm({ ...form, bairroCidade: e.target.value })}
              maxLength={120}
              aria-invalid={errors.bairroCidade ? true : undefined}
              aria-describedby={errors.bairroCidade ? "bairroCidade-erro" : undefined}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold"
            />
            {errors.bairroCidade ? (
              <p id="bairroCidade-erro" role="alert" className="mt-1 text-xs text-destructive">
                {errors.bairroCidade}
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="mensagem"
              className="font-display text-xs uppercase tracking-[0.2em] text-gold"
            >
              Mensagem
            </label>
            <textarea
              id="mensagem"
              rows={4}
              required
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              maxLength={1000}
              aria-invalid={errors.mensagem ? true : undefined}
              aria-describedby={errors.mensagem ? "mensagem-erro" : undefined}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold"
            />
            {errors.mensagem ? (
              <p id="mensagem-erro" role="alert" className="mt-1 text-xs text-destructive">
                {errors.mensagem}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gold px-6 py-4 font-display text-sm uppercase tracking-[0.15em] text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
          >
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
      <div className="mt-16">
        <p className="mb-4 text-center font-display text-sm uppercase tracking-[0.2em] text-gold">
          Atendemos Cafelândia e região
        </p>
        <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
          {mapaAtivo ? (
            <iframe
              title="Localização — R. Paulo Szerega, 706, Cafelândia/PR"
              src={COMPANY_MAP_EMBED_URL}
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setMapaAtivo(true);
                trackEvent("map_load_click");
              }}
              className="flex h-[360px] w-full flex-col items-center justify-center gap-4 bg-secondary/40 bg-[radial-gradient(circle_at_30%_30%,rgba(201,162,39,0.12),transparent_60%)] transition-colors hover:bg-secondary/60"
            >
              <MapPin className="size-8 text-gold" strokeWidth={1.4} />
              <span className="font-display text-sm uppercase tracking-[0.15em] text-foreground">
                Carregar mapa
              </span>
              <span className="max-w-xs px-6 text-center text-xs text-muted-foreground">
                R. Paulo Szerega, 706 — Cafelândia/PR. O mapa é carregado sob clique para preservar
                sua privacidade e acelerar a página.
              </span>
            </button>
          )}
        </div>
        <div className="mt-6 text-center">
          <a
            href={COMPANY_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-gold/50 px-6 py-3 font-display text-xs uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold/10"
          >
            Abrir localização no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
