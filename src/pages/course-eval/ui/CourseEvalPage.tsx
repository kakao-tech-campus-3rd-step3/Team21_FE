import { useParams } from "react-router-dom";

import { useProfessorDetail } from "@/entities/professor/hooks/useProfessorDetail";
import { CourseReviewForm } from "@/features/course-review-form";
import { COURSE_EVAL_TEXT } from "@/pages/course-eval/text";

export function CourseEvalPage() {
  const { lecSeq, profSeq } = useParams<{ lecSeq: string; profSeq: string }>();
  const seq = Number(lecSeq);
  const profId = Number(profSeq);

  const { data: prof } = useProfessorDetail(profId);

  const lectureName = prof?.lectures.find((lec) => lec.id === seq)?.name;

  return (
    <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <CourseReviewForm lecSeq={seq} lecName={lectureName} text={COURSE_EVAL_TEXT} />
    </main>
  );
}
