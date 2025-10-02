import { apiClient } from "@/shared/api/apiClient";
import type { UniversityDetailResponse } from "../model/university-detail.response";

export async function fetchUniversityDetail(univSeq: number) {
  const { data } = await apiClient.get<UniversityDetailResponse>(`/api/univ/${univSeq}`);
  return data;
}
