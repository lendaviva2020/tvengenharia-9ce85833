import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "../lib/site";

const BRAND_IMAGES = [
  {
    loc: `${SITE_URL}/web-app-manifest-512x512.png`,
    title: "Logo TV Engenharia",
    caption: "TV Engenharia — Tiago Visnieski Engenharia",
  },
  {
    loc: `${SITE_URL}/apple-touch-icon.png`,
    title: "Ícone TV Engenharia",
  },
];

const PORTFOLIO_IMAGES = [
  { file: "hero-casa.jpg", title: "Obra residencial — TV Engenharia" },
  { file: "projeto-1.jpg", title: "Projeto concluído 1 — TV Engenharia" },
  { file: "projeto-2.jpg", title: "Projeto concluído 2 — TV Engenharia" },
  { file: "projeto-3.jpg", title: "Projeto concluído 3 — TV Engenharia" },
  { file: "projeto-4.jpg", title: "Projeto concluído 4 — TV Engenharia" },
  { file: "projeto-5.jpg", title: "Projeto concluído 5 — TV Engenharia" },
  { file: "projeto-6.jpg", title: "Projeto concluído 6 — TV Engenharia" },
].map((img) => ({
  loc: `${SITE_URL}/imagens/${img.file}`,
  title: img.title,
}));

function imageEntries(
  images: Array<{ loc: string; title: string; caption?: string }>,
) {
  return images
    .map((img) => {
      const lines = [
        `    <image:image>`,
        `      <image:loc>${img.loc}</image:loc>`,
        `      <image:title>${img.title}</image:title>`,
      ];
      if (img.caption) {
        lines.push(`      <image:caption>${img.caption}</image:caption>`);
      }
      lines.push(`    </image:image>`);
      return lines.join("\n");
    })
    .join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const homeImages = [...BRAND_IMAGES, ...PORTFOLIO_IMAGES];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
          `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          `  <url>`,
          `    <loc>${SITE_URL}/</loc>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>1.0</priority>`,
          imageEntries(homeImages),
          `  </url>`,
          `  <url>`,
          `    <loc>${SITE_URL}/privacidade</loc>`,
          `    <changefreq>yearly</changefreq>`,
          `    <priority>0.3</priority>`,
          `  </url>`,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
