import type { CollegeDetailResponse } from "@/entities/college/model/college-detail.response";
import type { CollegeListResponse } from "@/entities/college/model/college-list.response";
import { apiClient } from "@/shared/api/apiClient";

export async function fetchCollegesByUniversity(univSeq: number) {
  const { data } = await apiClient.get<CollegeListResponse>(`/api/univ/${univSeq}/colleges`);
  return data;
}

export async function fetchCollegeDetail(collegeSeq: number) {
  const { data } = await apiClient.get<CollegeDetailResponse>(`/api/college/${collegeSeq}/details`);
  return data;
}
