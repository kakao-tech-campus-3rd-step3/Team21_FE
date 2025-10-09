import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { DepartmentSearch } from "@/features/department-search";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import type { UnivDeptSearch } from "@/features/univ-dept-search";
import type { UnivProfSearch } from "@/features/univ-prof-search";

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

export const DepartmentResultItem = ({
  item,
  onClick,
}: {
  item: DepartmentSearch;
  onClick: () => void;
}) => (
  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer" onClick={onClick}>
    <div className="font-medium">{item.name}</div>
    <div className="text-xs text-gray-300">{item.univ}</div>
  </li>
);

export const UnivDeptResultItem = ({
  item,
  onClick,
}: {
  item: UnivDeptSearch;
  onClick: () => void;
}) => (
  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer" onClick={onClick}>
    <div className="font-medium">{item.deptName}</div>
    <div className="text-xs text-gray-300">
      {item.univName} · {item.collegeName}
    </div>
  </li>
);

export const UnivProfResultItem = ({
  item,
  onClick,
}: {
  item: UnivProfSearch;
  onClick: () => void;
}) => (
  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer" onClick={onClick}>
    <div className="font-medium">{item.profName}</div>
    <div className="text-xs text-gray-300">
      {item.univName} · {item.collegeName} · {item.deptName}
    </div>
  </li>
);
