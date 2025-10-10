import { apiClient } from "@/shared/api/apiClient";

import type { DeptSearchRequest } from "@/entities/department/model/dept-search.request";
import type { DeptSearchResponse } from "@/entities/department/model/dept-search.response";
import type { DepartmentDetailResponse } from "@/entities/department/model/department-detail.response";
import type { DepartmentListResponse } from "@/entities/department/model/department-list.response";

export async function fetchDepartmentsByCollege(
  collegeSeq: number,
): Promise<DepartmentListResponse> {
  const { data } = await apiClient.get<DepartmentListResponse>(`/api/college/${collegeSeq}`);
  return data;
}

export async function fetchDepartmentDetail(deptSeq: number): Promise<DepartmentDetailResponse> {
  const { data } = await apiClient.get<DepartmentDetailResponse>(`/api/departments/${deptSeq}`);
  return data;
}

export async function searchDepartmentApi(params: DeptSearchRequest) {
  const { keyword, page = 0, size = 10 } = params;
  const { data } = await apiClient.get<DeptSearchResponse>("/api/search/dept", {
    params: { keyword, page, size },
  });
  return data;
}
