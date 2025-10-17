import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { UnivSearchResponse } from "@/entities/university/model/univ-search.response";

export function mapUnivSearch(res: UnivSearchResponse): {
  items: UnivSearchResult[];
  totalCount: number;
} {
  const items = res.universities.map<UnivSearchResult>((u) => ({
    id: String(u.univSeq),
    name: u.name,
    address: u.address,
    imageUrl: u.imageUrl,
    rating: u.rating,
    reviewCount: u.reviewCount,
  }));
  return { items, totalCount: res.totalCount };
}
