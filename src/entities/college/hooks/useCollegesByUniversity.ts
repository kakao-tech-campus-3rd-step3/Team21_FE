import { fetchCollegesByUniversity } from "@/entities/college/api";
import {
  mapCollegeListResponseToDomain,
  toGetCollegesRequest,
} from "@/entities/college/model/college-list.map";
import type { College } from "@/entities/college/model/college.domain";
import { useQuery } from "@tanstack/react-query";

export function useCollegesByUniversity(univSeq: number) {
  return useQuery<College[]>({
    queryKey: ["college", "list", univSeq],
    enabled: Number.isFinite(univSeq) && univSeq > 0,
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const req = toGetCollegesRequest(univSeq);
      const res = await fetchCollegesByUniversity(req.univSeq);
      return mapCollegeListResponseToDomain(res);
    },
  });
}
