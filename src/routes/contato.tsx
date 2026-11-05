import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { Header } from "@/components/landing/Header";
import { Contato } from "@/components/landing/Contato";
import { Footer } from "@/components/landing/Footer";

const TITLE = "Contato e Localização — TV Engenharia em Cafelândia/PR";
const DESC =
  "Fale com a TV Engenharia pelo WhatsApp, telefone ou e-mail. Veja o mapa e trace a rota até o escritório na Rua Paulo Szerega, Cafelândia/PR.";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contato` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contato` }],
  }),
});

function ContatoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="conteudo" className="pt-24">
        <h1 className="sr-only">Contato da TV Engenharia em Cafelândia/PR</h1>
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
