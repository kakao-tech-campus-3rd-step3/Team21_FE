import { useQuery } from "@tanstack/react-query";

import { fetchCollegeDetail } from "@/entities/college/api";
import type { CollegeDetail } from "@/entities/college/model/college-detail.domain";
import {
  mapCollegeDetailResponseToDomain,
  toGetCollegeDetailRequest,
} from "@/entities/college/model/college-detail.map";

export function useCollegeDetail(collegeSeq: number) {
  return useQuery<CollegeDetail>({
    queryKey: ["college", "detail", collegeSeq],
    enabled: Number.isFinite(collegeSeq) && collegeSeq > 0,
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const req = toGetCollegeDetailRequest(collegeSeq);
      const res = await fetchCollegeDetail(req.collegeSeq);
      return mapCollegeDetailResponseToDomain(res);
    },
  });
}
