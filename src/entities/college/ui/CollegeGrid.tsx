import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import type { CollegeCard } from "@/entities/college/model/college-card.vm";
import { Card, CardContent } from "@/shared/ui/card";

type Props = { colleges: CollegeCard[] };

export function CollegeGrid({ colleges }: Props) {
  if (!colleges?.length) {
    return (
      <section className="px-4 py-2">
        <h2 className="text-lg font-semibold mb-2">단과대학</h2>
        <div className="text-sm text-muted-foreground">단과대학 정보가 없습니다.</div>
      </section>
    );
  }

  return (
    <section>
      <div className="grid gap-4 grid-cols-2">
        {colleges.map((c) => (
          <Link
            key={c.collegeSeq}
            to={`/college/${100}`}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl"
          >
            <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur hover:bg-zinc-800/70 transition-colors cursor-pointer">
              <CardContent className="px-4 py-2 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="truncate font-semibold text-lg md:text-xl leading-tight">
                    {c.name}
                  </div>
                  <FiChevronRight
                    size={18}
                    className="shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>

                {c.description && (
                  <div className="text-sm text-muted-foreground line-clamp-1">{c.description}</div>
                )}

                {c.departmentCount !== undefined && (
                  <div className="flex justify-between text-xs text-muted-foreground pt-1 border-t border-zinc-800/80">
                    <span>{c.departmentCount}개 학과</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
