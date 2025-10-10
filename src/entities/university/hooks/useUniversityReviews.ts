import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchUniversityReviews } from "@/entities/university/api";
import type { UniversityReviewPage } from "@/entities/university/model/university-review.domain";
import {
  mapUniversityReviewListResponseToDomain,
  toGetUniversityReviewsRequest,
} from "@/entities/university/model/university-review.map";

export function useUniversityReviews(univSeq: number, size = 10) {
  return useInfiniteQuery<UniversityReviewPage>({
    queryKey: ["university", "reviews", univSeq, size],
    enabled: Number.isFinite(univSeq) && univSeq > 0,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const req = toGetUniversityReviewsRequest(univSeq, pageParam as number, size);
      const res = await fetchUniversityReviews(req.univSeq, req.page, req.size);
      return mapUniversityReviewListResponseToDomain(res);
    },
    getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.page + 1),
  });
}
