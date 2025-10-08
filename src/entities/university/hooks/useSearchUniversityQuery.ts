import { useQuery } from "@tanstack/react-query";

import { searchUniversityApi } from "@/entities/university/api";
import { mapUnivSearch } from "@/entities/university/model/univ-search.map";

type Params = { keyword: string; page?: number; size?: number };

export function useSearchUniversityQuery({ keyword, page, size }: Params) {
  return useQuery({
    queryKey: ["search", "university", { keyword, page, size }],
    queryFn: async () => {
      const res = await searchUniversityApi({ keyword, page, size });
      return mapUnivSearch(res);
    },
    enabled: !!keyword?.trim(),
    staleTime: 60_000,
  });
}
