import { z } from "zod";
export type UniversityEvalForm = {
  food: number;
  dorm: number;
  conv: number;
  campus: number;
  overall: number;
  comment?: string;
};
export const createUniversityEvalSchema = <T extends { validate: { requiredStar: string } }>(
  text: T,
) => {
  const msg = text.validate.requiredStar;
  const star = z.number().refine((v) => v >= 0.5, { message: msg });
  return z.object({
    food: star,
    dorm: star,
    conv: star,
    campus: star,
    overall: star,
    comment: z.string().optional(),
  });
};
