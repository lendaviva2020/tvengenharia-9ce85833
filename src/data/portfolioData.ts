import projeto1 from "@/assets/projeto-1.jpg";
import projeto1w480 from "@/assets/projeto-1-480.jpg";
import projeto1w960 from "@/assets/projeto-1-960.jpg";
import projeto2 from "@/assets/projeto-2.jpg";
import projeto2w480 from "@/assets/projeto-2-480.jpg";
import projeto2w960 from "@/assets/projeto-2-960.jpg";
import projeto3 from "@/assets/projeto-3.jpg";
import projeto3w480 from "@/assets/projeto-3-480.jpg";
import projeto3w960 from "@/assets/projeto-3-960.jpg";
import projeto4 from "@/assets/projeto-4.jpg";
import projeto4w480 from "@/assets/projeto-4-480.jpg";
import projeto4w960 from "@/assets/projeto-4-960.jpg";
import projeto5 from "@/assets/projeto-5.jpg";
import projeto5w480 from "@/assets/projeto-5-480.jpg";
import projeto5w960 from "@/assets/projeto-5-960.jpg";
import projeto6 from "@/assets/projeto-6.jpg";
import projeto6w480 from "@/assets/projeto-6-480.jpg";
import projeto6w960 from "@/assets/projeto-6-960.jpg";
import obra1 from "@/assets/obra-1.jpg";
import obra1w480 from "@/assets/obra-1-480.jpg";
import obra1w960 from "@/assets/obra-1-960.jpg";
import obra2 from "@/assets/obra-2.jpg";
import obra2w480 from "@/assets/obra-2-480.jpg";
import obra2w960 from "@/assets/obra-2-960.jpg";
import obra3 from "@/assets/obra-3.jpg";
import obra3w480 from "@/assets/obra-3-480.jpg";
import obra3w960 from "@/assets/obra-3-960.jpg";
import obra4 from "@/assets/obra-4.jpg";
import obra4w480 from "@/assets/obra-4-480.jpg";
import obra4w960 from "@/assets/obra-4-960.jpg";

export {
  projeto1,
  projeto1w480,
  projeto1w960,
  projeto3,
};

export type Projeto = {
  id: string;
  titulo: string;
  cidade: string;
  categoria: "Residencial" | "Reforma";
  img: string;
  detalhes: string[];
};

export const projetos: Projeto[] = [
  {
    id: "p1",
    titulo: "Duas unidades geminadas",
    cidade: "Cafelândia — PR",
    categoria: "Residencial",
    img: projeto1,
    detalhes: ["2 unidades de 69,99 m²", "Lote 6x25 m cada", 'Loteamento "Jardim Ravena II"'],
  },
  {
    id: "p2",
    titulo: "Residência Parque do Café",
    cidade: "Cafelândia — PR",
    categoria: "Residencial",
    img: projeto2,
    detalhes: ["Obra de 69,99 m²", "Lote 10x20 m", 'Loteamento "Parque do Café"'],
  },
  {
    id: "p3",
    titulo: "Residência Ouro Verde",
    cidade: "Cafelândia — PR",
    categoria: "Residencial",
    img: projeto3,
    detalhes: ["Lote 8x20 m", 'Loteamento "Ouro Verde"'],
  },
  {
    id: "p4",
    titulo: "Residência Ravena II",
    cidade: "Cafelândia — PR",
    categoria: "Residencial",
    img: projeto4,
    detalhes: ["Obra de 50 m²", "Lote 6x24 m", 'Loteamento "Ravena II"'],
  },
  {
    id: "p5",
    titulo: "Revitalização de fachada e ampliação",
    cidade: "Anahy — PR",
    categoria: "Reforma",
    img: projeto5,
    detalhes: ["Obra de revitalização de fachada e ampliação", "Anahy — PR"],
  },
  {
    id: "p6",
    titulo: "Residência Ravena",
    cidade: "Cafelândia — PR",
    categoria: "Residencial",
    img: projeto6,
    detalhes: ["Obra de 57,0 m²", "Lote 7x20 m", 'Loteamento "Ravena"'],
  },
];

// Variantes redimensionadas geradas no repositório (arquivos .jpg reais),
// importadas normalmente pelo Vite — funcionam em qualquer domínio/host.
export type Variante = { w480: string; w960: string; w: number; h: number };

export const variantes: Record<string, Variante> = {
  p1: { w480: projeto1w480, w960: projeto1w960, w: 1737, h: 905 },
  p2: { w480: projeto2w480, w960: projeto2w960, w: 1738, h: 905 },
  p3: { w480: projeto3w480, w960: projeto3w960, w: 1536, h: 1024 },
  p4: { w480: projeto4w480, w960: projeto4w960, w: 1739, h: 904 },
  p5: { w480: projeto5w480, w960: projeto5w960, w: 1672, h: 941 },
  p6: { w480: projeto6w480, w960: projeto6w960, w: 1079, h: 719 },
};

export function srcSetDe(p: Projeto) {
  const v = variantes[p.id]!;
  return `${v.w480} 480w, ${v.w960} 960w, ${p.img} ${v.w}w`;
}

export const CREDITO = "Projeto: Angélica Bloinski · Execução: Tiago Visnieski";
export const categorias = ["Todos", "Residencial", "Reforma"] as const;

export const etapasObra = [
  {
    img: obra1,
    w480: obra1w480,
    w960: obra1w960,
    w: 1204,
    h: 1600,
    etapa: "Fundação",
    descricao: "Formas e armaduras do baldrame",
  },
  {
    img: obra2,
    w480: obra2w480,
    w960: obra2w960,
    w: 1600,
    h: 1200,
    etapa: "Fundação",
    descricao: "Baldrame concretado e impermeabilizado",
  },
  {
    img: obra3,
    w480: obra3w480,
    w960: obra3w960,
    w: 1440,
    h: 1920,
    etapa: "Alvenaria",
    descricao: "Levantamento das paredes e pilares",
  },
  {
    img: obra4,
    w480: obra4w480,
    w960: obra4w960,
    w: 1440,
    h: 1920,
    etapa: "Estrutura",
    descricao: "Cimbramento da laje e alvenaria em nível",
  },
] as const;
