import { useState } from "react";

import { univs } from "@/__MOCK__/mockData";
import { SearchResultsList, SearchUniversity } from "@/features/search";
import { useSearchUniversity } from "@/features/search/hooks/useSearchUniversity";
import { UNIVERSITY_SEARCH_TEXTS } from "@/features/search/text";

export const UniversitySearchResultPage = () => {
  const [query, setQuery] = useState("");
  const results = useSearchUniversity(query, univs);

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white drop-shadow-[0_0_6px_#046b2b] drop-shadow-[0_0_12px_#0ea64d]">
          {UNIVERSITY_SEARCH_TEXTS.pageTitle}
        </h1>
        <p className="mt-2 text-slate-300">{UNIVERSITY_SEARCH_TEXTS.pageSubtitle}</p>
      </header>

      <div className="mt-16 space-y-8">
        {/* 검색창 */}
        <SearchUniversity
          query={query}
          setQuery={setQuery}
          onSubmit={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        {/* 입력값 리스트 출력 */}
        {results.length > 0 ? (
          <>
            <div>
              <h2 className="text-lg font-semibold">
                "{query}" {UNIVERSITY_SEARCH_TEXTS.result}
              </h2>
              <p className="text-sm text-muted-foreground">
                {UNIVERSITY_SEARCH_TEXTS.all} {results.length} {UNIVERSITY_SEARCH_TEXTS.findUniv}
              </p>
            </div>
            <SearchResultsList universities={results} />
          </>
        ) : (
          query && <p className="text-gray-400 text-center">{UNIVERSITY_SEARCH_TEXTS.cantFind}</p>
        )}
      </div>
    </div>
  );
};
