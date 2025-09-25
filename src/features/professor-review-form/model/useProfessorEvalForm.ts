import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createProfessorEvalSchema,
  type ProfessorEvalForm,
} from "@/features/professor-review-form/model/schema";

export function useProfessorEvalForm<TText extends { validate: { requiredStar: string } }>(
  text: TText,
  defaults?: Partial<ProfessorEvalForm>,
) {
  const schema = createProfessorEvalSchema(text);
  return useForm<ProfessorEvalForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { thesisPerf: 0, labPerf: 0, thesisReview: "", ...defaults },
  });
}
