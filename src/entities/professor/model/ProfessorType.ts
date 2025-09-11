import { depts, lectureReviews, lectures, profReviews, profs } from "@/__MOCK__/mockData";

export type Professor = {
  id: number;
  name: string;
  department: string;
  //logoUrl: string; 학교 로고 이미지를 넣을지 말지 고민
  rating: number;
  tags: string[];
  homework?: number;
  lecDifficulty?: number;
  examDifficulty?: number;
  gradeDistribution?: number;
  researchPerf?: number;
};

export const mapProfToProfessor = (profSeq: number): Professor | null => {
  const prof = profs.find((p) => p.profSeq === profSeq);
  if (!prof) return null;

  const dept = depts.find((d) => d.deptSeq === prof.deptSeq);

  const reviews = profReviews.filter((r) => r.profSeq === profSeq);
  const rating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + (r.thesisPerf + r.researchPerf) / 2, 0) / reviews.length
      : 0;

  //교수 강의 목록
  const profLectures = lectures.filter((l) => l.profSeq === profSeq);
  const profLecSeqs = profLectures.map((l) => l.lecSeq);

  //강의 리뷰
  const profLecReviews = lectureReviews.filter((r) => profLecSeqs.includes(r.lecSeq));

  //각 항목의 평균
  const avgHomework =
    profLecReviews.length > 0
      ? profLecReviews.reduce((acc, r) => acc + r.homework, 0) / profLecReviews.length
      : 0;
  const avgLecDifficulty =
    profLecReviews.length > 0
      ? profLecReviews.reduce((acc, r) => acc + r.lecDifficulty, 0) / profLecReviews.length
      : 0;
  const avgExamDifficulty =
    profLecReviews.length > 0
      ? profLecReviews.reduce((acc, r) => acc + r.examDifficulty, 0) / profLecReviews.length
      : 0;
  const avgGradeDistribution =
    profLecReviews.length > 0
      ? profLecReviews.reduce((acc, r) => acc + r.gradeDistribution, 0) / profLecReviews.length
      : 0;

  const avgResearchPerf =
    reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.researchPerf, 0) / reviews.length : 0;

  //목데이터에 태그가 없어서 우선은 UI 확인 위해 하드코딩, 추후 목데이터에 태그 추가 예정
  let tags: string[] = [];
  switch (profSeq) {
    case 9001:
      tags = ["열정적", "강의력 우수"];
      break;
    case 9002:
      tags = ["연구 성실", "논문 지도 잘함"];
      break;
    default:
      tags = ["차분함", "피드백 빠름"];
  }

  return {
    id: prof.profSeq,
    name: prof.profName,
    department: dept?.deptName ?? "정보 없음",
    //logoUrl: "/images/univ.png" 이미지 넣을지 말지 고민,,
    rating: parseFloat(rating.toFixed(1)),
    tags,
    homework: parseFloat(avgHomework.toFixed(1)),
    lecDifficulty: parseFloat(avgLecDifficulty.toFixed(1)),
    examDifficulty: parseFloat(avgExamDifficulty.toFixed(1)),
    gradeDistribution: parseFloat(avgGradeDistribution.toFixed(1)),
    researchPerf: parseFloat(avgResearchPerf.toFixed(1)),
  };
};
