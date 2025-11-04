import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useProfessorDetail } from "@/entities/professor/hooks/useProfessorDetail";
import type { ProfessorHeroData } from "@/entities/professor/model/types";
import { ProfessorEvalCard } from "@/entities/professor/ui/ProfessorEvalRadar";
import { ProfessorHero } from "@/entities/professor/ui/ProfessorHero";
import { ProfessorLectureReviewList } from "@/entities/professor/ui/ProfessorLectureReviewList";
import { ProfessorResearchCard } from "@/entities/professor/ui/ProfessorResearchCard";
import {
  collegeCrumb,
  deptCrumb,
  profCrumb,
  univCrumb,
  useBreadcrumbTrail,
} from "@/features/nav-trail";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { splitTags } from "@/shared/lib/string-utils";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorView } from "@/shared/ui/ErrorView";
import { LoadingView } from "@/shared/ui/LoadingView";
import { SEO } from "@/shared/ui/SEO";

export function ProfessorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const profSeq = Number(id);
  const invalid = !Number.isFinite(profSeq) || profSeq <= 0;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useProfessorDetail(profSeq);

  usePageTitle(data?.name ? `${data.name} 교수` : "교수 상세");

  const crumbs = useMemo(
    () => [
      univCrumb(data?.university?.name, data?.university?.id),
      collegeCrumb(data?.college?.name, data?.college?.id),
      deptCrumb(data?.department?.name, data?.department?.id),
      profCrumb(data?.name),
    ],
    [
      data?.university?.name,
      data?.university?.id,
      data?.college?.name,
      data?.college?.id,
      data?.department?.name,
      data?.department?.id,
      data?.name,
    ],
  );
  useBreadcrumbTrail(crumbs);

  if (invalid) {
    return (
      <EmptyState
        title="잘못된 접근입니다"
        description="요청하신 교수 정보를 확인할 수 없습니다."
      />
    );
  }

  if (isLoading) return <LoadingView message="교수 정보를 불러오는 중…" />;

  if (isError) {
    return (
      <ErrorView
        title="교수 정보를 불러오지 못했어요"
        description="네트워크 상태를 확인하신 뒤 다시 시도해 주세요."
        onRetry={() => {
          queryClient.resetQueries({ queryKey: ["professor", "detail", profSeq] });
          refetch();
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="표시할 교수 정보가 없습니다"
        description="관련 데이터가 아직 등록되지 않았을 수 있습니다."
      />
    );
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
    <>
      <SEO
        title={`${data.name} 교수 - ${data.department?.name ?? ""} | ${data.university?.name ?? ""}`}
        description={`${data.university?.name ?? ""} ${data.department?.name ?? ""} ${data.name} 교수의 강의 평가와 리뷰를 확인하세요. 평점: ${data.overallRating ?? 0}/5, 리뷰 ${data.totalReviewCount ?? 0}개`}
        keywords={`${data.name}, ${data.university?.name}, ${data.department?.name}, 교수 평가, 강의 리뷰, ${areas.join(", ")}`}
        url={`https://uniscope-git-develop-i3months-projects.vercel.app/professor/${data.id}`}
      />
      <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
        <ProfessorHero data={heroData} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <ProfessorEvalCard
              ratingBreakdown={data.ratingBreakdown}
              departmentAverage={data.departmentAverage}
            />
          </div>

          <div className="lg:col-span-4">
            <ProfessorResearchCard
              profId={data.id}
              education={education}
              areas={areas}
              lectures={data.lectures ?? []}
            />
          </div>
        </div>

        <ProfessorLectureReviewList profId={data.id} />
      </main>
    </>
  );
}
