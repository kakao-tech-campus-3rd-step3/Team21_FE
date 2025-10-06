import { useMemo } from "react";

import { profs } from "@/__MOCK__/mockData";
import { mapprofessor } from "@/entities/professor/model/mapprofessor";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";

export const useProfessorSearch = (query: string, professors: ProfessorSearch[] = []) => {
  const professorDataset = useMemo<ProfessorSearch[]>(() => {
    if (professors.length > 0) return professors;

    return profs
      .map((p) => mapprofessor(p.profSeq))
      .filter((p): p is NonNullable<ReturnType<typeof mapprofessor>> => !!p)
      .map<ProfessorSearch>((p) => ({
        id: String(p.id),
        name: p.name,
        univ: p.university ?? "정보 없음",
        dept: p.department ?? "정보 없음",
      }));
  }, [professors]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return professorDataset
      .filter((p) => {
        const name = p.name?.toLowerCase() ?? "";
        const univ = p.univ?.toLowerCase() ?? "";
        const dept = p.dept?.toLowerCase() ?? "";
        return name.includes(q) || univ.includes(q) || dept.includes(q);
      })
      .slice(0, 5);
  }, [professorDataset, query]);

  return filteredResults;
};
