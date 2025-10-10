import type { ProfSearchRequest } from "@/entities/professor/model/prof-search.request";
import type { ProfSearchResponse } from "@/entities/professor/model/prof-search.response";
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

export async function searchProfessorApi(params: ProfSearchRequest) {
  const { keyword, page = 0, size = 10 } = params;
  const { data } = await apiClient.get<ProfSearchResponse>("/api/search/prof", {
    params: { keyword, page, size },
  });
  return data;
}
