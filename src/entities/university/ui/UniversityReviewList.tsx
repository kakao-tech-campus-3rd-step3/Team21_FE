import { useState } from "react";

import { univReviews } from "@/__MOCK__/mockData";
import type { UniversityReview } from "@/entities/university/model/review.vm";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { RatingStars } from "@/shared/ui/RatingStars";
import { Separator } from "@/shared/ui/separator";

type Props = {
  univSeq: number;
};

export function UniversityReviewList({ univSeq }: Props) {
  const [visibleCount, setVisibleCount] = useState(3);

  const reviews: UniversityReview[] = univReviews
    .filter((r) => r.univSeq === univSeq)
    .map((r) => ({
      id: r.univReviewSeq,
      authorName: "익명",
      rating: r.aver,
      date: r.createDate.split("T")[0],
      content: r.reviewTxt,
      tags: r.tags,
    }));

  const total = reviews.length;

  const visibleReviews = reviews.slice(0, visibleCount);

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
        {visibleReviews.map((rv) => (
          <article key={rv.id} className="p-5">
            <div className="text-sm">
              <div className="font-medium">{rv.authorName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-3">
                <RatingStars rating={rv.rating} size={14} />
                <span className="tabular-nums">{rv.date}</span>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 whitespace-pre-wrap">{rv.content}</p>

            {rv.tags && rv.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {rv.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-md px-2 py-1 bg-zinc-800 text-zinc-300 border border-zinc-700"
                  >
                    {t}
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
