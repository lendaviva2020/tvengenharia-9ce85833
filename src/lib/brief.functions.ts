import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import type { BriefResult } from "./brief-schema";

export const generateConstructionBrief = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ relato: z.string().trim().min(20).max(4000), consent: z.literal(true) }).parse(input))
  .handler(async ({ data }): Promise<BriefResult> => {
    const { generateBrief } = await import("./brief.server");
    return generateBrief(getRequest(), data.relato);
  });