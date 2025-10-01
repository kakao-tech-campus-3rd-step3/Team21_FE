import { useMemo } from "react";

import cnulogo from "@/assets/cnulogo.svg";
import { CollegeContactCard } from "@/entities/college/ui/CollegeContactCard";
import { CollegeFeatureCard } from "@/entities/college/ui/CollegeFeatureCard";
import { CollegeHero } from "@/entities/college/ui/CollegeHero";
import { DepartmentList } from "@/entities/department/ui/DepartmentList";
import { useBreadcrumbTrail } from "@/features/nav-trail";

const HERO = {
  universityName: "충남대학교",
  collegeName: "공과대학",
  intro:
    "미래 산업을 이끌어갈 창의적이고 실무능력을 갖춘 공학인재 양성을 목표로 하며, 첨단 연구시설과 산학 협력을 통해 최상위권 교육을 제공합니다.",
  students: 4200,
  professors: 89,
  foundedYear: 1962,
} as const;

const FEATURES = [
  "국가연구·개발사업 다수 수행",
  "산업체 연계 현장실습 프로그램",
  "최신 실험실습 장비 보유",
  "국제공학인증 프로그램 운영",
  "창업지원센터 운영",
];

const CONTACT = {
  tel: "042-821-5600",
  email: "engineering@cnu.ac.kr",
  address: "공과대학 1호관 1층 학장실",
};

const DEPARTMENTS = [
  {
    name: "컴퓨터융합학부",
    description: "컴퓨터공학, 소프트웨어공학, 인공지능 분야의 전문 인재 양성",
    tags: ["프로그램", "자료구조", "데이터베이스", "네트워크"],
    students: 680,
    professors: 18,
    founded: 1992,
    employmentRate: 94.2,
  },
  {
    name: "인공지능학과",
    description: "머신러닝, 딥러닝, 빅데이터 분석 전문가 양성",
    tags: ["기계학습", "딥러닝", "빅데이터", "컴퓨터비전", "자연어처리"],
    students: 320,
    professors: 12,
    founded: 2020,
    employmentRate: 96.8,
  },
  {
    name: "기계공학과",
    description: "기계설계, 제조공학, 로보틱스 분야 실무형 인재 양성",
    tags: ["열역학", "유체역학", "재료공학", "기계설계", "제어공학"],
    students: 520,
    professors: 15,
    founded: 1964,
    employmentRate: 92.5,
  },
  {
    name: "전자공학과",
    description: "반도체, 통신, 전자회로 설계 전문가 양성",
    tags: ["회로이론", "전자기학", "통신공학", "반도체공학"],
    students: 450,
    professors: 14,
    founded: 1965,
    employmentRate: 91.8,
  },
];

export function CollegeDetailPage() {
  const crumbs = useMemo(() => [{ label: HERO.universityName }, { label: HERO.collegeName }], []);
  useBreadcrumbTrail(crumbs);

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <CollegeHero
        collegeName={HERO.collegeName}
        universityName={HERO.universityName}
        intro={HERO.intro}
        students={HERO.students}
        professors={HERO.professors}
        foundedYear={HERO.foundedYear}
        logoUrl={cnulogo}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DepartmentList title="학과 및 학부" items={DEPARTMENTS} />
        </div>

        <div className="space-y-6">
          <CollegeFeatureCard title="주요 특징" features={FEATURES} />
          <CollegeContactCard tel={CONTACT.tel} email={CONTACT.email} address={CONTACT.address} />
        </div>
      </div>
    </main>
  );
}
