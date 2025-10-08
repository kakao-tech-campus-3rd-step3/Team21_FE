import { useParams } from "react-router-dom";

import cnulogo from "@/assets/cnulogo.svg";
import { useDepartmentDetail } from "@/entities/department/hooks/useDepartmentDetail";
import { DepartmentContactCard } from "@/entities/department/ui/DepartmentContactCard";
import { DepartmentHero } from "@/entities/department/ui/DepartmentHero";
import { DepartmentJobsCard } from "@/entities/department/ui/DepartmentJobsCard";
import { ProfessorList } from "@/entities/professor/ui/ProfessorList";

export function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const deptSeq = Number(id);

  if (!Number.isFinite(deptSeq)) {
    return <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">잘못된 접근입니다.</main>;
  }

  const { data, isLoading, isError } = useDepartmentDetail(deptSeq);

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

  const professors = [
    {
      name: "김태헌",
      rankLabel: "교수",
      degree: "KAIST 전산학 박사",
      researchAreas: ["인공지능", "머신러닝", "컴퓨터비전"],
      email: "thkim@cnu.ac.kr",
      office: "공대2호관 301호",
    },
    {
      name: "이수민",
      rankLabel: "교수",
      degree: "Stanford University 컴퓨터과학 박사",
      researchAreas: ["데이터마이닝", "빅데이터", "분산시스템"],
      email: "smlee@cnu.ac.kr",
      office: "공대2호관 302호",
    },
    {
      name: "박지원",
      rankLabel: "교수",
      degree: "MIT 전산학 박사",
      researchAreas: ["소프트웨어공학", "프로그래밍언어", "형식검증"],
      email: "jwpark@cnu.ac.kr",
      office: "공대2호관 303호",
    },
    {
      name: "최민호",
      rankLabel: "조교수",
      degree: "UC Berkeley 컴퓨터과학 박사",
      researchAreas: ["네트워크", "시스템", "클라우드컴퓨팅"],
      email: "minho@cnu.ac.kr",
      office: "공대2호관 304호",
    },
  ];

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <DepartmentHero
        collegeName={data.collegeName}
        departmentName={data.departmentName}
        intro={data.intro ?? ""}
        students={data.students ?? 0}
        professors={data.professors ?? 0}
        foundedYear={data.foundedYear ?? 0}
        logoUrl={cnulogo /* API 미제공 → 임시 로고 */}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfessorList title="교수진" items={professors} />
        </div>

        <div className="space-y-6">
          <DepartmentJobsCard title="진로/취업 분야" tags={data.careerFields ?? []} />
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
