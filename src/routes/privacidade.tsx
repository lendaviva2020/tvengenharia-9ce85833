import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/privacidade")({
  component: Privacidade,
  head: () => ({
    meta: [
      { title: "Política de Privacidade — TV Engenharia" },
      {
        name: "description",
        content:
          "Aviso de privacidade da TV Engenharia: saiba quais dados coletamos, como os usamos e seus direitos conforme a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade — TV Engenharia" },
      {
        property: "og:description",
        content:
          "Aviso de privacidade da TV Engenharia: saiba quais dados coletamos, como os usamos e seus direitos conforme a LGPD.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/privacidade` },
      { property: "og:image", content: `${SITE_URL}/web-app-manifest-512x512.png` },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { property: "og:image:alt", content: "TV Engenharia" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: `${SITE_URL}/web-app-manifest-512x512.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacidade` }],
  }),
});

function PrivacidadeHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="leading-none" aria-label="TV Engenharia — voltar ao site">
          <Logo />
        </Link>
        <Link
          to="/"
          className="rounded-full border border-gold/60 px-5 py-2.5 font-display text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
        >
          Voltar ao site
        </Link>
      </div>
    </header>
  );
}

function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <PrivacidadeHeader />
      <main className="mx-auto max-w-3xl px-5 pt-36 pb-24">
        <article className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:p-12">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-gold">
            TV Engenharia — Tiago Visnieski Engenharia
          </p>
          <h1 className="mt-4 text-3xl uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">
            Aviso de Privacidade
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Última atualização: agosto de 2026</p>

          <div className="mt-10 space-y-8 text-muted-foreground">
            <p>
              A TV Engenharia (Tiago Visnieski Engenharia) respeita a sua privacidade. Este aviso
              explica quais dados este site coleta e como eles são usados, em conformidade com a Lei
              Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>

            <section>
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-gold">
                Quais dados coletamos
              </h2>
              <ul className="space-y-4">
                <li>
                  <strong className="text-foreground">Formulário de contato:</strong> nome, telefone
                  e mensagem que você preenche. Esses dados não ficam armazenados em nenhum banco de
                  dados do site — eles são usados apenas para montar uma mensagem que é enviada
                  diretamente para o WhatsApp da nossa equipe.
                </li>
                <li>
                  <strong className="text-foreground">Dados de navegação:</strong> quando o Google
                  Analytics estiver ativo, coletamos informações anônimas e agregadas sobre o uso do
                  site (páginas visitadas, tempo de navegação, tipo de dispositivo), por meio de
                  cookies, para entender como o site é usado e melhorá-lo.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-gold">
                Para que usamos esses dados
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Responder ao seu contato e prestar atendimento.</li>
                <li>Entender como as pessoas usam o site, para melhorá-lo.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-gold">
                Compartilhamento
              </h2>
              <p>
                Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais. Os
                únicos serviços envolvidos são o{" "}
                <strong className="text-foreground">WhatsApp</strong> (para onde sua mensagem de
                contato é enviada) e o <strong className="text-foreground">Google Analytics</strong>{" "}
                (ferramenta de métricas de uso, quando ativa).
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-gold">
                Seus direitos
              </h2>
              <p>
                Conforme a LGPD, você pode solicitar a qualquer momento: confirmação de que tratamos
                seus dados, acesso a eles, correção, ou exclusão. Para isso, entre em contato pelo
                e-mail{" "}
                <a
                  href="mailto:angelicabloinski@hotmail.com"
                  className="text-gold underline transition-colors hover:text-gold-soft"
                >
                  angelicabloinski@hotmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-gold">
                Responsável
              </h2>
              <p className="text-foreground">
                TV Engenharia — Tiago Visnieski Engenharia, Cafelândia, PR.
              </p>
            </section>
          </div>
        </article>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between">
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
      </footer>
    </div>
  );
}
