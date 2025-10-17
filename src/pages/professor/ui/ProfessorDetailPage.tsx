import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useProfessorDetail } from "@/entities/professor/hooks/useProfessorDetail";
import type { ProfessorHeroData } from "@/entities/professor/model/professor-hero.vm";
import { ProfessorEvalCard } from "@/entities/professor/ui/ProfessorEvalRadar";
import { ProfessorHero } from "@/entities/professor/ui/ProfessorHero";
import { ProfessorLectureReviewList } from "@/entities/professor/ui/ProfessorLectureReviewList";
import { ProfessorResearchCard } from "@/entities/professor/ui/ProfessorResearchCard";
import { useBreadcrumbTrail } from "@/features/nav-trail";

const splitTags = (s?: string) =>
  s
    ? s
        .split(/[,\s/·|/]+/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

export function ProfessorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const profSeq = Number(id);
  const isInvalid = !Number.isFinite(profSeq) || profSeq <= 0;

  const { data, isLoading, isError } = useProfessorDetail(profSeq);

  const collegeName = data?.college?.name ?? "";
  const crumbs = useMemo(
    () => [
      { label: String(data?.university?.name ?? "") },
      { label: String(collegeName) },
      { label: String(data?.department?.name ?? "") },
      { label: String(data?.name ? `${data.name} 교수` : "") },
    ],
    [data?.university?.name, collegeName, data?.department?.name, data?.name],
  );
  useBreadcrumbTrail(crumbs);

  if (isInvalid) {
    return <main className="p-6 text-center">잘못된 접근입니다.</main>;
  }

  if (isLoading) {
    return <main className="p-6 text-center">불러오는 중…</main>;
  }

  if (isError || !data) {
    return <main className="p-6 text-center">해당 교수 정보를 찾을 수 없습니다.</main>;
  }

  const heroData: ProfessorHeroData = {
    id: data.id,
    name: data.name,
    department: data.department?.name ?? "",
    university: data.university?.name ?? "",
    email: data.email ?? "",
    office: data.office ?? "",
    avatarUrl: data.imageUrl ?? "",
    rating: data.overallRating ?? 0,
    ratingCount: data.totalReviewCount ?? 0,
  };

  const education = data.degree;
  const areas = Array.from(new Set([...splitTags(data.major), ...splitTags(data.researchField)]));

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <ProfessorHero data={heroData} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ProfessorEvalCard profId={profSeq} />
        </div>

        <div className="lg:col-span-4">
          <ProfessorResearchCard
            profId={profSeq}
            education={education}
            areas={areas}
            lectures={data.lectures ?? []}
          />
        </div>
      </div>

      <ProfessorLectureReviewList profId={profSeq} />
    </main>
  );
}
