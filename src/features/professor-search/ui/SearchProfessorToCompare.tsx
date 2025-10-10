import { Search } from "lucide-react";

import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { SEARCH_PROFESSOR_TEXTS } from "@/features/professor-search/text";
import { ProfessorResultList } from "@/features/professor-search/ui/ProfessorResultList";
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

export function SearchProfessorToCompare({
  query,
  setQuery,
  results,
  resultsOpen,
  setResultsOpen,
  onPick,
}: props) {
  return (
    <GlassCard shine={false}>
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
            {resultsOpen && results.length > 0 && (
              <ProfessorResultList results={results} onPick={onPick} />
            )}
          </div>
          <Button onClick={() => setResultsOpen(!!query)}>
            {SEARCH_PROFESSOR_TEXTS.searchButton}
          </Button>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}
