import type { UnivDeptSearchRequest } from "@/entities/univ-dept/model/univ-dept-search.request";
import type { UnivDeptSearchResponse } from "@/entities/univ-dept/model/univ-dept-search.response";
import { apiClient } from "@/shared/api/apiClient";

export async function searchUnivDeptApi(params: UnivDeptSearchRequest) {
  const { univKeyword, deptKeyword, page = 0, size = 10 } = params;
  const { data } = await apiClient.get<UnivDeptSearchResponse>("/api/search/univ-dept", {
    params: { univKeyword, deptKeyword, page, size },
  });
  return data;
}
