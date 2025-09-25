import { z } from "zod";

export type CourseEvalForm = {
  year: number;
  term: number;
  gradeKindness: number;
  examDifficulty: number;
  lectureSkill: number;
  taskAmount: string;
  teamProject: string;
  comment?: string;
};

export const createCourseEvalSchema = <
  TText extends {
    validate: {
      yearRequired: string;
      yearInvalid: string;
      yearRange: string;
      termRequired: string;
      termInvalid: string;
      requiredStar: string;
      selectRequired: string;
    };
  },
>(
  text: TText,
) => {
  const V = text.validate;

  const year = z
    .number()
    .refine((v) => Number.isFinite(v), { message: V.yearRequired })
    .int({ message: V.yearInvalid })
    .min(1900, { message: V.yearRange })
    .max(2100, { message: V.yearRange });

  const term = z
    .number()
    .refine((v) => Number.isFinite(v), { message: V.termRequired })
    .int({ message: V.termInvalid })
    .refine((v) => v === 1 || v === 2, { message: V.termInvalid });

  const star = z.number().refine((v) => v >= 0.5, { message: V.requiredStar });

  return z.object({
    year,
    term,
    gradeKindness: star,
    examDifficulty: star,
    lectureSkill: star,
    taskAmount: z.string().min(1, V.selectRequired),
    teamProject: z.string().min(1, V.selectRequired),
    comment: z.string().optional(),
  });
};
