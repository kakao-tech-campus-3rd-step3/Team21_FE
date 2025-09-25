import { useMemo } from "react";

import { depts, profs } from "@/__MOCK__/mockData";
import type { ProfessorSearch } from "@/features/professor-search/model/professorsearch";

function mapToProfessorSearch(): ProfessorSearch[] {
  return profs.map((p) => {
    const dept = depts.find((d) => d.deptSeq === p.deptSeq);
    return {
      id: String(p.profSeq),
      name: p.profName,
      univ: "Uni",
      dept: dept?.deptName ?? "정보 없음",
    };
  });
}

export const useProfessorSearch = (query: string, professors: ProfessorSearch[] = []) => {
  const professorDataset = useMemo<ProfessorSearch[]>(() => {
    if (professors.length > 0) return professors;

    return mapToProfessorSearch();
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
