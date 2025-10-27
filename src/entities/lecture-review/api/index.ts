import type { LectureReviewCreateRequest } from "@/entities/lecture-review/model/review-create.request";
import type { LectureReviewCreateResponse } from "@/entities/lecture-review/model/review-create.response";
import { apiClient } from "@/shared/api/apiClient";

export async function createLectureReviewApi(body: LectureReviewCreateRequest) {
  const { data } = await apiClient.post<LectureReviewCreateResponse>("/api/reviews/lecture", body);
  return data;
}
