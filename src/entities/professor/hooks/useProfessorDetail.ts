import { useQuery } from "@tanstack/react-query";

import { fetchProfessorDetail } from "@/entities/professor/api";
import type { ProfessorDetail } from "@/entities/professor/model/professor-detail.domain";
import { mapProfessorDetailResponseToDomain } from "@/entities/professor/model/professor-detail.map";

export function useProfessorDetail(profSeq: number) {
  return useQuery<ProfessorDetail>({
    queryKey: ["professor", "detail", profSeq],
    enabled: Number.isFinite(profSeq) && profSeq > 0,
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const res = await fetchProfessorDetail(profSeq);
      return mapProfessorDetailResponseToDomain(res);
    },
  });
}
