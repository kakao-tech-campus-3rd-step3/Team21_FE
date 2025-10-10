import type { ProfSearchResult } from "@/entities/professor/model/prof-search.domain";
import type { ProfSearchResponse } from "@/entities/professor/model/prof-search.response";

export function mapProfSearch(res: ProfSearchResponse): {
  items: ProfSearchResult[];
  totalCount: number;
} {
  const items = res.professor.map<ProfSearchResult>((p) => ({
    id: String(p.profSeq),
    name: p.name,
    position: p.position,
    univ: p.univName,
    college: p.collegeName,
    dept: p.deptName,
    rating: p.rating,
    reviewCount: p.reviewCount,
  }));
  return { items, totalCount: res.totalCount };
}
