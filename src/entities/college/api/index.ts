import { apiClient } from "@/shared/api/apiClient";
import type { CollegeListResponse } from "../model/college-list.response";

export async function fetchCollegesByUniversity(univSeq: number) {
  const { data } = await apiClient.get<CollegeListResponse>(`/api/univ/${univSeq}/colleges`);
  return data;
}
