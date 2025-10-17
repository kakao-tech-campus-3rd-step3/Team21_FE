import type { UnivDeptSearchItem } from "@/entities/univ-dept/model/univ-dept-search.domain";
import type { UnivDeptSearchResponse } from "@/entities/univ-dept/model/univ-dept-search.response";

export function mapUnivDeptSearch(res: UnivDeptSearchResponse): {
  items: UnivDeptSearchItem[];
  totalCount: number;
} {
  const items = res.results.map<UnivDeptSearchItem>((r) => ({
    id: `${r.univSeq}:${r.deptName}`,
    univId: String(r.univSeq),
    univName: r.univName,
    collegeName: r.collegeName,
    deptName: r.deptName,
    description: r.description,
    studentCount: r.studentCount,
    rating: r.rating,
    reviewCount: r.reviewCount,
  }));
  return { items, totalCount: res.totalCount };
}
