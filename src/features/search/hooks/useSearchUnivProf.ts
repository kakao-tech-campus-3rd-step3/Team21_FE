import { useMemo } from "react";

import type { UnivProfSearchItem } from "@/entities/univ-prof";
import { useSearchUnivProfQuery } from "@/entities/univ-prof";
import type { UnivProfSearch } from "@/features/univ-prof-search";

function toFeature(items: UnivProfSearchItem[]): UnivProfSearch[] {
  return items.map((i) => ({ ...i }));
}

export function useSearchUnivProf(
  univKeyword: string,
  profKeyword: string,
  page = 0,
  size = 10,
): {
  results: UnivProfSearch[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useSearchUnivProfQuery({
    univKeyword,
    profKeyword,
    page,
    size,
  });
  return useMemo(
    () => ({
      results: toFeature(data?.items ?? []),
      totalCount: data?.totalCount ?? 0,
      isLoading,
      isError,
    }),
    [data, isLoading, isError],
  );
}
