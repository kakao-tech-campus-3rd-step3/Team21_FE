import { useQuery } from "@tanstack/react-query";

import { fetchCollegesByUniversity } from "@/entities/college/api";
import type { College } from "@/entities/college/model/college.domain";
import {
  mapCollegeListResponseToDomain,
  toGetCollegesRequest,
} from "@/entities/college/model/college-list.map";

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
