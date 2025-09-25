import { useParams } from "react-router-dom";

import { UniversityReviewForm } from "@/features/university-review-form";
import { UNIVERSITY_EVAL_TEXT } from "@/pages/university-eval/text";

export function UniversityEvalPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <UniversityReviewForm univId={id ?? "-"} text={UNIVERSITY_EVAL_TEXT} />
    </main>
  );
}
