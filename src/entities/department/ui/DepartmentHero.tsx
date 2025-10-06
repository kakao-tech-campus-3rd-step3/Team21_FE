import { Calendar, Users } from "lucide-react";

import { Card } from "@/shared/ui/card";

type Props = {
  collegeName: string;
  departmentName: string;
  intro: string;
  students: number;
  professors: number;
  foundedYear: number;
  logoUrl?: string;
  universityName?: string;
};

export function DepartmentHero({
  collegeName,
  departmentName,
  intro,
  students,
  professors,
  foundedYear,
  logoUrl,
  universityName,
}: Props) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md p-6 md:p-8 space-y-4">
      <div className="flex items-start gap-6">
        {/* 왼쪽 로고 */}
        <div className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-xl bg-zinc-800/60 overflow-hidden grid place-items-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${departmentName} 로고`}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-xs text-zinc-500">No Logo</span>
          )}
        </div>

        <div className="flex-1">
          {(universityName ?? collegeName) && (
            <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/70 px-3 py-1 text-xs text-zinc-200">
              {universityName ?? collegeName}
            </span>
          )}

          <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
            {departmentName || collegeName}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">{intro}</p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2.5 py-1">
              <Users className="h-4 w-4 text-indigo-500" />
              재학생:
              <span className="ml-1 font-medium text-white">{students.toLocaleString()}</span>
            </span>

            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2.5 py-1">
              <Users className="h-4 w-4 text-indigo-500" />
              교수진:
              <span className="ml-1 font-medium text-white">{professors}</span>
            </span>

            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2.5 py-1">
              <Calendar className="h-4 w-4 text-indigo-500" />
              설립:
              <span className="ml-1 font-medium text-white">{foundedYear}</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
