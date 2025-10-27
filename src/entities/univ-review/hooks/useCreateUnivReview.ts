import { useMutation } from "@tanstack/react-query";

import { createUnivReviewApi } from "@/entities/univ-review/api";

export function useCreateUnivReview() {
  return useMutation({
    mutationFn: createUnivReviewApi,
  });
}
