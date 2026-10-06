import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { FileText, LoaderCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateConstructionBrief } from "@/lib/brief.functions";
import { formatBrief, type ConstructionBrief } from "@/lib/brief-schema";
import { WA_ANGELICA_BASE, whatsappLink } from "@/data/siteData";
import { trackEvent } from "@/lib/analytics";

export function Briefing() {
  const generate = useServerFn(generateConstructionBrief);
  const [relato, setRelato] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<ConstructionBrief | null>(null);
  const [error, setError] = useState("");
  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    setError("");
    if (relato.trim().length < 20 || !consent) { setError("Descreva sua obra com pelo menos 20 caracteres e autorize a análise."); return; }
    setLoading(true); setBrief(null); trackEvent("brief_generate_click");
    try {
      const result = await generate({ data: { relato, consent: true } });
      if (result.ok) { setBrief(result.brief); trackEvent("brief_generate_success"); }
      else setError(result.message);
    } catch { setError("Não foi possível concluir a análise. Seu relato foi preservado; você pode continuar pelo WhatsApp."); }
    finally { setLoading(false); }
  }
  return (
    <div className="mb-14 border-y border-border py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-5">
          <h3 className="font-display text-2xl uppercase text-gold">Briefing da sua obra</h3>
          <label htmlFor="relato-obra" className="block text-sm text-foreground">Conte o que deseja construir ou reformar</label>
          <textarea id="relato-obra" rows={6} minLength={20} maxLength={4000} required disabled={loading}
            value={relato} onChange={(event) => { setRelato(event.target.value); setBrief(null); setError(""); }}
            aria-describedby="brief-privacy brief-error" aria-invalid={Boolean(error)}
            placeholder="Quero construir uma casa térrea em Cafelândia. Tenho um terreno de 300 m² e desejo projeto e execução…"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-gold" />
          <label id="brief-privacy" className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
            <input type="checkbox" checked={consent} disabled={loading} required onChange={(event) => setConsent(event.target.checked)} className="mt-1 size-4 shrink-0 accent-primary" />
            <span>Autorizo o processamento do relato por inteligência artificial. Não inclua dados sensíveis. O relato não é salvo no banco do site. <Link to="/privacidade" className="text-gold underline">Política de Privacidade</Link></span>
          </label>
          <Button type="submit" disabled={loading} className="h-auto rounded-full px-6 py-3">
            {loading ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <FileText />}
            {loading ? "Organizando briefing…" : "Organizar briefing"}
          </Button>
          <p id="brief-error" role={error ? "alert" : undefined} className="text-sm text-destructive">{error}</p>
          {loading && <p role="status" className="text-sm text-muted-foreground">Analisando seu relato…</p>}
        </form>
        <div aria-live="polite" aria-busy={loading}>
          {brief ? <div className="space-y-6">
            <h3 className="font-display text-2xl uppercase text-gold">Seu briefing inicial</h3>
            <div><h4 className="mb-2 font-display uppercase text-gold">Tipo de serviço</h4><p>{brief.tipoServico}</p></div>
            <p className="break-words text-muted-foreground">{brief.resumo}</p>
            <div><h4 className="mb-2 font-display uppercase text-gold">Etapas desejadas</h4><ul className="list-disc space-y-2 pl-5 text-sm">{brief.etapasDesejadas.map((item, i) => <li key={i} className="break-words">{item}</li>)}</ul></div>
            <div><h4 className="mb-2 font-display uppercase text-gold">Informações a confirmar</h4><ul className="list-disc space-y-2 pl-5 text-sm">{brief.informacoesFaltantes.map((item, i) => <li key={i} className="break-words">{item}</li>)}</ul></div>
            <p className="text-xs text-muted-foreground">Briefing preliminar sujeito à avaliação da equipe. Não constitui orçamento ou parecer técnico.</p>
            <Button asChild className="h-auto max-w-full whitespace-normal rounded-full px-6 py-3"><a href={whatsappLink(WA_ANGELICA_BASE, `Olá! Vim pelo site da TV Engenharia e gostaria de conversar sobre este projeto.\n\n${formatBrief(brief)}`)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("brief_whatsapp_click")}><MessageCircle />Enviar briefing pelo WhatsApp</a></Button>
          </div> : <div className="flex h-full min-h-48 items-center border-l border-gold/40 pl-6">
            <div><FileText className="mb-5 size-8 text-gold" strokeWidth={1.4} /><h3 className="font-display text-xl uppercase">Seu projeto começa aqui</h3><p className="mt-3 max-w-sm text-sm text-muted-foreground">Construção · Reforma · Projeto · Regularização</p></div>
          </div>}
        </div>
      </div>
    </div>
  );
}