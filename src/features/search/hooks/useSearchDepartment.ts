import { useMemo } from "react";

import type { DeptSearchResult } from "@/entities/department";
import { useSearchDepartmentQuery } from "@/entities/department";
import type { DepartmentSearch } from "@/features/department-search";

function toFeatureType(items: DeptSearchResult[]): DepartmentSearch[] {
  return items.map((d) => ({
    id: d.id,
    name: d.name,
    univ: d.univ,
  }));
}

export function useSearchDepartment(
  keyword: string,
  page = 0,
  size = 10,
): {
  results: DepartmentSearch[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useSearchDepartmentQuery({ keyword, page, size });
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
