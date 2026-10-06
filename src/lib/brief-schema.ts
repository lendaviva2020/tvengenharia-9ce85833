import { z } from "zod";

export const briefSchema = z.object({
  tipoServico: z.string(),
  resumo: z.string(),
  etapasDesejadas: z.array(z.string()),
  informacoesFaltantes: z.array(z.string()),
});
export type ConstructionBrief = z.infer<typeof briefSchema>;
export type BriefResult = { ok: true; brief: ConstructionBrief } | { ok: false; status: number; message: string };
export function formatBrief(brief: ConstructionBrief) {
  return `Briefing da obra\n\nServiço: ${brief.tipoServico}\n\n${brief.resumo}\n\nEtapas desejadas:\n${brief.etapasDesejadas.map((step) => `• ${step}`).join("\n")}\n\nInformações a confirmar:\n${brief.informacoesFaltantes.map((item) => `• ${item}`).join("\n")}`;
}