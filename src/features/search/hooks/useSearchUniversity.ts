import { useMemo } from "react";

import { useSearchUniversityQuery } from "@/entities/university";
import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";

export function useSearchUniversity(
  keyword: string,
  page = 0,
  size = 10,
): {
  results: UnivSearchResult[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useSearchUniversityQuery({ keyword, page, size });

  return useMemo(
    () => ({
      results: data?.items ?? [],
      totalCount: data?.totalCount ?? 0,
      isLoading,
      isError,
    }),
    [data, isLoading, isError],
  );
}
