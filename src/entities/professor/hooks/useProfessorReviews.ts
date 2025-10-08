import { fetchProfessorReviews } from "@/entities/professor/api";
import type { ProfessorReview } from "@/entities/professor/model/professor-reviews.domain";
import { mapProfessorReviewsResponseToDomain } from "@/entities/professor/model/professor-reviews.map";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = { pageSize?: number };

type PageData = { items: ProfessorReview[]; hasNext: boolean };

export function useProfessorReviews(profSeq: number, { pageSize = 10 }: Params = {}) {
  return useInfiniteQuery<PageData, Error, ProfessorReview[], any, number>({
    queryKey: ["professor", "reviews", profSeq, pageSize],
    enabled: Number.isFinite(profSeq) && profSeq > 0,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchProfessorReviews(profSeq, pageParam, pageSize);
      return mapProfessorReviewsResponseToDomain(res);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
    select: (data) => {
      return data.pages.flatMap((p) => p.items);
    },
  });
}
