import { useState } from "react";

import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { DepartmentSearch } from "@/features/department-search/model/department-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { useSearchDepartment } from "@/features/search/hooks/useSearchDepartment";
import { useSearchProfessor } from "@/features/search/hooks/useSearchProfessor";
import { useSearchUnivDept } from "@/features/search/hooks/useSearchUnivDept";
import { useSearchUniversity } from "@/features/search/hooks/useSearchUniversity";
import { resolveDeptIdByName } from "@/features/search/lib/resolveDeptId";
import type { UnivDeptSearch } from "@/features/univ-dept-search/model/univ-dept-search.domain";
import { useDebounce } from "@/shared/hooks/useDebounce";

type Mode = "univ" | "prof" | "dept" | "univ-dept";

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

  const [univKeyword, deptKeyword] = (() => {
    const t = dq.trim();
    if (!t) return ["", ""];
    const [first, ...rest] = t.split(/\s+/);
    return [first ?? "", rest.join(" ") ?? ""];
  })();

  const univDept = useSearchUnivDept(univKeyword, deptKeyword, 0, pageSize);

  const results: UnivSearchResult[] | ProfessorSearch[] | DepartmentSearch[] | UnivDeptSearch[] =
    mode === "univ"
      ? univ.results
      : mode === "prof"
        ? prof.results
        : mode === "dept"
          ? dept.results
          : univDept.results;

  async function handlePick(
    item: UnivSearchResult | ProfessorSearch | DepartmentSearch | UnivDeptSearch,
  ) {
    if (mode === "univ") {
      onSelectUniv?.(item as UnivSearchResult);
    } else if (mode === "prof") {
      onSelectProf?.(item as ProfessorSearch);
    } else if (mode === "dept") {
      onSelectDept?.(item as DepartmentSearch);
    } else {
      const r = item as UnivDeptSearch;
      if (!onSelectDept) return;
      const deptSeq = await resolveDeptIdByName(r.univName, r.deptName);
      if (deptSeq) {
        onSelectDept({ id: String(deptSeq), name: r.deptName, univ: r.univName });
      } else {
        console.warn("학과를 찾지 못했습니다:", r.univName, r.deptName);
      }
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
