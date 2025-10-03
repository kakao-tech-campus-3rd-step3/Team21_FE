import { useMemo } from "react";

import cnulogo from "@/assets/cnulogo.svg";
import { DepartmentContactCard } from "@/entities/department/ui/DepartmentContactCard";
import { DepartmentHero } from "@/entities/department/ui/DepartmentHero";
import { DepartmentJobsCard } from "@/entities/department/ui/DepartmentJobsCard";
import { ProfessorList } from "@/entities/professor/ui/ProfessorList";
import { useBreadcrumbTrail } from "@/features/nav-trail";

const UNIV_NAME = "충남대학교";

const HERO = {
  collegeName: "공과대학",
  departmentName: "컴퓨터융합학부",
  intro:
    "컴퓨터공학과 소프트웨어, 인공지능을 융합하여 문제 해결 능력과 실무 역량을 갖춘 인재를 양성합니다.",
  students: 680,
  professors: 18,
  foundedYear: 1992,
} as const;

const JOB_TAGS = [
  "백엔드",
  "프론트엔드",
  "모바일",
  "데이터 엔지니어",
  "ML 엔지니어",
  "SRE/DevOps",
  "정보보안",
  "임베디드",
  "클라우드",
  "연구소",
];

const CONTACT = {
  tel: "042-821-5600",
  email: "cse@cnu.ac.kr",
  address: "공대2호관 학과사무실 3층",
};

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

export function DepartmentDetailPage() {
  const crumbs = useMemo(
    () => [{ label: UNIV_NAME }, { label: HERO.collegeName }, { label: HERO.departmentName }],
    [],
  );
  useBreadcrumbTrail(crumbs);

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <DepartmentHero
        collegeName={HERO.collegeName}
        departmentName={HERO.departmentName}
        intro={HERO.intro}
        students={HERO.students}
        professors={HERO.professors}
        foundedYear={HERO.foundedYear}
        logoUrl={cnulogo}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfessorList title="교수진" items={professors} />
        </div>

        <div className="space-y-6">
          <DepartmentJobsCard title="진로/취업 분야" tags={JOB_TAGS} />
          <DepartmentContactCard
            tel={CONTACT.tel}
            email={CONTACT.email}
            address={CONTACT.address}
          />
        </div>
      </div>
    </main>
  );
}
