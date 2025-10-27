import type { ProfessorDetail } from "./professor-detail.domain";
import type { ProfessorDetailResponse } from "./professor-detail.response";

export function mapProfessorDetailResponseToDomain(r: ProfessorDetailResponse): ProfessorDetail {
  const p = r.professor;

  return {
    id: p.id,
    name: p.name,
    university: p.university,
    college: p.college,
    department: p.department,
    email: p.email,
    imageUrl: p.imageUrl,
    office: p.office,
    position: p.position,

    degree: p.degree,
    major: p.major,
    researchField: p.researchField,

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
      semester: rv.semester,
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
