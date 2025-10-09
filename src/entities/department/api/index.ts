import type { DeptSearchRequest } from "@/entities/department/model/dept-search.request";
import type { DeptSearchResponse } from "@/entities/department/model/dept-search.response";
import { apiClient } from "@/shared/api/apiClient";

export async function searchDepartmentApi(params: DeptSearchRequest) {
  const { keyword, page = 0, size = 10 } = params;
  const { data } = await apiClient.get<DeptSearchResponse>("/api/search/dept", {
    params: { keyword, page, size },
  });
  return data;
}
