import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { Header } from "@/components/landing/Header";
import { ChaveNaMao } from "@/components/landing/ChaveNaMao";
import { Lotes } from "@/components/landing/Lotes";
import { OutrosEPortfolio } from "@/components/landing/OutrosEPortfolio";
import { Footer } from "@/components/landing/Footer";

const TITLE = "Serviços de Engenharia em Cafelândia/PR — TV Engenharia";
const DESC =
  "Construção chave na mão, projeto arquitetônico, desmembramento de lotes, reforma, projeto 3D e vistoria em Cafelândia/PR e região.";
const SERVICOS = [
  "Construção chave na mão",
  "Projeto arquitetônico",
  "Desmembramento e unificação de lotes",
  "Acompanhamento de financiamento",
  "Reforma residencial",
  "Projeto 3D",
  "Vistoria técnica",
];

export const Route = createFileRoute("/servicos")({
  component: Servicos,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/servicos` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/servicos` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: SERVICOS.map((name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name,
              areaServed: "Cafelândia e região, Paraná",
              provider: { "@id": `${SITE_URL}/#organizacao` },
            },
          })),
        }),
      },
    ],
  }),
});

function Servicos() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="conteudo" className="pt-24">
        <h1 className="sr-only">Serviços de engenharia em Cafelândia/PR</h1>
        <ChaveNaMao />
        <Lotes />
        <OutrosEPortfolio />
      </main>
      <Footer />
    </div>
  );
}
