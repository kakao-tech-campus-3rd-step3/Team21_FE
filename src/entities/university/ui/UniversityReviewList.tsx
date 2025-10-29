import { useState } from "react";

import { useUniversityReviews } from "@/entities/university/hooks/useUniversityReviews";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorView } from "@/shared/ui/ErrorView";
import { LoadingView } from "@/shared/ui/LoadingView";
import { RatingStars } from "@/shared/ui/RatingStars";
import { Separator } from "@/shared/ui/separator";

type Props = { univSeq: number };
const PAGE_SIZE = 3;

export function UniversityReviewList({ univSeq }: Props) {
  const [size] = useState(PAGE_SIZE);
  const invalid = !Number.isFinite(univSeq) || univSeq <= 0;

  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUniversityReviews(univSeq, size);

  if (invalid) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">학생 평가</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="잘못된 접근입니다"
            description="요청하신 대학 정보를 확인할 수 없습니다."
          />
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">학생 평가</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingView message="리뷰를 불러오는 중…" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">학생 평가</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorView
            title="리뷰 정보를 불러오지 못했어요"
            description="네트워크 상태를 확인하신 뒤 다시 시도해 주세요."
            onRetry={refetch}
          />
        </CardContent>
      </Card>
    );
  }

  const pages = data?.pages ?? [];
  const total = pages[0]?.totalElements ?? 0;

  if (!pages.length || total === 0) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">학생 평가</CardTitle>
            <span className="text-sm text-muted-foreground">총 0개</span>
          </div>
        </CardHeader>
        <Separator className="bg-zinc-800/60" />
        <CardContent>
          <EmptyState
            title="아직 등록된 평가가 없습니다"
            description="첫 번째 평가를 남겨보세요."
          />
        </CardContent>
      </Card>
    );
  }

  const items = pages.flatMap((p) =>
    p.items.map((rv) => ({
      id: rv.id,
      authorName: rv.author || "익명",
      rating: rv.rating,
      date: rv.createdAt.toISOString().split("T")[0],
      content: rv.text,
    })),
  );

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
        {items.map((rv) => (
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
