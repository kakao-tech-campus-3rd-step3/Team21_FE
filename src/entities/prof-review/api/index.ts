import type { ProfReviewCreateRequest } from "@/entities/prof-review/model/review-create.request";
import type { ProfReviewCreateResponse } from "@/entities/prof-review/model/review-create.response";
import { apiClient } from "@/shared/api/apiClient";

export async function createProfReviewApi(body: ProfReviewCreateRequest) {
  const { data } = await apiClient.post<ProfReviewCreateResponse>("/api/reviews/prof", body);
  return data;
}
