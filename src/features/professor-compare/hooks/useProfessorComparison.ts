import { useState } from "react";

import { depts, profs } from "@/__MOCK__/mockData";
import { mapProfToProfessor, type Professor } from "@/entities/professor/model/professors";

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

  const handleSearch = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const lower = value.toLowerCase();
    const filtered = profs
      .filter((p) => p.profName.toLowerCase().includes(lower))
      .map((p) => {
        const dept = depts.find((d) => d.deptSeq === p.deptSeq);
        return {
          id: String(p.profSeq),
          name: p.profName,
          univ: "Uni",
          dept: dept?.deptName ?? "정보 없음",
          initials: p.profName.slice(0, 2),
        };
      });

    setResults(filtered);
    setResultsOpen(true);
  };

  const handlePick = (profSearch: ProfessorSearch) => {
    const prof = mapProfToProfessor(Number(profSearch.id));
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
