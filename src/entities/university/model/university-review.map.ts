import type { UniversityReviewPage } from "./university-review.domain";
import type { GetUniversityReviewsRequest } from "./university-review.request";
import type { UniversityReviewListResponse } from "./university-review.response";

export function toGetUniversityReviewsRequest(
  univSeq: number,
  page: number,
  size: number,
): GetUniversityReviewsRequest {
  return { univSeq, page, size };
}

export function mapUniversityReviewListResponseToDomain(
  r: UniversityReviewListResponse,
): UniversityReviewPage {
  return {
    items: (r.content ?? []).map((v) => ({
      id: v.univReviewSeq,
      author: v.createUser,
      rating: v.overallScore,
      text: v.reviewText,
      createdAt: new Date(v.createDate),
      scores: {
        food: v.foodScore,
        dorm: v.dormScore,
        conv: v.convScore,
        campus: v.campusScore,
      },
    })),
    page: r.pageNumber,
    size: r.pageSize,
    totalPages: r.totalPages,
    totalElements: r.totalElements,
    isFirst: r.first,
    isLast: r.last,
  };
}
