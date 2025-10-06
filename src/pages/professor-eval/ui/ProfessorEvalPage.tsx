import { useParams } from "react-router-dom";

import { ProfessorReviewForm } from "@/features/professor-review-form";
import { PROFESSOR_EVAL_TEXT } from "@/pages/professor-eval/text";

export function ProfessorEvalPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <ProfessorReviewForm profId={id ?? "-"} text={PROFESSOR_EVAL_TEXT} />
    </main>
  );
}
