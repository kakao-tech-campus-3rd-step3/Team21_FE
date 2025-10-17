import type { LectureReviewCreated } from "@/entities/lecture-review/model/review-create.domain";
import type { LectureReviewCreateResponse } from "@/entities/lecture-review/model/review-create.response";

export function mapCreateLectureReview(res: LectureReviewCreateResponse): LectureReviewCreated {
  return { id: res.reviewSeq, createdAt: res.timestamp };
}
