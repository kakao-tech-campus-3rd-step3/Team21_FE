import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useCollegeDetail } from "@/entities/college/hooks/useCollegeDetail";
import { CollegeContactCard } from "@/entities/college/ui/CollegeContactCard";
import { CollegeHero } from "@/entities/college/ui/CollegeHero";
import { useDepartmentsByCollege } from "@/entities/department/hooks/useDepartmentsByCollege";
import { DepartmentList } from "@/entities/department/ui/DepartmentList";
import { useBreadcrumbTrail } from "@/features/nav-trail";

export function CollegeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const collegeSeq = Number(id);
  const isInvalid = !Number.isFinite(collegeSeq) || collegeSeq <= 0;

  const { data: college, isLoading, isError } = useCollegeDetail(collegeSeq);
  const {
    data: departments,
    isLoading: deptLoading,
    isError: deptError,
  } = useDepartmentsByCollege(collegeSeq);

  const crumbs = useMemo(
    () => [{ label: college?.universityName ?? "" }, { label: college?.name ?? "" }],
    [college?.universityName, college?.name],
  );
  useBreadcrumbTrail(crumbs);

  if (isInvalid) {
    return <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">잘못된 접근입니다.</main>;
  }

  if (isLoading) {
    return <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">불러오는 중…</main>;
  }

  if (isError || !college) {
    return (
      <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">
        단과대학 정보를 불러오지 못했습니다.
      </main>
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
          {deptLoading && <div className="text-sm text-zinc-300">학과 정보를 불러오는 중…</div>}
          {deptError && (
            <div className="text-sm text-red-400">학과 정보를 불러오지 못했습니다.</div>
          )}

          {!deptLoading && !deptError && hasDept && (
            <DepartmentList title="학과 및 학부" items={departments!} />
          )}

          {!deptLoading && !deptError && !hasDept && (
            <div className="text-sm text-zinc-400">등록된 학과 정보가 없습니다.</div>
          )}
        </div>

        <div className="space-y-6">
          {/* TODO: 고도화 단계에서 이어서 진행 */}
          {/* <CollegeFeatureCard title="단과대학 키워드" features={FEATURES} /> */}
          <CollegeContactCard tel={college.tel ?? ""} email="" address="" />
        </div>
      </div>
    </main>
  );
}
