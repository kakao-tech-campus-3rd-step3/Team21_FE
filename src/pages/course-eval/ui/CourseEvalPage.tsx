import { useParams } from "react-router-dom";

import { CourseReviewForm } from "@/features/course-review-form";
import { COURSE_EVAL_TEXT } from "@/pages/course-eval/text";

export function CourseEvalPage() {
  const { lecSeq } = useParams<{ lecSeq: string }>();

  return (
    <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <CourseReviewForm lecSeq={lecSeq ?? "-"} text={COURSE_EVAL_TEXT} />
    </main>
  );
}
