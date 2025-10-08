import type { ProfessorDetailResponse } from "@/entities/professor/model/professor-detail.response";
import type { ProfessorReviewsResponse } from "@/entities/professor/model/professor-reviews.response";
import { apiClient } from "@/shared/api/apiClient";

export async function fetchProfessorDetail(profSeq: number) {
  const { data } = await apiClient.get<ProfessorDetailResponse>(`/api/prof/${profSeq}`);
  return data;
}

export async function fetchProfessorReviews(profSeq: number, page: number, size: number) {
  const res = await apiClient.get<ProfessorReviewsResponse>(`/api/prof/${profSeq}/reviews`, {
    params: { page, size },
  });
  return res.data;
}
