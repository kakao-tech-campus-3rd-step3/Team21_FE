import type { ProfessorDetail } from "@/entities/professor/model/professor-detail.domain";
import type { ProfessorDetailResponse } from "@/entities/professor/model/professor-detail.response";
import { toUndefIfEmpty } from "@/shared/lib/string-utils";

export function mapProfessorDetailResponseToDomain(r: ProfessorDetailResponse): ProfessorDetail {
  const p = r.professor;

  return {
    id: p.id,
    name: p.name,
    university: p.university,
    college: p.college,
    department: p.department,
    email: toUndefIfEmpty(p.email),
    imageUrl: toUndefIfEmpty(p.imageUrl),
    office: toUndefIfEmpty(p.office),
    position: toUndefIfEmpty(p.position),

    degree: toUndefIfEmpty(p.degree),
    major: toUndefIfEmpty(p.major),
    researchField: toUndefIfEmpty(p.researchField),

    overallRating: p.overallRating,
    totalReviewCount: p.totalReviewCount,
    ratingBreakdown: p.ratingBreakdown,
    departmentAverage: p.departmentAverage,

    lectures: (p.lectures ?? []).map((lec) => ({
      id: lec.id,
      name: lec.name,
      reviewCount: lec.reviewCount,
    })),

    recentLectureReviews: (r.recentLectureReviews ?? []).map((rv) => ({
      id: rv.id,
      lectureName: rv.courseTitle,
      semester: toUndefIfEmpty(rv.semester),
      comment: rv.content,
      createdAt: rv.createdDate,
      homework: rv.homework,
      lectureDifficulty: rv.lecDifficulty,
      gradeDistribution: rv.gradeDistribution,
      examDifficulty: rv.examDifficulty,
      groupProjectRequired: rv.groupProjReq === "Y",
    })),
  };
}
