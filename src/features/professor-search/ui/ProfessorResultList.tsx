import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { Button } from "@/shared/ui/button";

type props = {
  results: ProfessorSearch[];
  onPick: (p: ProfessorSearch) => void;
};

export function ProfessorResultList({ results, onPick }: props) {
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
