import { useParams } from "react-router-dom";

import { useProfessorDetail } from "@/entities/professor/hooks/useProfessorDetail";
import { ProfessorReviewForm } from "@/features/professor-review-form";
import { PROFESSOR_EVAL_TEXT } from "@/pages/professor-eval/text";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { SEO } from "@/shared/ui/SEO";

export function ProfessorEvalPage() {
  const { id } = useParams<{ id: string }>();
  const profSeq = Number(id);

  const { data: prof } = useProfessorDetail(profSeq);
  usePageTitle(prof?.name ? `${prof.name} 교수 평가` : "교수 평가");
  return (
    <>
      <SEO
        title={prof?.name ? `${prof.name} 교수 평가하기` : "교수 평가하기"}
        description={`${prof?.name ?? "교수님"}의 강의에 대한 솔직한 평가를 남겨주세요. 강의력, 과제량, 성적 등을 평가할 수 있습니다.`}
        keywords={`${prof?.name}, 교수 평가, 강의 평가 작성, 교수 리뷰`}
        url={`https://uniscope-git-develop-i3months-projects.vercel.app/professor/${profSeq}/eval`}
      />
      <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        <ProfessorReviewForm profSeq={profSeq} profName={prof?.name} text={PROFESSOR_EVAL_TEXT} />
      </main>
    </>
  );
}
