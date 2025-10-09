import { useState } from "react";

import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { DepartmentSearch } from "@/features/department-search/model/department-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { useSearchDepartment } from "@/features/search/hooks/useSearchDepartment";
import { useSearchProfessor } from "@/features/search/hooks/useSearchProfessor";
import { useSearchUniversity } from "@/features/search/hooks/useSearchUniversity";
import { useDebounce } from "@/shared/hooks/useDebounce";

type Mode = "univ" | "prof" | "dept";

type Params = {
  placeholder?: string;
  onSelectUniv?: (u: UnivSearchResult) => void;
  onSelectProf?: (p: ProfessorSearch) => void;
  onSelectDept?: (d: DepartmentSearch) => void;
  pageSize?: number;
};

export function useSearchBox({ onSelectUniv, onSelectProf, onSelectDept, pageSize = 5 }: Params) {
  const [mode, setMode] = useState<Mode>("univ");
  const [query, setQuery] = useState("");
  const dq = useDebounce(query, 300);

  const univ = useSearchUniversity(dq, 0, pageSize);
  const prof = useSearchProfessor(dq, 0, pageSize);
  const dept = useSearchDepartment(dq, 0, pageSize);

  const results = mode === "univ" ? univ.results : mode === "prof" ? prof.results : dept.results;

  function handlePick(item: UnivSearchResult | ProfessorSearch | DepartmentSearch) {
    if (mode === "univ") onSelectUniv?.(item as UnivSearchResult);
    else if (mode === "prof") onSelectProf?.(item as ProfessorSearch);
    else onSelectDept?.(item as DepartmentSearch);
    setQuery("");
  }

  return {
    mode,
    setMode,
    query,
    setQuery,
    results,
    handlePick,
  };
}
