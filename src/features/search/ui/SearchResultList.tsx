import type { UnivSearchResult } from "@/entities/university/model/search-result";
import { UniversityCard } from "@/entities/university/ui/UniversitySearchCard";
import { UNIVERSITY_SEARCH_TEXTS } from "@/features/search/text";

type Props = {
  universities: UnivSearchResult[];
};

export const SearchResultsList = ({ universities }: Props) => {
  if (universities.length === 0) {
    return <p className="text-gray-500 text-center">{UNIVERSITY_SEARCH_TEXTS.cantFind}</p>;
  }

  return (
    <div className="grid gap-4">
      {universities.map((u) => (
        <UniversityCard key={u.id} university={u} />
      ))}
    </div>
  );
};
