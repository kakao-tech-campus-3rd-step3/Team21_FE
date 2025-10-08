import type { UnivSearchRequest } from "@/entities/university/model/univ-search.request";
import type { UnivSearchResponse } from "@/entities/university/model/univ-search.response";
import { apiClient } from "@/shared/api/apiClient";

export async function searchUniversityApi(params: UnivSearchRequest) {
  const { keyword, page = 0, size = 10 } = params;
  const { data } = await apiClient.get<UnivSearchResponse>("/api/search/univ", {
    params: { keyword, page, size },
  });
  return data;
}
