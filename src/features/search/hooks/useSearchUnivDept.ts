import { useMemo } from "react";

import type { UnivDeptSearchItem } from "@/entities/univ-dept";
import { useSearchUnivDeptQuery } from "@/entities/univ-dept";
import type { UnivDeptSearch } from "@/features/univ-dept-search";

function toFeatureType(items: UnivDeptSearchItem[]): UnivDeptSearch[] {
  return items.map((i) => ({
    id: i.id,
    univId: i.univId,
    univName: i.univName,
    collegeName: i.collegeName,
    deptName: i.deptName,
  }));
}

export function useSearchUnivDept(
  univKeyword: string,
  deptKeyword: string,
  page = 0,
  size = 10,
): {
  results: UnivDeptSearch[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useSearchUnivDeptQuery({
    univKeyword,
    deptKeyword,
    page,
    size,
  });

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
