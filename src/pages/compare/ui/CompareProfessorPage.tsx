import { useState } from "react";

import { depts, profs } from "@/__MOCK__/mockData";
import { mapProfToProfessor, type Professor } from "@/entities/professor/model/professor";
import { CompareLineChart } from "@/features/chart-compare/ui/CompareLineChart";
import { CompareRaderChart } from "@/features/chart-compare/ui/CompareRaderChart";
import { ProfessorCard } from "@/features/professor-compare/ui/ProfessorCard";
import { SearchProfessorToCompare } from "@/features/professor-search/ui/SearchProfessorToCompare";
import { compareProfessorTexts } from "@/pages/compare/texts";
import { Card, CardDescription } from "@/shared/ui/card";

type ProfessorSearch = {
  id: string;
  name: string;
  univ: string;
  dept: string;
  initials?: string;
};

export const CompareProfessorPage = () => {
  //두명 이상 자동완성으로 선택해야 비교되도록
  const [comparedProfessors, setComparedProfessors] = useState<Professor[]>([]);

  //검색
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

  //자동완성
  const handlePick = (profSearch: ProfessorSearch) => {
    const prof = mapProfToProfessor(Number(profSearch.id));
    if (!prof) return;

    setComparedProfessors((prev) => {
      if (prev.some((p) => p.id === prof.id)) return prev;
      if (prev.length >= 2) return prev;

      return [...prev, prof];
    });

    setQuery("");
    setResults([]);
    setResultsOpen(false);
  };

  //교수 카드 제거
  const handleRemoveProfessor = (id: number) => {
    setComparedProfessors((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-50">{compareProfessorTexts.pageTitle}</h1>
        <p className="mt-2 text-slate-60">{compareProfessorTexts.pageSubtitle}</p>
      </header>

      <div className="mt-16 space-y-8">
        {/* 검색창 */}
        <SearchProfessorToCompare
          query={query}
          setQuery={handleSearch}
          results={results}
          resultsOpen={resultsOpen}
          setResultsOpen={setResultsOpen}
          onPick={handlePick}
        />

        {comparedProfessors.length < 2 ? (
          <Card className="flex h-60 items-center justify-center">
            <CardDescription>{compareProfessorTexts.emptyCardDescription}</CardDescription>
          </Card>
        ) : (
          <>
            {/* 교수 카드 */}
            <div className="relative grid grid-cols-1 items-start gap-8 md:grid-cols-2">
              {comparedProfessors.map((prof) => (
                <ProfessorCard
                  key={prof.id}
                  professor={prof}
                  onRemove={() => handleRemoveProfessor(prof.id)}
                />
              ))}
            </div>

            {/* 직선 비교 차트 */}
            <CompareLineChart professors={comparedProfessors} />

            {/* 오각형 비교 차트 */}
            <CompareRaderChart professors={comparedProfessors} />
          </>
        )}
      </div>
    </div>
  );
};
