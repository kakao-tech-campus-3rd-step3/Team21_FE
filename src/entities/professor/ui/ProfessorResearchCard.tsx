import { FiEdit3 } from "react-icons/fi";

import { profResearch } from "@/__MOCK__/mockData";
import type { ProfessorResearchInfo } from "@/entities/professor/model/research.vm";
import { PROFESSOR_RESEARCH_TEXT } from "@/pages/professor/text";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = { profId: number };

export function ProfessorResearchCard({ profId }: Props) {
  // TODO: api hook
  const prof = (profResearch as ProfessorResearchInfo[]).find((p) => p.id === profId);
  const profCourses = [
    { id: 1, profId: 100, title: "컴퓨터네트워크", semester: "2023-1학기" },
    { id: 2, profId: 100, title: "운영체제", semester: "2023-2학기" },
    { id: 3, profId: 100, title: "자료구조", semester: "2023-1학기" },
    { id: 4, profId: 100, title: "알고리즘", semester: "2023-2학기" },
    { id: 5, profId: 100, title: "데이터베이스", semester: "2023-1학기" },
  ];

  // TODO: ErrorBoundary
  if (!prof) {
    return (
      <Card className="relative overflow-hidden bg-zinc-900/60 border-zinc-800 backdrop-blur">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_70%_50%,rgba(99,102,241,0.08),transparent_60%)]" />
        <CardHeader>
          <CardTitle className="text-base">{PROFESSOR_RESEARCH_TEXT.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          해당 교수의 연구 정보가 없습니다.
        </CardContent>
      </Card>
    );
  }

  const education = prof.education ?? prof.degree ?? undefined;
  const areas = Array.isArray(prof.researchAreas) ? prof.researchAreas : [];

  return (
    <Card className="relative overflow-hidden bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_70%_50%,rgba(99,102,241,0.08),transparent_60%)]" />
      <CardHeader>
        <CardTitle className="text-xl">{PROFESSOR_RESEARCH_TEXT.title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-0 h-[460px] md:h-[540px]">
        <div className="flex flex-col h-full overflow-y-auto space-y-6">
          <section>
            <div className="mb-2 text-xs text-muted-foreground">
              {PROFESSOR_RESEARCH_TEXT.education}
            </div>
            <div className="font-medium">{education ?? "정보 없음"}</div>
          </section>

          <section>
            <div className="mb-2 text-xs text-muted-foreground">
              {PROFESSOR_RESEARCH_TEXT.mainAreas}
            </div>
            {areas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {areas.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                             bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">등록된 연구분야가 없습니다.</div>
            )}
          </section>
          <section>
            <div className="mb-2 text-xs text-muted-foreground">개설 강의</div>
            {profCourses.filter((c) => c.profId === profId).length > 0 ? (
              <ul className="space-y-3">
                {profCourses
                  .filter((c) => c.profId === profId)
                  .map((course) => (
                    <li key={course.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{course.title}</div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-600/90 flex items-center gap-1.5 text-white"
                        onClick={() => alert(`"${course.title}" 강의 평가하기`)}
                      >
                        <FiEdit3 size={16} />
                        평가하기
                      </Button>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">등록된 강의가 없습니다.</div>
            )}
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
