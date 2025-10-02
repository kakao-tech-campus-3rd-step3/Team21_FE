import { fetchUniversityDetail } from "@/entities/university/api";
import type { UniversityDetail } from "@/entities/university/model/university-detail.domain";
import {
  mapDetailResponseToDomain,
  toGetDetailRequest,
} from "@/entities/university/model/university-detail.map";
import { useQuery } from "@tanstack/react-query";

export function useUniversityDetail(univSeq: number) {
  return useQuery<UniversityDetail>({
    queryKey: ["university", "detail", univSeq],
    enabled: Number.isFinite(univSeq) && univSeq > 0,
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const req = toGetDetailRequest(univSeq);
      const res = await fetchUniversityDetail(req.univSeq);
      return mapDetailResponseToDomain(res);
    },
  });
}
