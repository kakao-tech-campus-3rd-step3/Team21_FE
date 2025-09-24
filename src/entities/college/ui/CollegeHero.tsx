import { formatNumber } from "@/shared/lib/format";
import { Card } from "@/shared/ui/card";
import { Calendar, Users } from "lucide-react";

type Props = {
  collegeName: string;
  universityName: string;
  intro?: string;
  students?: number;
  professors?: number;
  foundedYear?: number;
  logoUrl?: string;
};

export function CollegeHero({
  collegeName,
  universityName,
  intro,
  students,
  professors,
  foundedYear,
  logoUrl,
}: Props) {
  const hasFoundedYear = typeof foundedYear === "number";
  const hasStudents = typeof students === "number";
  const hasProfessors = typeof professors === "number";

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md p-6 md:p-8 space-y-4">
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 shrink-0 rounded-xl bg-zinc-800/60 overflow-hidden grid place-items-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${collegeName} 로고`}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-xs text-muted-foreground">NO LOGO</span>
          )}
        </div>

        <div className="flex-1">
          <span className="inline-flex items-center rounded-md bg-zinc-800/70 px-2 py-0.5 text-xs text-zinc-300">
            {universityName}
          </span>

          <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{collegeName}</h1>

          {intro && <p className="mt-1 text-sm text-muted-foreground">{intro}</p>}

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {hasStudents && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2 py-1">
                <Users className="h-4 w-4 text-indigo-400" />
                재학생:
                <span className="ml-1 font-medium text-white">{formatNumber(students!)}</span>
              </span>
            )}

            {hasProfessors && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2 py-1">
                <Users className="h-4 w-4 text-indigo-400" />
                교수진:
                <span className="ml-1 font-medium text-white">{formatNumber(professors!)}</span>
              </span>
            )}

            {hasFoundedYear && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2 py-1">
                <Calendar className="h-4 w-4 text-indigo-400" />
                설립:
                <span className="ml-1 font-medium text-white">{foundedYear}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CollegeHero;
