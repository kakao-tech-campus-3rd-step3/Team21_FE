import { useUniversityReviews } from "@/entities/university/hooks/useUniversityReviews";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { RatingStars } from "@/shared/ui/RatingStars";
import { Separator } from "@/shared/ui/separator";
import { useState } from "react";

type Props = { univSeq: number };

const PAGE_SIZE = 3;

export function UniversityReviewList({ univSeq }: Props) {
  const [size] = useState(PAGE_SIZE);
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUniversityReviews(univSeq, size);

  const pages = data?.pages ?? [];
  const items = pages.flatMap((p) =>
    p.items.map((rv) => ({
      id: rv.id,
      authorName: rv.author || "익명",
      rating: rv.rating,
      date: rv.createdAt.toISOString().split("T")[0],
      content: rv.text,
      // tags: API 없음
    })),
  );

  const total = pages[0]?.totalElements ?? 0;

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">학생 평가</CardTitle>
          <span className="text-sm text-muted-foreground">총 {total.toLocaleString()}개</span>
        </div>
      </CardHeader>

      <Separator className="bg-zinc-800/60" />

      <CardContent className="divide-y divide-zinc-800/60 p-0">
        {isLoading && <div className="p-5 text-sm text-zinc-300">불러오는 중…</div>}
        {isError && (
          <div className="p-5 text-sm text-red-400">리뷰 정보를 불러오지 못했습니다.</div>
        )}

        {!isLoading &&
          !isError &&
          items.map((rv) => (
            <article key={rv.id} className="p-5">
              <div className="text-sm">
                <div className="font-medium">{rv.authorName}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-3">
                  <RatingStars rating={rv.rating} size={14} />
                  <span className="tabular-nums">{rv.date}</span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 whitespace-pre-wrap">{rv.content}</p>
            </article>
          ))}

        {!isLoading && !isError && total === 0 && (
          <div className="p-5 text-sm text-zinc-300">아직 등록된 평가가 없습니다.</div>
        )}
      </CardContent>

      {!isLoading && !isError && hasNextPage && (
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
