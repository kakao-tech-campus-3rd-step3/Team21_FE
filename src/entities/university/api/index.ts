import type { UniversityReviewListResponse } from "@/entities/university/model/university-review.response";
import { apiClient } from "@/shared/api/apiClient";

import type { UniversityDetailResponse } from "../model/university-detail.response";

export async function fetchUniversityDetail(univSeq: number) {
  const { data } = await apiClient.get<UniversityDetailResponse>(`/api/univ/${univSeq}`);
  return data;
}

export async function fetchUniversityReviews(univSeq: number, page: number, size: number) {
  const { data } = await apiClient.get<UniversityReviewListResponse>(
    `/api/univ/${univSeq}/reviews`,
    { params: { page, size } },
  );
  return data;
}
