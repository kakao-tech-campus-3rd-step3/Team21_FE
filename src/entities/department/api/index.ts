import type { DepartmentListResponse } from "@/entities/department/model/department-list.response";
import { apiClient } from "@/shared/api/apiClient";

export async function fetchDepartmentsByCollege(
  collegeSeq: number,
): Promise<DepartmentListResponse> {
  const { data } = await apiClient.get<DepartmentListResponse>(`/api/college/${collegeSeq}`);
  return data;
}
