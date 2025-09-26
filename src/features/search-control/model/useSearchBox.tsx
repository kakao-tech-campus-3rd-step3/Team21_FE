import { useMemo, useState } from "react";

import { univs } from "@/__MOCK__/mockData";
import { mapprofessor } from "@/entities/professor/model/mapprofessor";
import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { useProfessorSearch } from "@/features/search/hooks/useSearchProfessor";
import { useSearchUniversity } from "@/features/search/hooks/useSearchUniversity";
import { SEARCH_CONTROL_PROF_TEXT, SEARCH_CONTROL_TEXT } from "@/features/search-control/text";

type Mode = "univ" | "prof";

type Params = {
  placeholder?: string;
  onSelectUniv?: (univ: UnivSearchResult) => void;
  onSelectProf?: (prof: ProfessorSearch) => void;
  professors?: ProfessorSearch[];
};

export function useSearchBox({ placeholder, onSelectUniv, onSelectProf, professors = [] }: Params) {
  const [mode, setMode] = useState<Mode>("univ");
  const [query, setQuery] = useState("");

  //충남대학교, 이영석 교수만 검색 가능하도록(임시)
  const CNU_ONLY = useMemo(() => univs.filter((u) => u.univSeq === 100), []);
  const univResults = useSearchUniversity(query, CNU_ONLY).slice(0, 5);

  const LEE_ONLY = useMemo<ProfessorSearch[]>(() => {
    const list = professors.filter((p) => p.id === "100" || p.name === "이영석");
    if (list.length > 0) return list;

    const m = mapprofessor(100);
    return m
      ? [
          {
            id: String(m.id),
            name: m.name,
            univ: m.university ?? "정보 없음",
            dept: m.department ?? "정보 없음",
          },
        ]
      : [];
  }, [professors]);

  const profResults = useProfessorSearch(query, LEE_ONLY);

  const results = mode === "univ" ? univResults : profResults;
  function handlePick(item: UnivSearchResult | ProfessorSearch) {
    if (mode === "univ") {
      onSelectUniv?.(item as UnivSearchResult);
    } else {
      onSelectProf?.(item as ProfessorSearch);
    }
    setQuery("");
  }

  const dynamicPlaceholder =
    placeholder ??
    (mode === "univ" ? SEARCH_CONTROL_TEXT.placeholder : SEARCH_CONTROL_PROF_TEXT.placeholder);

  return {
    mode,
    query,
    setMode,
    setQuery,
    results,
    dynamicPlaceholder,
    handlePick,
  };
}
