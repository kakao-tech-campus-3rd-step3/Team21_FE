import { useQuery } from "@tanstack/react-query";

import { searchProfessorApi } from "@/entities/professor/api";
import { mapProfSearch } from "@/entities/professor/model/prof-search.map";

type Params = { keyword: string; page?: number; size?: number };

export function useSearchProfessorQuery({ keyword, page, size }: Params) {
  return useQuery({
    queryKey: ["search", "professor", { keyword, page, size }],
    queryFn: async () => {
      const res = await searchProfessorApi({ keyword, page, size });
      return mapProfSearch(res);
    },
    enabled: !!keyword?.trim(),
    staleTime: 60_000,
  });
}
