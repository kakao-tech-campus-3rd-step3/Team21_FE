import { useState } from "react";

import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { useSearchProfessor } from "@/features/search/hooks/useSearchProfessor";
import { useSearchUniversity } from "@/features/search/hooks/useSearchUniversity"; // 새 래퍼 훅
import { useDebounce } from "@/shared/hooks/useDebounce";

type Mode = "univ" | "prof";

export function useSearchBox({
  placeholder,
  onSelectUniv,
  onSelectProf,
}: {
  placeholder?: string;
  onSelectUniv?: (u: UnivSearchResult) => void;
  onSelectProf?: (p: ProfessorSearch) => void;
}) {
  const [mode, setMode] = useState<Mode>("univ");
  const [query, setQuery] = useState("");
  const dq = useDebounce(query, 300);

  // 자동완성: size=5
  const { results: univResults } = useSearchUniversity(dq, 0, 5);
  const { results: profResults } = useSearchProfessor(dq, 0, 5);

  const results = mode === "univ" ? univResults : profResults;

  function handlePick(item: UnivSearchResult | ProfessorSearch) {
    if (mode === "univ") onSelectUniv?.(item as UnivSearchResult);
    else onSelectProf?.(item as ProfessorSearch);
    setQuery("");
  }

  const dynamicPlaceholder = placeholder ?? (mode === "univ" ? "대학 검색…" : "교수 검색…");

  return { mode, query, setMode, setQuery, results, dynamicPlaceholder, handlePick };
}
