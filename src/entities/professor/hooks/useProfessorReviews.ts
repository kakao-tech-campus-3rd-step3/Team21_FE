import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { fetchProfessorReviews } from "@/entities/professor/api";
import type { ProfessorReview } from "@/entities/professor/model/professor-reviews.domain";
import { mapProfessorReviewsResponseToDomain } from "@/entities/professor/model/professor-reviews.map";

type Params = { pageSize?: number };

type PageData = { items: ProfessorReview[]; hasNext: boolean };

type ProfessorReviewQueryKey = readonly ["professor", "reviews", number, number];

export function useProfessorReviews(profSeq: number, { pageSize = 10 }: Params = {}) {
  return useInfiniteQuery<PageData, Error, ProfessorReview[], ProfessorReviewQueryKey, number>({
    queryKey: ["professor", "reviews", profSeq, pageSize] as const,
    enabled: Number.isFinite(profSeq) && profSeq > 0,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchProfessorReviews(profSeq, pageParam, pageSize);
      return mapProfessorReviewsResponseToDomain(res);
    },
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNext ? allPages.length : undefined),
    select: (data: InfiniteData<PageData>) => data.pages.flatMap((p) => p.items),
  });
}
