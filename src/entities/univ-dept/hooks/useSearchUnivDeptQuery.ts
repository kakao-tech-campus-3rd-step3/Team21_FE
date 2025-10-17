import { useQuery } from "@tanstack/react-query";

import { searchUnivDeptApi } from "@/entities/univ-dept/api";
import { mapUnivDeptSearch } from "@/entities/univ-dept/model/univ-dept-search.map";

type Params = {
  univKeyword: string;
  deptKeyword: string;
  page?: number;
  size?: number;
};

export function useSearchUnivDeptQuery({ univKeyword, deptKeyword, page, size }: Params) {
  const enabled = !!univKeyword.trim();
  return useQuery({
    queryKey: ["search", "univ-dept", { univKeyword, deptKeyword, page, size }],
    queryFn: async () => {
      const res = await searchUnivDeptApi({ univKeyword, deptKeyword, page, size });
      return mapUnivDeptSearch(res);
    },
    enabled,
    staleTime: 60_000,
  });
}
