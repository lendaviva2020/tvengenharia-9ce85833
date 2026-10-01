import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site";
import { projeto3, projetos } from "@/data/portfolioData";
import {
  abs,
  WA_ANGELICA_BASE,
  WA_DEFAULT_CONTEXT,
  WA_PRE_MESSAGE,
  whatsappLink,
} from "@/data/siteData";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Sobre } from "@/components/landing/Sobre";
import { ChaveNaMao } from "@/components/landing/ChaveNaMao";
import { Lotes } from "@/components/landing/Lotes";
import { OutrosEPortfolio } from "@/components/landing/OutrosEPortfolio";
import { Bastidores } from "@/components/landing/Bastidores";
import { Contato } from "@/components/landing/Contato";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TV Engenharia — Projetos e Soluções em Cafelândia/PR" },
      {
        name: "description",
        content:
          "Projeto chave na mão, projetos arquitetônicos, desmembramento e unificação de lotes, financiamento e reformas em Cafelândia e região, Paraná.",
      },
      { property: "og:title", content: "TV Engenharia — Projetos e Soluções em Cafelândia/PR" },
      {
        property: "og:description",
        content:
          "Do projeto à entrega das chaves: engenharia completa em Cafelândia e região, PR. CREA-PR.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: abs(projeto3) },
      { name: "twitter:image", content: abs(projeto3) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#organizacao`,
          url: `${SITE_URL}/`,
          name: "TV Engenharia — Tiago Visnieski Engenharia",
          description:
            "Projetos arquitetônicos, construção chave na mão, desmembramento e unificação de lotes.",
          areaServed: "Cafelândia e região, Paraná",
          telephone: ["+5545999213004", "+5545998176765"],
          email: "angelicabloinski@hotmail.com",
          logo: `${SITE_URL}/web-app-manifest-512x512.png`,
          image: [`${SITE_URL}/web-app-manifest-512x512.png`, abs(projeto3)],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cafelândia",
            addressRegion: "PR",
            addressCountry: "BR",
          },
          sameAs: [
            "https://instagram.com/t.v_engenharia",
            "https://www.threads.com/@t.v_engenharia",
            "https://www.facebook.com/share/1DijWGi1sU/",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Projetos concluídos — TV Engenharia",
          numberOfItems: projetos.length,
          itemListElement: projetos.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "CreativeWork",
              "@id": `${SITE_URL}/#projeto-${p.id}`,
              name: p.titulo,
              genre: p.categoria,
              description: `${p.detalhes.join(" · ")} — ${p.cidade}.`,
              image: abs(p.img),
              locationCreated: {
                "@type": "Place",
                name: p.cidade,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: p.cidade.split(" — ")[0],
                  addressRegion: "PR",
                  addressCountry: "BR",
                },
              },
              creator: [
                { "@type": "Person", name: "Angélica Bloinski", jobTitle: "Projeto" },
                { "@type": "Person", name: "Tiago Visnieski", jobTitle: "Execução" },
              ],
              provider: { "@id": `${SITE_URL}/#organizacao` },
            },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#conteudo"
        className="sr-only rounded-full bg-gold px-5 py-3 font-display text-xs uppercase tracking-[0.15em] text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Sobre />
        <ChaveNaMao />
        <Lotes />
        <OutrosEPortfolio />
        <Bastidores />
        <Contato />
      </main>
      <Footer />
      <a
        href={whatsappLink(WA_ANGELICA_BASE, WA_PRE_MESSAGE, WA_DEFAULT_CONTEXT)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        onClick={() => trackEvent("whatsapp_floating_click")}
        className="fixed bottom-6 right-6 z-50 inline-flex size-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:scale-105"
      >
        <MessageCircle className="size-7" strokeWidth={1.6} />
      </a>
    </div>
  );
}
