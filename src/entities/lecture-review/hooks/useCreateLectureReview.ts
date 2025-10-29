import { useMutation } from "@tanstack/react-query";

import { createLectureReviewApi } from "@/entities/lecture-review/api";

export function useCreateLectureReview() {
  return useMutation({
    mutationFn: createLectureReviewApi,
  });
}
