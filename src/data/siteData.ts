import {
  ClipboardList,
  Cog,
  KeyRound,
  PenTool,
  Layers,
  FileCheck2,
  HardHat,
  Hammer,
  Home,
  ShieldCheck,
  TrendingUp,
  Timer,
  Users,
  Banknote,
  Paintbrush,
  Box,
  Search,
} from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const WA_ANGELICA_BASE = "5545998176765";
export const WA_TIAGO_BASE = "5545999213004";
export const WA_PRE_MESSAGE = "Quero falar sobre um projeto — vim pelo site";
export const WA_DEFAULT_CONTEXT = "Cafelândia/PR";
export const COMPANY_MAP_URL = "https://maps.app.goo.gl/7dDmeSB4Z6ajR3cV6";
export const COMPANY_MAP_EMBED_URL =
  "https://www.google.com/maps?q=R.+Paulo+Szerega,+706+-+Centro,+Cafel%C3%A2ndia+-+PR,+85415-000&hl=pt-BR&z=17&output=embed";
export const THREADS_URL = "https://www.threads.com/@t.v_engenharia";

export function abs(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function whatsappLink(base: string, text: string, context?: string) {
  const fullText = context ? `${text}\n\n${context}` : text;
  return `https://wa.me/${base}?text=${encodeURIComponent(fullText)}`;
}

export const diferenciais = [
  { icon: ClipboardList, text: "Seu projeto, nossa responsabilidade." },
  { icon: Cog, text: "Sua obra, sem preocupações." },
  { icon: KeyRound, text: "Sua casa pronta para viver." },
];

export const etapas = [
  { icon: PenTool, title: "Projeto Arquitetônico" },
  { icon: Layers, title: "Projetos Complementares" },
  { icon: FileCheck2, title: "Aprovações e Documentação" },
  { icon: HardHat, title: "Gerenciamento da Obra" },
  { icon: Hammer, title: "Execução Completa" },
  { icon: Home, title: "Entrega Pronta para Morar" },
];

export const itensLote = [
  "Projeto técnico completo",
  "Aprovação junto à prefeitura",
  "Regularização e registro em cartório",
];

export const vantagens = [
  { icon: ShieldCheck, text: "Segurança Jurídica" },
  { icon: TrendingUp, text: "Valorização do Imóvel" },
  { icon: Timer, text: "Agilidade no Processo" },
  { icon: Users, text: "Equipe Especializada e Experiência" },
];

export const outros = [
  { icon: Banknote, text: "Processo para Financiamento" },
  { icon: Paintbrush, text: "Reforma" },
  { icon: Box, text: "Visualização 3D do Projeto" },
  { icon: Search, text: "Vistoria de Obra" },
];
