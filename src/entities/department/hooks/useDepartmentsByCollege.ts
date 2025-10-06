import { fetchDepartmentsByCollege } from "@/entities/department/api";
import type { Department } from "@/entities/department/model/department-list.domain";
import { mapDepartmentListResponseToDomain } from "@/entities/department/model/department-list.map";
import { useQuery } from "@tanstack/react-query";

export function useDepartmentsByCollege(collegeSeq: number) {
  return useQuery<Department[]>({
    queryKey: ["departments", "byCollege", collegeSeq],
    enabled: Number.isFinite(collegeSeq) && collegeSeq > 0,
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const res = await fetchDepartmentsByCollege(collegeSeq);
      return mapDepartmentListResponseToDomain(res);
    },
  });
}
