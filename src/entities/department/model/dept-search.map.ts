import type { DeptSearchResult } from "@/entities/department/model/dept-search.domian";
import type { DeptSearchResponse } from "@/entities/department/model/dept-search.response";

export function mapDeptSearch(res: DeptSearchResponse): {
  items: DeptSearchResult[];
  totalCount: number;
} {
  const items = res.departments.map<DeptSearchResult>((d) => ({
    id: String(d.deptSeq),
    name: d.name,
    univ: d.univName,
    description: d.description,
    studentCount: d.studentCount,
    rating: d.rating,
    reviewCount: d.reviewCount,
  }));
  return { items, totalCount: res.totalCount };
}
