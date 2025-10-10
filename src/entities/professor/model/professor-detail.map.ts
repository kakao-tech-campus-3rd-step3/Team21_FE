import type { ProfessorDetail } from "./professor-detail.domain";
import type { ProfessorDetailResponse } from "./professor-detail.response";

export function mapProfessorDetailResponseToDomain(r: ProfessorDetailResponse): ProfessorDetail {
  const p = r.professor;
  return {
    id: p.id,
    name: p.name,
    university: { id: p.university.id, name: p.university.name },
    college: { id: p.college.id, name: p.college.name },
    department: {
      id: p.department.id,
      name: p.department.name,
      homepage: p.department.homepage || undefined,
    },
    email: p.email || undefined,
    imageUrl: p.imageUrl || undefined,
    office: p.office || undefined,
    position: p.position || undefined,
    overallRating: typeof p.overallRating === "number" ? p.overallRating : 0,
    totalReviewCount: p.totalReviewCount ?? 0,
    ratingBreakdown: {
      thesisPerformance: p.ratingBreakdown.thesisPerformance ?? 0,
      researchPerformance: p.ratingBreakdown.researchPerformance ?? 0,
      homework: p.ratingBreakdown.homework ?? 0,
      lectureDifficulty: p.ratingBreakdown.lectureDifficulty ?? 0,
      examDifficulty: p.ratingBreakdown.examDifficulty ?? 0,
    },
    departmentAverage: {
      thesisPerformance: p.departmentAverage.thesisPerformance ?? 0,
      researchPerformance: p.departmentAverage.researchPerformance ?? 0,
      homework: p.departmentAverage.homework ?? 0,
      lectureDifficulty: p.departmentAverage.lectureDifficulty ?? 0,
      examDifficulty: p.departmentAverage.examDifficulty ?? 0,
    },
    lectures: (p.lectures ?? []).map((l) => ({
      id: l.id,
      name: l.name,
      code: l.code ?? undefined,
      semester: l.semester ?? undefined,
    })),
    recentLectureReviews: (r.recentLectureReviews ?? []).map((rv) => ({
      id: rv.id,
      lectureId: rv.lectureId,
      lectureName: rv.lectureName,
      rating: rv.rating,
      comment: rv.comment ?? undefined,
      createdAt: rv.createdAt ?? undefined,
    })),
  };
}
