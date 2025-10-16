import type { UnivReviewCreateRequest } from "@/entities/univ-review/model/review-create.request";
import type { UnivReviewCreateResponse } from "@/entities/univ-review/model/review-create.response";
import { apiClient } from "@/shared/api/apiClient";

export async function createUnivReviewApi(body: UnivReviewCreateRequest) {
  const { data } = await apiClient.post<UnivReviewCreateResponse>("/api/reviews/univ", body);
  return data;
}
