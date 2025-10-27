import { useMutation } from "@tanstack/react-query";

import { createProfReviewApi } from "@/entities/prof-review/api";

export function useCreateProfReview() {
  return useMutation({
    mutationFn: createProfReviewApi,
  });
}
