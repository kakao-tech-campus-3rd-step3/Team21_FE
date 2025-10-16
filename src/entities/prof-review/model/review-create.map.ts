import type { ProfReviewCreated } from "@/entities/prof-review/model/review-create.domain";
import type { ProfReviewCreateResponse } from "@/entities/prof-review/model/review-create.response";

export function mapCreateProfReview(res: ProfReviewCreateResponse): ProfReviewCreated {
  return { id: res.reviewSeq, createdAt: res.timestamp };
}
