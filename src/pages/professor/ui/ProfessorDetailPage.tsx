import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { profDetail } from "@/__MOCK__/mockData";
import yslee from "@/assets/yslee.jpeg";
import type { ProfessorHeroData } from "@/entities/professor/model/professor-hero.vm";
import { ProfessorEvalCard } from "@/entities/professor/ui/ProfessorEvalRadar";
import { ProfessorHero } from "@/entities/professor/ui/ProfessorHero";
import { ProfessorLectureReviewList } from "@/entities/professor/ui/ProfessorLectureReviewList";
import { ProfessorResearchCard } from "@/entities/professor/ui/ProfessorResearchCard";
import { useBreadcrumbTrail } from "@/features/nav-trail";

export function ProfessorDetailPage() {
  const { id } = useParams();
  const profSeq = Number(id);

  // TODO: api hook 적용
  const prof = profDetail.find((p) => p.id === profSeq);

  // 단과대학명: 데이터에 없어서 우선 상수로
  const collegeName = "공과대학"; // 나중에 API/모델에서 받아오면 교체

  const crumbs = useMemo(
    () => [
      { label: prof?.university ?? "충남대학교" },
      { label: collegeName },
      { label: prof?.department ?? "학과" },
      { label: prof?.name ? `${prof.name} 교수` : "교수" },
    ],
    [prof?.university, collegeName, prof?.department, prof?.name],
  );
  useBreadcrumbTrail(crumbs);

  // TODO: ErrorBoundary 적용
  if (!prof) {
    return <div className="p-6 text-center">해당 교수 정보를 찾을 수 없습니다.</div>;
  }

  const heroData: ProfessorHeroData = {
    id: prof.id,
    name: prof.name,
    department: prof.department,
    university: prof.university,
    email: prof.email || undefined,
    office: prof.office || undefined,
    avatarUrl: prof.avatarUrl || yslee,
    rating: typeof prof.rating === "number" ? prof.rating : Number(prof.rating) || 0,
    ratingCount: prof.ratingCount ?? 0,
  };

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <ProfessorHero data={heroData} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ProfessorEvalCard profId={profSeq} />
        </div>
        <div className="lg:col-span-4">
          <ProfessorResearchCard profId={profSeq} />
        </div>
      </div>

      <ProfessorLectureReviewList profId={profSeq} />
    </main>
  );
}
