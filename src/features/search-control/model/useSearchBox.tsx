import { useState } from "react";

import { univs } from "@/__MOCK__/mockData";
import type { UnivSearchResult } from "@/entities/university/model/univsearch.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professorsearch";
import { useProfessorSearch } from "@/features/search/hooks/useSearchProfessor";
import { useSearchUniversity } from "@/features/search/hooks/useSearchUniversity";
import { SEARCH_CONTROL_PROF_TEXT, SEARCH_CONTROL_TEXT } from "@/features/search-control/text";

type Mode = "univ" | "prof";

interface UseSearchBoxParams {
  placeholder?: string;
  onSelectUniv?: (univ: UnivSearchResult) => void;
  onSelectProf?: (prof: ProfessorSearch) => void;
  professors?: ProfessorSearch[];
}

export function useSearchBox({
  placeholder,
  onSelectUniv,
  onSelectProf,
  professors = [],
}: UseSearchBoxParams) {
  const [mode, setMode] = useState<Mode>("univ");
  const [query, setQuery] = useState("");

  const univResults = useSearchUniversity(query, univs).slice(0, 5);
  const profResults = useProfessorSearch(query, professors);

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
