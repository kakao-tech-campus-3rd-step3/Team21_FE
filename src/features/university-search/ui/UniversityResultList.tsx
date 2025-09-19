import type { UniversitySearch } from "@/features/university-search/model/universitysearch";
import { Button } from "@/shared/ui/button";

type props = {
  results: UniversitySearch[];
  onPick: (u: UniversitySearch) => void;
};

export function UniversityResultList({ results, onPick }: Pick<props, "results" | "onPick">) {
  return (
    <div
      className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-white bg-black backdrop-blur-md shadow-lg"
      onMouseDown={(e) => e.preventDefault()}
    >
      {results.map((u) => (
        <Button
          key={u.id}
          variant="ghost"
          className="flex w-full items-center gap-3 px-3 py-2 justify-start text-left"
          onClick={() => onPick(u)}
        >
          {/* 대학교 */}
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-xs font-semibold text-slate-100">
            {(u.initials ?? "U").slice(0, 1)}
          </div>
          {/* 이름, 주소 */}
          <div className="min-w-0">
            <div className="truncate font-medium text-slate-100">{u.name}</div>
            <div className="truncate text-xs text-slate-300">{u.address}</div>
          </div>
        </Button>
      ))}
    </div>
  );
}
