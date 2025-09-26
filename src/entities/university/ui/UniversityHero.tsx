import { Calendar, Users } from "lucide-react";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

import type { UniversityHeroData } from "@/entities/university/model/hero.vm";
import { UNIVERSITY_TEXT } from "@/entities/university/text";
import { formatNumber } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { RatingStars } from "@/shared/ui/RatingStars";

type Props = {
  data: UniversityHeroData;
};

export function UniversityHero({ data }: Props) {
  const navigate = useNavigate();
  const { name, logoUrl, address, foundedYear, rating, ratingCount, students } = data;

  const formattedStudents = formatNumber(students);
  const hasFoundedYear = typeof foundedYear === "number";

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md p-6 md:p-8 space-y-4">
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 shrink-0 rounded-xl bg-zinc-800/60 overflow-hidden grid place-items-center">
          {logoUrl ? (
            <img src={logoUrl} alt={`${name} 로고`} className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-muted-foreground">{UNIVERSITY_TEXT.noLogo}</span>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{name}</h1>
          {address && <p className="mt-1 text-sm text-muted-foreground">{address}</p>}

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2 py-1">
              <Users className="h-4 w-4 text-indigo-400" />
              {UNIVERSITY_TEXT.students}:
              <span className="ml-1 font-medium text-white">{formattedStudents}</span>
            </span>

            {hasFoundedYear && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2 py-1">
                <Calendar className="h-4 w-4 text-indigo-400" />
                {UNIVERSITY_TEXT.foundedYear}:
                <span className="ml-1 font-medium text-white">{foundedYear}</span>
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center text-sm">
            <RatingStars rating={rating} showValue />
            <span className="ml-2 text-muted-foreground">
              ({formatNumber(ratingCount)} {UNIVERSITY_TEXT.ratingSuffix})
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-600/90 flex items-center gap-1.5 text-white"
              onClick={() => {
                // TODO: 로그인 체크
                navigate(`/university/${data.id}/evaluate`);
              }}
            >
              <FiEdit3 size={16} />
              {UNIVERSITY_TEXT.actions.writeReview}
            </Button>

            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-zinc-800 hover:bg-zinc-700 flex items-center gap-1.5"
            >
              <Link to={`/compare/university/${data.id}`}>
                <HiArrowsRightLeft size={16} />
                {UNIVERSITY_TEXT.actions.compare}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
