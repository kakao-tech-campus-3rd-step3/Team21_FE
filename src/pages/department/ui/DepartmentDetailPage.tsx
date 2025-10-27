import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useDepartmentDetail } from "@/entities/department/hooks/useDepartmentDetail";
import { DepartmentContactCard } from "@/entities/department/ui/DepartmentContactCard";
import { DepartmentHero } from "@/entities/department/ui/DepartmentHero";
import { DepartmentJobsCard } from "@/entities/department/ui/DepartmentJobsCard";
import { ProfessorList } from "@/entities/professor/ui/ProfessorList";
import { useBreadcrumbTrail } from "@/features/nav-trail";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorView } from "@/shared/ui/ErrorView";
import { LoadingView } from "@/shared/ui/LoadingView";

export function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const deptSeq = Number(id);
  const invalid = !Number.isFinite(deptSeq) || deptSeq <= 0;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useDepartmentDetail(deptSeq);

  const crumbs = useMemo(() => {
    if (!data) return [{ label: "학과" }];
    return [
      { label: data.universityName || "대학교" },
      { label: data.collegeName || "단과대학" },
      { label: data.departmentName || "학과" },
    ];
  }, [data]);

  useBreadcrumbTrail(crumbs);

  if (invalid) {
    return (
      <EmptyState
        title="잘못된 접근입니다"
        description="요청하신 학과 정보를 확인할 수 없습니다."
      />
    );
  }

  if (isLoading) return <LoadingView message="학과 정보를 불러오는 중…" />;

  if (isError) {
    return (
      <ErrorView
        title="학과 정보를 불러오지 못했어요"
        description="네트워크 상태를 확인하신 뒤 다시 시도해 주세요."
        onRetry={() => {
          queryClient.resetQueries({ queryKey: ["department", "detail", deptSeq] });
          refetch();
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="표시할 학과 정보가 없습니다"
        description="관련 데이터가 아직 등록되지 않았을 수 있습니다."
      />
    );
  }

  const professorCount = Number.isFinite(data.professors)
    ? (data.professors as number)
    : (data.professorList?.length ?? 0);

  const professorItems =
    data.professorList?.map((p) => ({
      id: p.seq,
      name: p.name,
      rankLabel: p.position ?? "",
      email: p.email ?? "",
      office: p.office ?? "",
      imageUrl: p.imageUrl,
      degree: "",
      researchAreas: [],
    })) ?? [];

  const foundedYear =
    typeof data.foundedYear === "number" && Number.isFinite(data.foundedYear)
      ? data.foundedYear
      : 0;

  const students =
    typeof data.students === "number" && Number.isFinite(data.students) ? data.students : 0;

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <DepartmentHero
        collegeName={data.collegeName}
        departmentName={data.departmentName}
        intro={data.intro ?? ""}
        students={students}
        professors={professorCount}
        foundedYear={foundedYear}
        logoUrl={data.logoUrl}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {professorItems.length > 0 ? (
            <ProfessorList title="교수진" items={professorItems} />
          ) : (
            <EmptyState title="등록된 교수 정보가 없습니다" />
          )}
        </div>

        <div className="space-y-6">
          <DepartmentJobsCard title="학과/학부 키워드" tags={data.careerFields ?? []} />
          <DepartmentContactCard
            tel={data.tel ?? ""}
            email={data.email ?? ""}
            address={data.address ?? ""}
          />
        </div>
      </div>
    </main>
  );
}
