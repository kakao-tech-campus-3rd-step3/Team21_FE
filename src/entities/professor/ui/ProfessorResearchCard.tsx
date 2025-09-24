import { profResearch } from "@/__MOCK__/mockData";
import type { ProfessorResearchInfo } from "@/entities/professor/model/research.vm";
import { PROFESSOR_RESEARCH_TEXT } from "@/pages/professor/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = { profId: number };

export function ProfessorResearchCard({ profId }: Props) {
  // TODO: api hook
  const prof = (profResearch as ProfessorResearchInfo[]).find((p) => p.id === profId);

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
        </div>
      </CardContent>
    </Card>
  );
}
