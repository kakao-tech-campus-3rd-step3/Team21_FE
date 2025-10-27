import { useEffect, useState } from "react";

import { fetchUniversityRatingTrends } from "@/entities/university/api";
import { mapTrendsToRows } from "@/entities/university/model/univ-compare.map";
import type { UniversityTrendRow } from "@/entities/university/model/university-compare.domain";
import { CompareUnivBarChart } from "@/features/chart-compare/ui/CompareUnivBarChart";
import { CompareUnivRaderChart } from "@/features/chart-compare/ui/CompareUnivRaderChart";
import { useUniversityComparison } from "@/features/university-compare/hooks/useUniversityComparison";
import { UniversityCard } from "@/features/university-compare/ui/UniversityCard";
import { SearchUniversityToCompare } from "@/features/university-search/ui/SearchUniversityToCompare";
import { COMPARE_UNIVERSITY_TEXTS } from "@/pages/compare/text";

export const CompareUniversityPage = () => {
  const {
    comparedUniversities,
    query,
    results,
    resultsOpen,
    setResultsOpen,
    handleSearch,
    handlePick,
    handleRemoveUniversity,
  } = useUniversityComparison();
  const [trendRows, setTrendRows] = useState<UniversityTrendRow[]>([]);
  const u1Seq = comparedUniversities[0]?.id;
  const u2Seq = comparedUniversities[1]?.id;
  useEffect(() => {
    const load = async () => {
      if (!u1Seq) {
        setTrendRows([]);
        return;
      }
      try {
        const seqs = u2Seq ? [u1Seq, u2Seq] : [u1Seq];
        const api = await fetchUniversityRatingTrends(seqs);
        const rows = mapTrendsToRows(api, u1Seq, u2Seq);
        setTrendRows(rows);
      } catch {
        setTrendRows([]);
      }
    };
    load();
  }, [u1Seq, u2Seq]);

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      <header className="mb-8 text-center">
        <h1
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white 
          drop-shadow-[0_0_6px_#2b049f] drop-shadow-[0_0_12px_#6711e7]"
        >
          {COMPARE_UNIVERSITY_TEXTS.pageTitle}
        </h1>
        <p className="mt-2 text-slate-60">{COMPARE_UNIVERSITY_TEXTS.pageSubtitle}</p>
      </header>

      <div className="mt-16 space-y-8">
        {/* 검색창 */}
        <SearchUniversityToCompare
          query={query}
          setQuery={handleSearch}
          results={results}
          resultsOpen={resultsOpen}
          setResultsOpen={setResultsOpen}
          onPick={handlePick}
        />

        {comparedUniversities.length > 0 && (
          <>
            {/* 대학교 카드 (2개까지만) */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              {comparedUniversities.map((univ) => (
                <UniversityCard
                  key={univ.id}
                  university={univ}
                  onRemove={() => handleRemoveUniversity(univ.id)}
                />
              ))}
            </div>

            {/* 오각형 비교 차트 */}
            <CompareUnivRaderChart universities={comparedUniversities} />

            {/* 직선 비교 차트 */}
            <CompareUnivBarChart universities={comparedUniversities} rows={trendRows} />
          </>
        )}
      </div>
    </div>
  );
};
