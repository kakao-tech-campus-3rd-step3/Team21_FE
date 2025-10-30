import { CompareLineChart, CompareRaderChart } from "@/features/chart-compare";
import { useProfessorComparison } from "@/features/professor-compare/hooks/useProfessorComparison";
import { getGridColClass } from "@/features/professor-compare/lib/getGridColClass";
import { ProfessorCard } from "@/features/professor-compare/ui/ProfessorCard";
import { SearchProfessorToCompare } from "@/features/professor-search";
import { COMPARE_PROFESSOR_TEXTS } from "@/pages/compare/text";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

export const CompareProfessorPage = () => {
  usePageTitle("교수 비교");
  const {
    comparedProfessors,
    query,
    results,
    resultsOpen,
    setResultsOpen,
    handleSearch,
    handlePick,
    handleRemoveProfessor,
  } = useProfessorComparison();

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      <header className="mb-8 text-center">
        <h1
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white 
          drop-shadow-[0_0_6px_#2b049f] drop-shadow-[0_0_12px_#6711e7]"
        >
          {COMPARE_PROFESSOR_TEXTS.pageTitle}
        </h1>
        <p className="mt-2 text-slate-60">{COMPARE_PROFESSOR_TEXTS.pageSubtitle}</p>
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

        {comparedProfessors.length > 0 && (
          <>
            {/* 교수 카드 */}

            <div
              className={`relative grid items-start gap-8 ${getGridColClass(
                comparedProfessors.length,
              )}`}
            >
              {comparedProfessors.map((prof) => (
                <ProfessorCard
                  key={prof.id}
                  professor={prof}
                  onRemove={() => handleRemoveProfessor(prof.id)}
                />
              ))}
            </div>

            {/* 오각형 비교 차트 */}
            <CompareRaderChart professors={comparedProfessors} />

            {/* 직선 비교 차트 */}
            <CompareLineChart professors={comparedProfessors} />
          </>
        )}
      </div>
    </div>
  );
};
