import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type CourseEvalForm,
  createCourseEvalSchema,
} from "@/features/course-review-form/model/schema";

export function useCourseEvalForm<
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
>(text: TText, defaults?: Partial<CourseEvalForm>) {
  const schema = createCourseEvalSchema(text);
  return useForm<CourseEvalForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      year: undefined,
      term: undefined,

      gradeKindness: 0,
      examDifficulty: 0,
      lectureSkill: 0,

      taskAmount: "",
      teamProject: "",
      comment: "",
      ...defaults,
    },
  });
}
