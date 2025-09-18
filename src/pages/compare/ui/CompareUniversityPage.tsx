import { CompareUniversityLineChart } from "@/features/chart-compare/ui/CompareLineChart";
import { CompareUniversityRaderChart } from "@/features/chart-compare/ui/CompareRaderChart";
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
            <CompareUniversityRaderChart universities={comparedUniversities} />

            {/* 직선 비교 차트 */}
            <CompareUniversityLineChart universities={comparedUniversities} />
          </>
        )}
      </div>
    </div>
  );
};
