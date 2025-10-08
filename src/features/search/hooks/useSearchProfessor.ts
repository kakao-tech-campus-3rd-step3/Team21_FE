import { useMemo } from "react";

import { useSearchProfessorQuery } from "@/entities/professor";
import type { ProfSearchResult } from "@/entities/professor/model/prof-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";

function toFeatureType(items: ProfSearchResult[]): ProfessorSearch[] {
  return items.map((p) => ({
    id: p.id,
    name: p.name,
    univ: p.univ,
    dept: p.dept,
  }));
}

export function useSearchProfessor(
  keyword: string,
  page = 0,
  size = 10,
): {
  results: ProfessorSearch[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useSearchProfessorQuery({ keyword, page, size });

  return useMemo(
    () => ({
      results: toFeatureType(data?.items ?? []),
      totalCount: data?.totalCount ?? 0,
      isLoading,
      isError,
    }),
    [data, isLoading, isError],
  );
}
