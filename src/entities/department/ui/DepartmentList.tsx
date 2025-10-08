import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

import type { Department } from "@/entities/department/model/department-list.domain";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

type Props = {
  title: string;
  items: Department[];
};

export function DepartmentList({ title, items }: Props) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((d, idx) => (
          <Link
            key={d.id}
            to={`/department/${d.id}`}
            className="block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl transition-colors"
          >
            <div
              className={cn(
                "rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 hover:bg-zinc-900/60 transition-colors",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold">{d.name}</div>
                  {d.intro && <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{d.intro}</p>}
                </div>
                <BadgeCheck className="h-5 w-5 text-indigo-500 shrink-0" />
              </div>

              {d.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full bg-emerald-900/20 border border-emerald-400/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                <div>
                  <div className="text-xs text-muted-foreground">재학생</div>
                  <div className="font-medium">{d.students ?? "-"}명</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">교수진</div>
                  <div className="font-medium">{d.professors ?? "-"}명</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">설립</div>
                  <div className="font-medium">{d.foundedYear ?? "-"}년</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">취업률</div>
                  <div className="font-medium">
                    {d.employmentRate != null ? `${d.employmentRate}%` : "-"}
                  </div>
                </div>
              </div>

              {idx !== items.length - 1 && <Separator className="mt-4 bg-zinc-800/60" />}
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
