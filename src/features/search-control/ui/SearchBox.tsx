import { FaSearch } from "react-icons/fa";

import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { ProfessorResultItem, UniversityResultItem } from "@/features/search";
import { useSearchBox } from "@/features/search-control/model/useSearchBox";
import { SEARCH_CONTROL_PROF_TEXT, SEARCH_CONTROL_TEXT } from "@/features/search-control/text";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

type Props = {
  placeholder?: string;
  onSelectUniv?: (univ: UnivSearchResult) => void;
  onSelectProf?: (prof: ProfessorSearch) => void;
  professors?: ProfessorSearch[];
};

export function SearchBox(props: Props) {
  const { mode, query, setMode, setQuery, results, dynamicPlaceholder, handlePick } =
    useSearchBox(props);

  return (
    <Card
      className={[
        "relative rounded-2xl overflow-visible isolate ",
        "bg-white/5 border border-white/40",
        "backdrop-blur-3xl backdrop-saturate-200",
        "shadow-[0_15px_50px_rgba(0,0,0,0.55)]",
        "before:absolute before:inset-0 before:pointer-events-none",
        "before:content-none",
      ].join(" ")}
    >
      <CardContent className="relative p-6 md:p-8 overflow-visible">
        <div className="flex items-center gap-2">
          <div className="shrink-0">
            <div className="inline-flex rounded-md border border-white/30 bg-white/10 p-1">
              <button
                type="button"
                aria-pressed={mode === "univ"}
                onClick={() => setMode("univ")}
                className={[
                  "px-3 py-1 text-xs rounded",
                  mode === "univ" ? "bg-white/30 text-white" : "text-white/80 hover:bg-white/20",
                ].join(" ")}
              >
                {SEARCH_CONTROL_TEXT.univ}
              </button>
              <button
                type="button"
                aria-pressed={mode === "prof"}
                onClick={() => setMode("prof")}
                className={[
                  "px-3 py-1 text-xs rounded",
                  mode === "prof" ? "bg-white/30 text-white" : "text-white/80 hover:bg-white/20",
                ].join(" ")}
              >
                {SEARCH_CONTROL_PROF_TEXT.prof}
              </button>
            </div>
          </div>

          <div className="relative flex-1">
            <FaSearch
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/75 drop-shadow"
              aria-hidden="true"
              focusable="false"
            />
            <input
              type="text"
              placeholder={dynamicPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results.length > 0) {
                  e.preventDefault();
                  handlePick(results[0]);
                }
              }}
              className={[
                "w-full rounded-lg",
                "border border-white/30 bg-white/10 px-10 py-3",
                "text-white placeholder-white/70 outline-none",
                "focus:border-white/60 focus:bg-white/15 transition",
                "shadow-[inset_0_1px_0_rgba(114, 114, 114, 0.25)]",
              ].join(" ")}
            />

            {query && results.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 max-h-60 overflow-auto rounded-lg border border-white/20 bg-black/90 backdrop-blur-md text-sm text-white shadow-lg z-50">
                {results.map((item) =>
                  mode === "univ" ? (
                    <UniversityResultItem
                      key={item.id}
                      item={item as UnivSearchResult}
                      onClick={() => handlePick(item)}
                    />
                  ) : (
                    <ProfessorResultItem
                      key={item.id}
                      item={item as ProfessorSearch}
                      onClick={() => handlePick(item)}
                    />
                  ),
                )}
              </ul>
            )}

            {query && results.length === 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-lg border border-white/20 bg-black/70 backdrop-blur-md text-sm text-gray-400 px-4 py-2 z-10">
                {SEARCH_CONTROL_PROF_TEXT.empty}
              </div>
            )}
          </div>

          <Button
            type="button"
            aria-label="검색"
            title="검색"
            className={[
              "relative inline-flex items-center justify-center rounded-lg",
              "h-12 w-12",
              "bg-gradient-to-b from-white/25 via-white/10 to-white/5",
              "backdrop-blur-md backdrop-saturate-150",
              "border border-white/50",
              "shadow-[0_8px_20px_rgba(0,0,0,0.35)]",
              "hover:shadow-[0_10px_24px_rgba(0,0,0,0.45)]",
              "active:translate-y-[1px] active:shadow-[0_6px_16px_rgba(0,0,0,0.35)]",
              "transition-transform duration-200",
              "text-white",
            ].join(" ")}
            disabled
          >
            <FaSearch className="h-4 w-4" aria-hidden="true" focusable="false" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
