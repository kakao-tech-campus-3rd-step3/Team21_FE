import { useParams } from "react-router-dom";

import { useUniversityDetail } from "@/entities/university/hooks/useUniversityDetail";
import { UniversityReviewForm } from "@/features/university-review-form";
import { UNIVERSITY_EVAL_TEXT } from "@/pages/university-eval/text";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { SEO } from "@/shared/ui/SEO";

export function UniversityEvalPage() {
  const { id } = useParams<{ id: string }>();
  const univSeq = Number(id);
  const { data: detail } = useUniversityDetail(univSeq);
  const univName = detail?.name;
  usePageTitle(univName ? `${univName} 평가` : "대학교 평가");

  return (
    <>
      <SEO
        title={univName ? `${univName} 평가하기` : "대학교 평가하기"}
        description={`${univName ?? "대학교"}에 대한 솔직한 평가를 남겨주세요. 시설, 교육, 취업 지원 등을 평가할 수 있습니다.`}
        keywords={`${univName}, 대학 평가, 대학 리뷰 작성, 대학 후기`}
        url={`https://uniscope-git-develop-i3months-projects.vercel.app/university/${univSeq}/eval`}
      />
      <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        <UniversityReviewForm univSeq={univSeq} univName={univName} text={UNIVERSITY_EVAL_TEXT} />
      </main>
    </>
  );
}
