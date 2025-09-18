import { useState } from "react";

import { univs } from "@/__MOCK__/mockData";
import { mapUnivToUniversity } from "@/entities/university/model/mapuniversity";
import { type University } from "@/entities/university/model/university";

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

  const handleSearch = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const lower = value.toLowerCase();
    const filtered = univs
      .filter((u) => u.name.toLowerCase().includes(lower))
      .map((u) => ({
        id: String(u.univSeq),
        name: u.name,
        address: u.address,
        initials: u.name.slice(0, 2),
      }));

    setResults(filtered);
    setResultsOpen(true);
  };

  const handlePick = (univSearch: UniversitySearch) => {
    const univ = mapUnivToUniversity(Number(univSearch.id));
    if (!univ) return;

    setComparedUniversities((prev) => {
      if (prev.some((u) => u.id === univ.id)) return prev;
      if (prev.length >= 2) return prev;

      return [...prev, univ];
    });

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
