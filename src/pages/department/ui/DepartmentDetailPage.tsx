import { useMemo } from "react";
import { useParams } from "react-router-dom";

import cnulogo from "@/assets/cnulogo.svg";
import { useDepartmentDetail } from "@/entities/department/hooks/useDepartmentDetail";
import { DepartmentContactCard } from "@/entities/department/ui/DepartmentContactCard";
import { DepartmentHero } from "@/entities/department/ui/DepartmentHero";
import { DepartmentJobsCard } from "@/entities/department/ui/DepartmentJobsCard";
import { ProfessorList } from "@/entities/professor/ui/ProfessorList";
import { useBreadcrumbTrail } from "@/features/nav-trail";

export function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const deptSeq = Number(id);
  const isInvalid = !Number.isFinite(deptSeq) || deptSeq <= 0;

  const { data, isLoading, isError } = useDepartmentDetail(deptSeq);

  const crumbs = useMemo(
    () => [
      { label: data?.universityName ?? "" },
      { label: data?.collegeName ?? "" },
      { label: data?.departmentName ?? "" },
    ],
    [data?.universityName, data?.collegeName, data?.departmentName],
  );
  useBreadcrumbTrail(crumbs);

  if (isInvalid) {
    return <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">잘못된 접근입니다.</main>;
  }

  if (isLoading) {
    return <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">불러오는 중…</main>;
  }

  if (isError || !data) {
    return (
      <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">
        학과 정보를 불러오지 못했습니다.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <DepartmentHero
        collegeName={data.collegeName}
        departmentName={data.departmentName}
        intro={data.intro ?? ""}
        students={data.students ?? 0}
        professors={data.professors ?? data.professorList.length ?? 0}
        foundedYear={data.foundedYear ?? 0}
        logoUrl={cnulogo /* api 미제공 */}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfessorList
            title="교수진"
            items={data.professorList.map((p) => ({
              seq: p.seq,
              name: p.name,
              rankLabel: p.position,
              email: p.email,
              office: p.office,
            }))}
          />
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
