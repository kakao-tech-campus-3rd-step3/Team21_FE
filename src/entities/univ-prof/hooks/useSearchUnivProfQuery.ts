import { useQuery } from "@tanstack/react-query";

import { searchUnivProfApi } from "@/entities/univ-prof/api";
import { mapUnivProfSearch } from "@/entities/univ-prof/model/univ-prof-search.map";

type Params = { univKeyword: string; profKeyword: string; page?: number; size?: number };

export function useSearchUnivProfQuery({ univKeyword, profKeyword, page, size }: Params) {
  const enabled = !!univKeyword.trim() && !!profKeyword.trim();
  return useQuery({
    queryKey: ["search", "univ-prof", { univKeyword, profKeyword, page, size }],
    queryFn: async () => {
      const res = await searchUnivProfApi({ univKeyword, profKeyword, page, size });
      return mapUnivProfSearch(res);
    },
    enabled,
    staleTime: 60_000,
  });
}
