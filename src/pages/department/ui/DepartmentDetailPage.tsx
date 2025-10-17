import { useParams } from "react-router-dom";

import { useDepartmentDetail } from "@/entities/department/hooks/useDepartmentDetail";
import { DepartmentContactCard } from "@/entities/department/ui/DepartmentContactCard";
import { DepartmentHero } from "@/entities/department/ui/DepartmentHero";
import { DepartmentJobsCard } from "@/entities/department/ui/DepartmentJobsCard";
import { ProfessorList } from "@/entities/professor/ui/ProfessorList";
import { useBreadcrumbTrail } from "@/features/nav-trail";

export function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const deptSeq = Number(id);
  const { data, isLoading, isError } = useDepartmentDetail(deptSeq);
  console.log(data, "dd");

  const crumbs = data
    ? [
        { label: data.universityName || "대학교" },
        { label: data.collegeName || "단과대학" },
        { label: data.departmentName || "학과" },
      ]
    : [];
  useBreadcrumbTrail(crumbs);

  const isInvalid = !Number.isFinite(deptSeq) || deptSeq <= 0;

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

  const professorCount = data.professors ?? data.professorList.length;
  const professorItems = (data.professorList ?? []).map((p) => ({
    seq: p.seq,
    name: p.name,
    rankLabel: p.position ?? "",
    email: p.email ?? "",
    office: p.office ?? "",
    imageUrl: p.imageUrl,
    degree: "",
    researchAreas: [],
  }));

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
          <ProfessorList title="교수진" items={professorItems} />
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
