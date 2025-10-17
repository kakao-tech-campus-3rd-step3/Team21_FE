import { useState } from "react";

import { fetchUniversitiesForCompare, searchUniversityApi } from "@/entities/university/api";
import { mapUniversityFromResponse } from "@/entities/university/model/univ-compare.map";
import { mapUnivSearch } from "@/entities/university/model/univ-search.map";
import type { UnivSearchRequest } from "@/entities/university/model/univ-search.request";
import type { University } from "@/entities/university/model/university-compare.domain";

type UniversitySearch = {
  id: string;
  name: string;
  address: string;
  initials?: string;
};

export const useUniversityComparison = () => {
  const [comparedUniversities, setComparedUniversities] = useState<University[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UniversitySearch[]>([]);
  const [resultsOpen, setResultsOpen] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const params: UnivSearchRequest = { keyword: value, page: 0, size: 10 };
    const res = await searchUniversityApi(params);
    const { items } = mapUnivSearch(res);

    const mapped: UniversitySearch[] = items.map((u) => ({
      id: u.id,
      name: u.name,
      address: u.address,
      initials: u.name.slice(0, 2),
    }));

    setResults(mapped);
    setResultsOpen(true);
  };

  const handlePick = async (univSearch: UniversitySearch) => {
    const idNum = Number(univSearch.id);
    if (comparedUniversities.some((u) => u.id === idNum)) return;
    if (comparedUniversities.length >= 2) return;

    const apis = await fetchUniversitiesForCompare([idNum]);
    const pickedApi = apis?.[0];
    if (!pickedApi) return;

    const univ = mapUniversityFromResponse(pickedApi);

    setComparedUniversities((prev) => [...prev, univ]);

    setQuery("");
    setResults([]);
    setResultsOpen(false);
  };

  const handleRemoveUniversity = (id: number) => {
    setComparedUniversities((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    comparedUniversities,
    query,
    results,
    resultsOpen,
    setResultsOpen,
    handleSearch,
    handlePick,
    handleRemoveUniversity,
  };
};
