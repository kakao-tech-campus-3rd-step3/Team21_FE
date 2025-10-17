import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useCollegeDetail } from "@/entities/college/hooks/useCollegeDetail";
import { CollegeContactCard } from "@/entities/college/ui/CollegeContactCard";
import { CollegeHero } from "@/entities/college/ui/CollegeHero";
import { useDepartmentsByCollege } from "@/entities/department/hooks/useDepartmentsByCollege";
import { DepartmentList } from "@/entities/department/ui/DepartmentList";
import { useBreadcrumbTrail } from "@/features/nav-trail";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorView } from "@/shared/ui/ErrorView";
import { LoadingView } from "@/shared/ui/LoadingView";

export function CollegeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const collegeSeq = Number(id);
  const invalid = !Number.isFinite(collegeSeq) || collegeSeq <= 0;

  const queryClient = useQueryClient();

  const {
    data: college,
    isLoading,
    isError,
    refetch: refetchCollege,
  } = useCollegeDetail(collegeSeq);

  const {
    data: departments,
    isLoading: deptLoading,
    isError: deptError,
    refetch: refetchDepartments,
  } = useDepartmentsByCollege(collegeSeq);

  const crumbs = useMemo(
    () => [{ label: college?.universityName ?? "대학교" }, { label: college?.name ?? "단과대학" }],
    [college?.universityName, college?.name],
  );
  useBreadcrumbTrail(crumbs);

  if (invalid) {
    return (
      <EmptyState
        title="잘못된 접근입니다"
        description="요청하신 단과대학 정보를 확인할 수 없습니다."
      />
    );
  }

  if (isLoading) return <LoadingView message="단과대학 정보를 불러오는 중…" />;

  if (isError) {
    return (
      <ErrorView
        title="단과대학 정보를 불러오지 못했어요"
        description="네트워크 상태를 확인하신 뒤 다시 시도해 주세요."
        onRetry={() => {
          queryClient.resetQueries({ queryKey: ["college", "detail", collegeSeq] });
          refetchCollege();
        }}
      />
    );
  }

  if (!college) {
    return (
      <EmptyState
        title="표시할 단과대학 정보가 없습니다"
        description="관련 데이터가 아직 등록되지 않았을 수 있습니다."
      />
    );
  }

  const hasDept = (departments?.length ?? 0) > 0;

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <CollegeHero
        collegeName={college.name}
        universityName={college.universityName ?? ""}
        intro={college.intro ?? ""}
        students={college.students ?? 0}
        professors={college.professors ?? 0}
        foundedYear={college.foundedYear ?? 0}
        logoUrl={college.logoUrl}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 학과 섹션 */}
          {deptLoading && <LoadingView message="학과 정보를 불러오는 중…" />}

          {deptError && (
            <ErrorView
              title="학과 정보를 불러오지 못했어요"
              description="잠시 후 다시 시도해 주세요."
              onRetry={() => {
                queryClient.resetQueries({
                  queryKey: ["department", "list", "byCollege", collegeSeq],
                });
                refetchDepartments();
              }}
            />
          )}

          {!deptLoading && !deptError && hasDept && (
            <DepartmentList title="학과 및 학부" items={departments!} />
          )}

          {!deptLoading && !deptError && !hasDept && (
            <EmptyState title="등록된 학과 정보가 없습니다" />
          )}
        </div>

        <div className="space-y-6">
          <CollegeContactCard tel={college.tel ?? ""} email="" address="" />
        </div>
      </div>
    </main>
  );
}
