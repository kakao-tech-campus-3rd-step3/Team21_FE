import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchCompareProfessors, searchProfessorApi } from "@/entities/professor/api";
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
  const navigate = useNavigate();
  const { id, a, b, c } = useParams<{ id?: string; a?: string; b?: string; c?: string }>();
  const [comparedProfessors, setComparedProfessors] = useState<Professor[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProfessorSearch[]>([]);
  const [resultsOpen, setResultsOpen] = useState(false);

  useEffect(() => {
    const ids = (c ? [a, b, c] : b ? [a, b] : id ? [id] : []).filter(Boolean) as string[];
    if (ids.length === 0) {
      setComparedProfessors([]);
      return;
    }
    (async () => {
      const profs = await fetchCompareProfessors(ids.map(Number));
      setComparedProfessors(profs.filter(Boolean));
    })();
  }, [id, a, b, c]);
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

  const profpath = (ids: string[]) => {
    if (ids.length === 0) return `/compare/professor/`;
    if (ids.length === 1) return `/compare/professor/${ids[0]}`;
    if (ids.length === 2) return `/compare/professor/${ids[0]}/${ids[1]}`;
    return `/compare/professor/${ids[0]}/${ids[1]}/${ids[2]}`;
  };
  const handlePick = async (profSearch: ProfessorSearch) => {
    const pickedId = profSearch.id;
    const current = [id, a, b, c].filter(Boolean) as string[];
    const next = Array.from(new Set([...current, pickedId])).slice(0, 3);
    navigate(profpath(next));

    setQuery("");
    setResults([]);
    setResultsOpen(false);
  };

  const handleRemoveProfessor = (id: number) => {
    const current = [id, a, b, c].filter(Boolean) as string[];
    const next = current.filter((x) => Number(x) !== id);
    navigate(profpath(next));
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
