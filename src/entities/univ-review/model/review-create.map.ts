import type { UnivReviewCreated } from "@/entities/univ-review/model/review-create.domain";
import type { UnivReviewCreateResponse } from "@/entities/univ-review/model/review-create.response";

export function mapCreateReview(res: UnivReviewCreateResponse): UnivReviewCreated {
  return {
    id: res.reviewSeq,
    createdAt: res.timestamp,
  };
}
