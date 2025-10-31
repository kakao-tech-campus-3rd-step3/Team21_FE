import { CompareLineChart } from "@/features/chart-compare/ui/CompareLineChart";
import { CompareRaderChart } from "@/features/chart-compare/ui/CompareRaderChart";
import { useProfessorComparison } from "@/features/professor-compare/hooks/useProfessorComparison";
import { getGridColClass } from "@/features/professor-compare/lib/getGridColClass";
import { ProfessorCard } from "@/features/professor-compare/ui/ProfessorCard";
import { SearchProfessorToCompare } from "@/features/professor-search/ui/SearchProfessorToCompare";
import { COMPARE_PROFESSOR_TEXTS } from "@/pages/compare/text";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { SEO } from "@/shared/ui/SEO";

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
    <>
      <SEO
        title="교수 비교 - 강의 평가 비교"
        description="여러 교수님의 강의 평가를 한눈에 비교하세요. 평점, 강의력, 과제량 등을 시각화된 차트로 확인할 수 있습니다."
        keywords="교수 비교, 강의 평가 비교, 교수 평점, 강의력 비교"
        url="https://uniscope-git-develop-i3months-projects.vercel.app/compare/professor"
      />
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
    </>
  );
};
