import { BadgeCheck, Mail, MapPin } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";

type Props = {
  name: string;
  rankLabel: string;
  degree: string;
  researchAreas: string[];
  email?: string;
  office?: string;
  className?: string;
};

export function ProfessorCard({
  name,
  rankLabel,
  degree,
  researchAreas,
  email,
  office,
  className,
}: Props) {
  const hasEmail = !!email && email.trim().length > 0;

  return (
    <Card
      className={cn(
        "bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md rounded-2xl p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{name}</span>
            <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 text-[11px] text-zinc-300">
              {rankLabel}
            </span>
          </div>
          <div className="mt-1 text-xs text-zinc-400">{degree}</div>
        </div>
        <BadgeCheck className="h-4 w-4 text-indigo-500" />
      </div>

      {!!researchAreas?.length && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {researchAreas.map((tag, idx) => (
            <span
              key={tag || idx}
              className="inline-flex items-center rounded-full bg-emerald-900/20 border border-emerald-400/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 grid gap-1.5 text-xs text-zinc-300">
        <div className="flex items-center gap-2 min-w-0">
          <Mail className="h-4 w-4 text-indigo-500 shrink-0" />
          {hasEmail ? (
            <a href={`mailto:${email}`} className="hover:underline truncate">
              {email}
            </a>
          ) : (
            <span className="text-zinc-400">이메일 정보 없음</span>
          )}
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />
          <span className="truncate">{office || "연구실 정보 없음"}</span>
        </div>
      </div>
    </Card>
  );
}
