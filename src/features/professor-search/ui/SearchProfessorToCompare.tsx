import { Search } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
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

export function SearchProfessorToCompare({
  query,
  setQuery,
  results,
  resultsOpen,
  setResultsOpen,
  onPick,
}: props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [pagePos, setPagePos] = useState<{ left: number; top: number; width: number } | null>(null);

  useLayoutEffect(() => {
    if (resultsOpen && inputRef.current) {
      const r = inputRef.current.getBoundingClientRect();
      setPagePos({
        left: r.left + window.scrollX,
        top: r.bottom + window.scrollY + 8,
        width: r.width,
      });
    } else if (!resultsOpen) {
      setPagePos(null);
    }
  }, [resultsOpen]);

  const dropdown =
    resultsOpen && results.length > 0 && pagePos
      ? createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              left: pagePos.left,
              top: pagePos.top,
              width: pagePos.width,
              zIndex: 9999,
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="max-h-[70vh] overflow-auto rounded-lg border border-neutral-800 bg-black text-white shadow-lg p-2 space-y-2">
              {results.map((p) => (
                <Button
                  type="button"
                  key={p.id}
                  variant="ghost"
                  className="flex w-full items-center gap-3 px-4 py-3 justify-start text-left rounded-md hover:bg-neutral-800"
                  onClick={() => {
                    onPick(p);
                    setResultsOpen(false);
                  }}
                >
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-neutral-700 text-xs font-semibold text-white">
                    {(p.initials ?? "U").slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium text-white">{p.name}</div>
                    <div className="truncate text-xs text-neutral-300">
                      {p.univ} · {p.dept}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <GlassCard shine={false}>
      <GlassCardHeader>
        <GlassCardTitle>{SEARCH_PROFESSOR_TEXTS.cardTitle}</GlassCardTitle>
        <GlassCardDescription>{SEARCH_PROFESSOR_TEXTS.cardDescription}</GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onFocus={() => {
                if (query.trim().length > 0) setResultsOpen(true);
              }}
              placeholder={SEARCH_PROFESSOR_TEXTS.placeholder}
              className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-9 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-300 focus:border-primary"
            />
            {dropdown}
          </div>
          <Button type="button" onClick={() => setResultsOpen(!!query)}>
            {SEARCH_PROFESSOR_TEXTS.searchButton}
          </Button>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}
