import { useState } from "react";

import { lectureReviews } from "@/__MOCK__/mockData";
import type { LectureReview } from "@/entities/professor/model/lecture-review.vm";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { RatingStars } from "@/shared/ui/RatingStars";
import { Separator } from "@/shared/ui/separator";

type Props = { profId: number };

function toSemesterText(sem: string) {
  if (!sem) return "";
  const [year, semester] = sem.split("-");
  return semester ? `${year}-${semester}학기` : sem;
}

export function ProfessorLectureReviewList({ profId }: Props) {
  const [visibleCount, setVisibleCount] = useState(3);
  // 빌드 오류 우회.. TODO: 추후 삭제
  console.log(profId);

  // TODO: api hook
  const rows: LectureReview[] = lectureReviews.map((r) => ({
    id: r.lecReviewSeq,
    course: "컴퓨터네트워크",
    semesterText: toSemesterText(r.semester),
    rating: r.rating,
    content: r.overallReview,
    chips: [
      r.groupProjReq === "Y" ? "팀플 있음" : "",
      typeof r.gradeDistribution === "number" ? `학점분포 ${r.gradeDistribution}/10` : "",
      typeof r.examDifficulty === "number" ? `시험난이도 ${r.examDifficulty}/10` : "",
    ].filter(Boolean),
  }));

  const total = rows.length;
  const list = rows.slice(0, visibleCount);

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">최근 강의평</CardTitle>
          <span className="text-sm text-muted-foreground">총 {total.toLocaleString()}개</span>
        </div>
      </CardHeader>

      <Separator className="bg-zinc-800/60" />

      <CardContent className="p-0 divide-y divide-zinc-800/60">
        {list.map((rv) => (
          <article key={rv.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-base font-semibold leading-6">{rv.course}</div>
                <div className="mt-1 text-xs text-muted-foreground">{rv.semesterText}</div>
              </div>

              {typeof rv.rating === "number" && (
                <div className="shrink-0">
                  <RatingStars rating={rv.rating} size={14} />
                </div>
              )}
            </div>

            <p className="mt-3 text-sm leading-6 whitespace-pre-wrap">{rv.content}</p>

            {rv.chips.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {rv.chips.map((c) => (
                  <span
                    key={c}
                    className="text-xs rounded-md px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </CardContent>

      {visibleCount < total && (
        <CardFooter className="pt-0">
          <Button
            variant="secondary"
            className="w-full bg-zinc-800 hover:bg-zinc-700"
            onClick={() => setVisibleCount(total)}
          >
            더보기
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
