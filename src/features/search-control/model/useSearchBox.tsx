import { useState } from "react";

import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { DepartmentSearch } from "@/features/department-search/model/department-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { useSearchDepartment } from "@/features/search/hooks/useSearchDepartment";
import { useSearchProfessor } from "@/features/search/hooks/useSearchProfessor";
import { useSearchUnivDept } from "@/features/search/hooks/useSearchUnivDept";
import { useSearchUniversity } from "@/features/search/hooks/useSearchUniversity";
import { useSearchUnivProf } from "@/features/search/hooks/useSearchUnivProf";
import { resolveDeptIdByName } from "@/features/search/lib/resolveDeptId";
import { resolveProfIdByName } from "@/features/search/lib/resolveProfId";
import type { UnivDeptSearch } from "@/features/univ-dept-search/model/univ-dept-search.domain";
import type { UnivProfSearch } from "@/features/univ-prof-search/model/univ-prof-search.domain";
import { useDebounce } from "@/shared/hooks/useDebounce";

type Mode = "univ" | "prof" | "dept" | "univ-dept" | "univ-prof";

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

  const [first, ...rest] = dq.trim().split(/\s+/);
  const left = first ?? "";
  const right = rest.join(" ") ?? "";

  const univDept = useSearchUnivDept(left, right, 0, pageSize);
  const univProf = useSearchUnivProf(left, right, 0, pageSize);

  const results:
    | UnivSearchResult[]
    | ProfessorSearch[]
    | DepartmentSearch[]
    | UnivDeptSearch[]
    | UnivProfSearch[] =
    mode === "univ"
      ? univ.results
      : mode === "prof"
        ? prof.results
        : mode === "dept"
          ? dept.results
          : mode === "univ-dept"
            ? univDept.results
            : univProf.results;

  async function handlePick(
    item: UnivSearchResult | ProfessorSearch | DepartmentSearch | UnivDeptSearch | UnivProfSearch,
  ) {
    if (mode === "univ") {
      onSelectUniv?.(item as UnivSearchResult);
    } else if (mode === "prof") {
      onSelectProf?.(item as ProfessorSearch);
    } else if (mode === "dept") {
      onSelectDept?.(item as DepartmentSearch);
    } else if (mode === "univ-dept") {
      const r = item as UnivDeptSearch;
      if (!onSelectDept) return;
      const deptSeq = await resolveDeptIdByName(r.univName, r.deptName);
      if (deptSeq) onSelectDept({ id: String(deptSeq), name: r.deptName, univ: r.univName });
    } else {
      const r = item as UnivProfSearch;
      if (!onSelectProf) return;
      const profSeq = await resolveProfIdByName(r.univName, r.profName);
      if (profSeq)
        onSelectProf({ id: String(profSeq), name: r.profName, univ: r.univName, dept: r.deptName });
    }
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
