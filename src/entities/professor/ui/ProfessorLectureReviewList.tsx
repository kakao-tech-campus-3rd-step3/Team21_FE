import { useProfessorReviews } from "@/entities/professor/hooks/useProfessorReviews";
import type { LectureReview } from "@/entities/professor/model/lecture-review.vm";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

type Props = { profId: number };

function toSemesterText(sem: string) {
  if (!sem) return "";
  const [year, semester] = sem.split("-");
  return semester ? `${year}-${semester}학기` : sem;
}

export function ProfessorLectureReviewList({ profId }: Props) {
  const {
    data: reviews,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProfessorReviews(profId, { pageSize: 3 });

  const rows: LectureReview[] = (reviews ?? []).map((r) => ({
    id: r.id,
    course: r.courseTitle,
    semesterText: toSemesterText(r.semester),
    rating: undefined,
    content: r.content,
    chips: [
      r.groupProjectRequired ? "팀플 있음" : "팀플 없음",
      typeof r.gradeDistribution === "number" ? `학점분포 ${r.gradeDistribution}/10` : "",
      typeof r.examDifficulty === "number" ? `시험난이도 ${r.examDifficulty}/10` : "",
      typeof r.homework === "number" ? `과제 ${r.homework}/10` : "",
      typeof r.lectureDifficulty === "number" ? `강의난이도 ${r.lectureDifficulty}/10` : "",
    ].filter(Boolean),
  }));

  const totalLoaded = rows.length;

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">최근 강의평</CardTitle>
          <span className="text-sm text-muted-foreground">총 {totalLoaded.toLocaleString()}개</span>
        </div>
      </CardHeader>

      <Separator className="bg-zinc-800/60" />

      <CardContent className="p-0 divide-y divide-zinc-800/60">
        {isLoading && <div className="p-5 text-sm text-zinc-300">불러오는 중…</div>}
        {isError && !isLoading && (
          <div className="p-5 text-sm text-red-400">강의평을 불러오지 못했습니다.</div>
        )}
        {!isLoading && !isError && rows.length === 0 && (
          <div className="p-5 text-sm text-zinc-400">등록된 강의평이 없습니다.</div>
        )}

        {!isLoading &&
          !isError &&
          rows.map((rv) => (
            <article key={rv.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-base font-semibold leading-6">{rv.course}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{rv.semesterText}</div>
                </div>
                {/* 별점 api 외않쥶 */}
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

      {hasNextPage && (
        <CardFooter className="pt-0">
          <Button
            variant="secondary"
            className="w-full bg-zinc-800 hover:bg-zinc-700"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "불러오는 중…" : "더보기"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
