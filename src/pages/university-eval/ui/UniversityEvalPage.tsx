import { useParams } from "react-router-dom";

import { useUniversityDetail } from "@/entities/university/hooks/useUniversityDetail";
import { UniversityReviewForm } from "@/features/university-review-form";
import { UNIVERSITY_EVAL_TEXT } from "@/pages/university-eval/text";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

export function UniversityEvalPage() {
  const { id } = useParams<{ id: string }>();
  const univSeq = Number(id);
  const { data: detail } = useUniversityDetail(univSeq);
  const univName = detail?.name;
  usePageTitle(univName ? `${univName} 평가` : "대학교 평가");

  return (
    <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <UniversityReviewForm univSeq={univSeq} univName={univName} text={UNIVERSITY_EVAL_TEXT} />
    </main>
  );
}
