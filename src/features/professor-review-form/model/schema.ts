import { z } from "zod";

export type ProfessorEvalForm = {
  thesisPerf: number;
  labPerf: number;
  thesisReview?: string;
};

export const createProfessorEvalSchema = <T extends { validate: { requiredStar: string } }>(
  text: T,
) => {
  const msg = text.validate.requiredStar;
  return z.object({
    thesisPerf: z.number().refine((v) => v >= 0.5, { message: msg }),
    labPerf: z.number().refine((v) => v >= 0.5, { message: msg }),
    thesisReview: z.string().optional(),
  });
};
