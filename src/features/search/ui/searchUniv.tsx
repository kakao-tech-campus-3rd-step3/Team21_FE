import { Search } from "lucide-react";

import { UNIVERSITY_SEARCH_TEXTS } from "@/features/search/text";
import { Button } from "@/shared/ui/button";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  onSubmit: () => void;
};

export function SearchUniversity({ query, setQuery, onSubmit }: Props) {
  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle>{UNIVERSITY_SEARCH_TEXTS.pageTitle}</GlassCardTitle>
        <GlassCardDescription>{UNIVERSITY_SEARCH_TEXTS.pageSubtitle}</GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="예: 충남대학교"
              className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-9 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-300 focus:border-primary"
            />
          </div>
          <Button onClick={onSubmit}>검색</Button>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}
