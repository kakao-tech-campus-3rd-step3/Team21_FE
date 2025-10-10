import type { UnivProfSearchItem } from "@/entities/univ-prof/model/univ-prof-search.domain";
import type { UnivProfSearchResponse } from "@/entities/univ-prof/model/univ-prof-search.response";

export function mapUnivProfSearch(res: UnivProfSearchResponse): {
  items: UnivProfSearchItem[];
  totalCount: number;
} {
  const items = res.results.map<UnivProfSearchItem>((r) => ({
    id: `${r.univSeq}:${r.profName}`,
    univId: String(r.univSeq),
    univName: r.univName,
    profName: r.profName,
    collegeName: r.collegeName,
    deptName: r.deptName,
    position: r.position,
    rating: r.rating,
    reviewCount: r.reviewCount,
  }));
  return { items, totalCount: res.totalCount };
}
