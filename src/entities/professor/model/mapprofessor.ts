/*import {
  colleges,
  depts,
  lectureReviews,
  lectures,
  profReviews,
  profs,
  profTags,
  univs,
} from "@/__MOCK__/mockData";
import type { Professor } from "@/entities/professor/model/professors";
import { getAverage } from "@/shared/lib/getAverage";

export const mapprofessor = (profSeq: number): Professor | null => {
  const prof = profs.find((p) => p.profSeq === profSeq);
  if (!prof) return null;

  const dept = depts.find((d) => d.deptSeq === prof.deptSeq);
  const college = dept ? colleges.find((c) => c.collegeSeq === dept.collegeSeq) : null;
  const univ = college ? univs.find((u) => u.univSeq === college.univSeq) : null;
  const reviews = profReviews.filter((r) => r.profSeq === profSeq);
  const rating = getAverage(reviews.map((r) => (r.thesisPerf + r.researchPerf) / 2));

  //교수 강의 목록
  const profLectures = lectures.filter((l) => l.profSeq === profSeq);
  const profLecSeqs = profLectures.map((l) => l.lecSeq);

  //강의 리뷰
  const profLecReviews = lectureReviews.filter((r) => profLecSeqs.includes(r.lecSeq));

  //각 항목의 평균
  const avgHomework = getAverage(profLecReviews.map((r) => r.homework));
  const avgLecDifficulty = getAverage(profLecReviews.map((r) => r.lecDifficulty));
  const avgExamDifficulty = getAverage(profLecReviews.map((r) => r.examDifficulty));
  const avgGradeDistribution = getAverage(profLecReviews.map((r) => r.gradeDistribution));
  const avgResearchPerf = getAverage(reviews.map((r) => r.researchPerf));

  const tags = profTags[profSeq] ?? [];
  return {
    university: univ?.name ?? "정보 없음",
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
*/
