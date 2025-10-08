import type { ProfSearchRequest } from "@/entities/professor/model/prof-search.request";
import type { ProfSearchResponse } from "@/entities/professor/model/prof-search.response";
import { apiClient } from "@/shared/api/apiClient";

export async function searchProfessorApi(params: ProfSearchRequest) {
  const { keyword, page = 0, size = 10 } = params;
  const { data } = await apiClient.get<ProfSearchResponse>("/api/search/prof", {
    params: { keyword, page, size },
  });
  return data;
}
