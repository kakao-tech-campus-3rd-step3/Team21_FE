import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";

export const UniversityResultItem = ({
  item,
  onClick,
}: {
  item: UnivSearchResult;
  onClick: () => void;
}) => (
  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer" onClick={onClick}>
    <div className="font-medium">{item.name}</div>
    <div className="text-xs text-gray-300">{item.address}</div>
  </li>
);

export const ProfessorResultItem = ({
  item,
  onClick,
}: {
  item: ProfessorSearch;
  onClick: () => void;
}) => (
  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer" onClick={onClick}>
    <div className="font-medium">{item.name}</div>
    <div className="text-xs text-gray-300">
      {item.univ} · {item.dept}
    </div>
  </li>
);
