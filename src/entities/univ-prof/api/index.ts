import type { UnivProfSearchRequest } from "@/entities/univ-prof/model/univ-prof-search.request";
import type { UnivProfSearchResponse } from "@/entities/univ-prof/model/univ-prof-search.response";
import { apiClient } from "@/shared/api/apiClient";

export async function searchUnivProfApi(params: UnivProfSearchRequest) {
  const { univKeyword, profKeyword, page = 0, size = 10 } = params;
  const { data } = await apiClient.get<UnivProfSearchResponse>("/api/search/univ-prof", {
    params: { univKeyword, profKeyword, page, size },
  });
  return data;
}
