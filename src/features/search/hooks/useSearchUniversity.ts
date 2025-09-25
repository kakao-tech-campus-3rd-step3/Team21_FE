import { useMemo } from "react";

import type { UnivSearchResult } from "@/entities/university/model/univsearch.domain";

export function useUniversitySearch(
  query: string,
  univs: typeof import("@/__MOCK__/mockData").univs,
): UnivSearchResult[] {
  return useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return univs
      .filter((u) => u.name.toLowerCase().includes(lower))
      .map((u) => ({
        id: String(u.univSeq),
        name: u.name,
        address: u.address,
        rating: u.rating,
        reviewCount: u.ratingCount,
      }));
  }, [query, univs]);
}
