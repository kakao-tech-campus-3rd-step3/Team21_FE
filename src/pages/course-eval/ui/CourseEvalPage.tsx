import { useParams } from "react-router-dom";

import { useProfessorDetail } from "@/entities/professor/hooks/useProfessorDetail";
import { CourseReviewForm } from "@/features/course-review-form";
import { COURSE_EVAL_TEXT } from "@/pages/course-eval/text";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { SEO } from "@/shared/ui/SEO";

export function CourseEvalPage() {
  const { lecSeq, profSeq } = useParams<{ lecSeq: string; profSeq: string }>();
  const seq = Number(lecSeq);
  const profId = Number(profSeq);

  const { data: prof } = useProfessorDetail(profId);

  const lectureName = prof?.lectures.find((lec) => lec.id === seq)?.name;
  usePageTitle(lectureName ? `${lectureName} 평가` : "강의 평가");

  return (
    <>
      <SEO
        title={lectureName ? `${lectureName} 강의 평가하기` : "강의 평가하기"}
        description={`${lectureName ?? "강의"}에 대한 솔직한 평가를 남겨주세요. 강의 내용, 난이도, 과제량 등을 평가할 수 있습니다.`}
        keywords={`${lectureName}, 강의 평가, 수업 리뷰, ${prof?.name}`}
        url={`https://uniscope-git-develop-i3months-projects.vercel.app/professor/${profId}/lecture/${seq}/eval`}
      />
      <main className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        <CourseReviewForm lecSeq={seq} lecName={lectureName} text={COURSE_EVAL_TEXT} />
      </main>
    </>
  );
}
