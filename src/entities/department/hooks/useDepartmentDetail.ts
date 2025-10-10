import { useQuery } from "@tanstack/react-query";

import { fetchDepartmentDetail } from "@/entities/department/api";
import type { DepartmentDetail } from "@/entities/department/model/department-detail.domain";
import {
  mapDepartmentDetailResponseToDomain,
  toGetDepartmentDetailRequest,
} from "@/entities/department/model/department-detail.map";

export function useDepartmentDetail(deptSeq: number) {
  return useQuery<DepartmentDetail>({
    queryKey: ["department", "detail", deptSeq],
    enabled: Number.isFinite(deptSeq) && deptSeq > 0,
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const req = toGetDepartmentDetailRequest(deptSeq);
      const res = await fetchDepartmentDetail(req.deptSeq);
      return mapDepartmentDetailResponseToDomain(res);
    },
  });
}
