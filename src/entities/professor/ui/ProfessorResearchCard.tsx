import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";

import { PROFESSOR_RESEARCH_TEXT } from "@/pages/professor/text";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type LectureItem = {
  id: number;
  name: string;
  code?: string;
  semester?: string;
  reviewCount?: number;
};

type Props = {
  profId: number;
  education?: string;
  areas?: string[];
  lectures: LectureItem[];
};

export function ProfessorResearchCard({ profId, education, areas, lectures }: Props) {
  const tags = Array.isArray(areas) ? areas : [];
  const hasProfId = Number.isFinite(profId) && profId > 0;

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
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
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
            {lectures.length > 0 ? (
              <ul className="space-y-3">
                {lectures.map((lec) => (
                  <li key={lec.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        {lec.name}
                        {typeof lec.reviewCount === "number" && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({lec.reviewCount} 리뷰)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {lec.semester ?? "학기 정보 없음"}
                      </div>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-600/90 flex items-center gap-1.5 text-white"
                      disabled={!hasProfId}
                      title={hasProfId ? "강의평 작성" : "교수 정보가 없어 이동할 수 없습니다."}
                    >
                      {hasProfId ? (
                        <Link to={ROUTES.COURSE_EVAL(profId, lec.id)}>
                          <FiEdit3 size={16} />
                          평가하기
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 opacity-70">
                          <FiEdit3 size={16} />
                          평가하기
                        </span>
                      )}
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
