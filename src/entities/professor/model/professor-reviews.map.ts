import type { ProfessorReview } from "./professor-reviews.domain";
import type { ProfessorReviewsResponse } from "./professor-reviews.response";

function arrayDateToISO(a: [number, number, number, number, number]): string {
  const [y, mon, d, h, m] = a;
  const iso = new Date(Date.UTC(y, mon - 1, d, h, m, 0)).toISOString();
  return iso;
}

export function mapProfessorReviewsResponseToDomain(r: ProfessorReviewsResponse): {
  items: ProfessorReview[];
  hasNext: boolean;
} {
  const items: ProfessorReview[] = (r.reviews ?? []).map((v) => ({
    id: v.id,
    courseTitle: v.courseTitle,
    semester: v.semester,
    homework: v.homework,
    lectureDifficulty: v.lecDifficulty,
    gradeDistribution: v.gradeDistribution,
    examDifficulty: v.examDifficulty,
    groupProjectRequired: v.groupProjReq === "Y",
    content: v.content,
    createdAt: arrayDateToISO(v.createdDate),
  }));
  return { items, hasNext: !!r.hasNext };
}
