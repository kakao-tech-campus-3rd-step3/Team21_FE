import { useState } from "react";

import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { useSearchUniversity } from "@/features/search/hooks/useSearchUniversity"; // 새 래퍼 훅
import { useDebounce } from "@/shared/hooks/useDebounce";

type Mode = "univ" | "prof";

type Params = {
  placeholder?: string;
  onSelectUniv?: (univ: UnivSearchResult) => void;
  onSelectProf?: (prof: ProfessorSearch) => void;
  professors?: ProfessorSearch[]; // (교수 API 붙이기 전까지 임시로 유지)
};

export function useSearchBox({ placeholder, onSelectUniv, onSelectProf }: Params) {
  const [mode, setMode] = useState<Mode>("univ");
  const [query, setQuery] = useState("");

  // 입력 디바운스
  const dq = useDebounce(query, 300);

  // 대학 자동완성 결과 (페이지 0, size 5)
  const { results: univResults } = useSearchUniversity(dq, 0, 5);

  // 교수는 아직 API 붙이기 전이면 빈 배열로
  const profResults: ProfessorSearch[] = []; // TODO: 교수 API 붙이면서 교체

  const results = mode === "univ" ? univResults : profResults;

  function handlePick(item: UnivSearchResult | ProfessorSearch) {
    if (mode === "univ") onSelectUniv?.(item as UnivSearchResult);
    else onSelectProf?.(item as ProfessorSearch);
    setQuery("");
  }

  const dynamicPlaceholder = placeholder ?? (mode === "univ" ? "대학 검색…" : "교수 검색…");

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
