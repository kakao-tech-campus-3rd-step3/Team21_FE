import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { CollegeSection } from "@/entities/college/ui/CollegeSection";
import {
  UniversityContactSide,
  UniversityHero,
  UniversityMainInfoSide,
  UniversityReviewList,
} from "@/entities/university";
import { useUniversityDetail } from "@/entities/university/hooks/useUniversityDetail";
import type { UniversityHeroData } from "@/entities/university/model/hero.vm";
import type { UniversitySideContact } from "@/entities/university/model/university-contact.vm";
import type { UniversityMainInfo } from "@/entities/university/model/university-maininfo.vm";
import { useBreadcrumbTrail } from "@/features/nav-trail";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorView } from "@/shared/ui/ErrorView";
import { LoadingView } from "@/shared/ui/LoadingView";

export function UniversityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const univSeq = Number(id);
  const invalid = !Number.isFinite(univSeq) || univSeq <= 0;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useUniversityDetail(univSeq);

  const crumbs = useMemo(() => [{ label: data?.name ?? "대학교" }], [data?.name]);
  useBreadcrumbTrail(crumbs);

  if (invalid) {
    return (
      <EmptyState
        title="잘못된 접근입니다"
        description="요청하신 대학 정보를 확인할 수 없습니다."
      />
    );
  }

  if (isLoading) return <LoadingView message="대학 정보를 불러오는 중…" />;

  if (isError) {
    return (
      <ErrorView
        title="대학 정보를 불러오지 못했어요"
        description="네트워크 상태를 확인하신 뒤 다시 시도해 주세요."
        onRetry={() => {
          queryClient.resetQueries({ queryKey: ["university", "detail", univSeq] });
          refetch();
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="표시할 대학 정보가 없습니다"
        description="관련 데이터가 아직 등록되지 않았을 수 있습니다."
      />
    );
  }

  const heroData: UniversityHeroData = {
    id: data.id,
    name: data.name,
    logoUrl: data.logoUrl ?? "",
    address: data.address ?? "",
    foundedYear: data.foundedYear ?? 0,
    rating: data.averageRating ?? 0,
    ratingCount: data.reviewCount ?? 0,
    students: data.studentCount ?? 0,
  };

  const sideBarData: UniversityMainInfo = {
    campuses: data.campusCount ?? 0,
    colleges: data.collegeCount ?? 0,
    departments: data.departmentCount ?? 0,
    students: data.studentCount ?? 0,
  };

  const contactData: UniversitySideContact = {
    tel: data.phone ?? "",
    web: data.homepage ?? "",
    email: "",
  };

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <UniversityHero data={heroData} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CollegeSection univId={data.id} />
          <UniversityReviewList univSeq={data.id} />
        </div>
        <div className="space-y-6">
          <UniversityMainInfoSide data={sideBarData} />
          <UniversityContactSide data={contactData} />
        </div>
      </div>
    </main>
  );
}
