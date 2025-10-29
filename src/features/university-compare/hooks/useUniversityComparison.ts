import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchUniversitiesForCompare, searchUniversityApi } from "@/entities/university/api";
import { mapUniversityFromResponse } from "@/entities/university/model/univ-compare.map";
import { mapUnivSearch } from "@/entities/university/model/univ-search.map";
import type { UnivSearchRequest } from "@/entities/university/model/univ-search.request";
import type { University } from "@/entities/university/model/university-compare.domain";
import { ROUTES } from "@/shared/config/routes";

type UniversitySearch = {
  id: string;
  name: string;
  address: string;
  initials?: string;
};

export const useUniversityComparison = () => {
  const navigate = useNavigate();
  const { id, a, b } = useParams<{ id?: string; a?: string; b?: string }>();
  const [comparedUniversities, setComparedUniversities] = useState<University[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UniversitySearch[]>([]);
  const [resultsOpen, setResultsOpen] = useState(false);

  useEffect(() => {
    const ids = (b ? [a, b] : id ? [id] : a ? [a] : []).filter(Boolean) as string[];

    if (ids.length === 0) {
      setComparedUniversities([]);
      return;
    }

    (async () => {
      const apis = await fetchUniversitiesForCompare(ids.map(Number));
      const list = (apis ?? []).filter(Boolean).map(mapUniversityFromResponse);
      setComparedUniversities(list);
    })();
  }, [id, a, b]);
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
  const univpath = (ids: string[]) => {
    if (ids.length === 0) return ROUTES.COMPARE_UNIVERSITY;
    if (ids.length === 1) return ROUTES.COMPARE_UNIV_ONE(Number(ids[0]));
    return ROUTES.COMPARE_UNIV_TWO(Number(ids[0]), Number(ids[1]));
  };

  const handlePick = async (univSearch: UniversitySearch) => {
    const picked = univSearch.id;
    const current = [id, a, b].filter(Boolean) as string[];
    const next = Array.from(new Set([...current, picked])).slice(0, 2);
    navigate(univpath(next));

    setQuery("");
    setResults([]);
    setResultsOpen(false);
  };

  const handleRemoveUniversity = (id: number) => {
    const current = [id, a, b].filter(Boolean) as string[];
    const next = current.filter((x) => Number(x) !== id);
    navigate(univpath(next));
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
