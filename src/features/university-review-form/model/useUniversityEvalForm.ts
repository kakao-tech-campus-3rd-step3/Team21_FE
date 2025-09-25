import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createUniversityEvalSchema,
  type UniversityEvalForm,
} from "@/features/university-review-form/model/schema";
export function useUniversityEvalForm<TText extends { validate: { requiredStar: string } }>(
  text: TText,
  defaults?: Partial<UniversityEvalForm>,
) {
  const schema = createUniversityEvalSchema(text);
  return useForm<UniversityEvalForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { food: 0, dorm: 0, conv: 0, campus: 0, overall: 0, comment: "", ...defaults },
  });
}
