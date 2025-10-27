import { useParams } from "react-router-dom";

import { useProfessorDetail } from "@/entities/professor/hooks/useProfessorDetail";
import { ProfessorReviewForm } from "@/features/professor-review-form";
import { PROFESSOR_EVAL_TEXT } from "@/pages/professor-eval/text";

export function ProfessorEvalPage() {
  const { id } = useParams<{ id: string }>();
  const profSeq = Number(id);

  const { data: prof } = useProfessorDetail(profSeq);
  return (
    <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <ProfessorReviewForm profSeq={profSeq} profName={prof?.name} text={PROFESSOR_EVAL_TEXT} />
    </main>
  );
}
