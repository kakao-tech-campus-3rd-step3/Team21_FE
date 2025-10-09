import { useQuery } from "@tanstack/react-query";

import { searchDepartmentApi } from "@/entities/department/api";
import { mapDeptSearch } from "@/entities/department/model/dept-search.map";

type Params = { keyword: string; page?: number; size?: number };

export function useSearchDepartmentQuery({ keyword, page, size }: Params) {
  return useQuery({
    queryKey: ["search", "department", { keyword, page, size }],
    queryFn: async () => {
      const res = await searchDepartmentApi({ keyword, page, size });
      return mapDeptSearch(res);
    },
    enabled: !!keyword?.trim(),
    staleTime: 60_000,
  });
}
