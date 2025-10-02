import { useParams } from "react-router-dom";

import { CollegeContactCard } from "@/entities/college/ui/CollegeContactCard";
import { CollegeFeatureCard } from "@/entities/college/ui/CollegeFeatureCard";
import { CollegeHero } from "@/entities/college/ui/CollegeHero";
import { DepartmentList } from "@/entities/department/ui/DepartmentList";

import { useCollegeDetail } from "@/entities/college/hooks/useCollegeDetail";

const FEATURES = [
  "국가연구·개발사업 다수 수행",
  "산업체 연계 현장실습 프로그램",
  "최신 실험실습 장비 보유",
  "국제공학인증 프로그램 운영",
  "창업지원센터 운영",
];

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
  // 라우트 파라미터 키가 id 또는 collegeSeq일 수 있어 둘 다 대응
  const params = useParams<{ id?: string; collegeSeq?: string }>();
  const collegeSeq = Number(params.collegeSeq ?? params.id);

  if (!Number.isFinite(collegeSeq)) {
    return <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">잘못된 접근입니다.</main>;
  }

  const { data, isLoading, isError } = useCollegeDetail(collegeSeq);

  if (isLoading) {
    return <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">불러오는 중…</main>;
  }
  if (isError || !data) {
    return (
      <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6">
        단과대학 정보를 불러오지 못했습니다.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <CollegeHero
        collegeName={data.name}
        universityName={"" /* API 미제공 */}
        intro={"" /* API 미제공 */}
        students={data.students ?? 0}
        professors={0 /* API 미제공 */}
        foundedYear={data.foundedYear ?? 0}
        logoUrl={undefined /* API 미제공 */}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 아직 학과/학부 API가 없으므로 기존 상수 유지 */}
          <DepartmentList title="학과 및 학부" items={DEPARTMENTS} />
        </div>

        <div className="space-y-6">
          <CollegeFeatureCard title="주요 특징" features={FEATURES} />
          {/* 연락처: API에 tel만 존재. email/address는 미제공 → 빈값 */}
          <CollegeContactCard tel={data.tel ?? ""} email={""} address={""} />
        </div>
      </div>
    </main>
  );
}
