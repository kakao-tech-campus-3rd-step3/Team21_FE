import { useEffect, useState } from "react";

import { fetchUniversityRatingTrends } from "@/entities/university/api";
import { mapTrendsToRows } from "@/entities/university/model/univ-compare.map";
import type { UniversityTrendRow } from "@/entities/university/model/university-compare.domain";
import { CompareUnivBarChart, CompareUnivRaderChart } from "@/features/chart-compare";
import { UniversityCard } from "@/features/university-compare";
import { useUniversityComparison } from "@/features/university-compare/hooks/useUniversityComparison";
import { SearchUniversityToCompare } from "@/features/university-search";
import { COMPARE_UNIVERSITY_TEXTS } from "@/pages/compare/text";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { SEO } from "@/shared/ui/SEO";

export const CompareUniversityPage = () => {
  usePageTitle("대학교 비교");
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
  const [u1Seq, u2Seq] = comparedUniversities.slice(0, 2).map((u) => u.id);
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
    <>
      <SEO
        title="대학교 비교 - 대학 평가 비교"
        description="여러 대학교의 평가를 한눈에 비교하세요. 평점, 시설, 교육 만족도 등을 시각화된 차트로 확인할 수 있습니다."
        keywords="대학교 비교, 대학 평가 비교, 대학 평점, 대학 순위"
        url="https://uniscope-git-develop-i3months-projects.vercel.app/compare/university"
      />
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
    </>
  );
};
