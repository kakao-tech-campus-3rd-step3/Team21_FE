import { Search } from "lucide-react";

import type { ProfessorSearch } from "@/features/professor-search/model/professors";
import { SEARCH_PROFESSOR_TEXTS } from "@/features/professor-search/text";
import { Button } from "@/shared/ui/button";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

type props = {
  query: string;
  setQuery: (v: string) => void;
  results: ProfessorSearch[];
  resultsOpen: boolean;
  setResultsOpen: (v: boolean) => void;
  onPick: (p: ProfessorSearch) => void;
};

function ResultList({ results, onPick }: Pick<props, "results" | "onPick">) {
  return (
    <div
      className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-white bg-black backdrop-blur-md shadow-lg"
      onMouseDown={(e) => e.preventDefault()}
    >
      {results.map((p) => (
        <Button
          key={p.id}
          variant="ghost"
          className="flex w-full items-center gap-3 px-3 py-2 justify-start text-left"
          onClick={() => onPick(p)}
        >
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-xs font-semibold text-slate-100">
            {(p.initials ?? "U").slice(0, 1)}
          </div>
          <div className="min-w-0">
            <div className="truncate font-medium text-slate-100">{p.name}</div>
            <div className="truncate text-xs text-slate-300">
              {p.univ} · {p.dept}
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}

export function SearchProfessorToCompare({
  query,
  setQuery,
  results,
  resultsOpen,
  setResultsOpen,
  onPick,
}: props) {
  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle>{SEARCH_PROFESSOR_TEXTS.cardTitle}</GlassCardTitle>
        <GlassCardDescription>{SEARCH_PROFESSOR_TEXTS.cardDescription}</GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setResultsOpen(true);
              }}
              onFocus={() => setResultsOpen(true)}
              placeholder={SEARCH_PROFESSOR_TEXTS.placeholder}
              className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-9 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-300 focus:border-primary"
            />
            {resultsOpen && results.length > 0 && <ResultList results={results} onPick={onPick} />}
          </div>
          <Button onClick={() => setResultsOpen(!!query)}>
            {SEARCH_PROFESSOR_TEXTS.searchButton}
          </Button>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}
