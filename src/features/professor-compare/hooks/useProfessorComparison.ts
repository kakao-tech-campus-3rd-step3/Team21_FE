import { useState } from "react";

import { fetchCompareProfessors, searchProfessorApi } from "@/entities/professor/api";
import { mapCompareListToDomain } from "@/entities/professor/model/prof-compare.map";
import { mapProfSearch } from "@/entities/professor/model/prof-search.map";
import type { Professor } from "@/entities/professor/model/professors.domain";
type ProfessorSearch = {
  id: string;
  name: string;
  univ: string;
  dept: string;
  initials?: string;
};

export const useProfessorComparison = () => {
  const [comparedProfessors, setComparedProfessors] = useState<Professor[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProfessorSearch[]>([]);
  const [resultsOpen, setResultsOpen] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    const keyword = value.trim();
    if (!keyword) {
      setResults([]);
      return;
    }
    const res = await searchProfessorApi({ keyword, page: 0, size: 10 });
    const { items } = mapProfSearch(res);

    const mapped: ProfessorSearch[] = items.map((p) => ({
      id: p.id,
      name: p.name,
      univ: p.univ ?? "정보 없음",
      dept: p.dept ?? "정보 없음",
      initials: p.name.slice(0, 2),
    }));

    setResults(mapped);
    setResultsOpen(true);
  };

  const handlePick = async (profSearch: ProfessorSearch) => {
    const raw = await fetchCompareProfessors([Number(profSearch.id)]);
    const [prof] = mapCompareListToDomain(raw);
    if (!prof) return;
    setComparedProfessors((prev) => {
      if (prev.some((p) => p.id === prof.id)) return prev;
      if (prev.length >= 3) return prev;

      return [...prev, prof];
    });

    setQuery("");
    setResults([]);
    setResultsOpen(false);
  };

  const handleRemoveProfessor = (id: number) => {
    setComparedProfessors((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    comparedProfessors,
    query,
    results,
    resultsOpen,
    setResultsOpen,
    handleSearch,
    handlePick,
    handleRemoveProfessor,
  };
};
