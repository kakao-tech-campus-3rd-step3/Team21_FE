import { Building2, GraduationCap, Mail, MapPin } from "lucide-react";
import { FiEdit3, FiUser } from "react-icons/fi";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

import { PROFESSOR_TEXT } from "@/pages/professor/text";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { RatingStars } from "@/shared/ui/RatingStars";

import type { ProfessorHeroData } from "../model/professor-hero.vm";

type Props = { data: ProfessorHeroData };

export function ProfessorHero({ data }: Props) {
  const { id, name, department, university, email, office, avatarUrl, rating, ratingCount } = data;
  const fmt = (n: number) => n.toLocaleString("ko-KR");
  const navigate = useNavigate();

  // TODO: api 호출
  const handleWriteReview = () => {
    navigate(`/professor/${id}/evaluate`);
  };

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md p-6 md:p-8 space-y-4">
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 shrink-0 rounded-xl bg-zinc-800/60 overflow-hidden grid place-items-center">
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${name} 교수 사진`} className="h-full w-full object-cover" />
          ) : (
            <FiUser className="h-10 w-10 text-zinc-400" aria-label={PROFESSOR_TEXT.noAvatar} />
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{name}</h1>

          {(email || office) && (
            <p className="mt-1 text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
              {email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {email}
                </span>
              )}
              {office && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {office}
                </span>
              )}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {department && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2 py-1">
                <GraduationCap className="h-4 w-4 text-indigo-400" />
                <span className="ml-1 font-medium text-white">{department}</span>
              </span>
            )}
            {university && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-2 py-1">
                <Building2 className="h-4 w-4 text-indigo-400" />
                <span className="ml-1 font-medium text-white">{university}</span>
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center text-sm">
            <RatingStars rating={rating} showValue />
            <span className="ml-2 text-muted-foreground">
              ({fmt(ratingCount)} {PROFESSOR_TEXT.ratingSuffix})
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-600/90 flex items-center gap-1.5 text-white"
              onClick={handleWriteReview}
            >
              <FiEdit3 size={16} />
              {PROFESSOR_TEXT.actions.writeReview}
            </Button>

            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-zinc-800 hover:bg-zinc-700 flex items-center gap-1.5"
            >
              <Link to={`/compare/professor/${id}`}>
                <HiArrowsRightLeft size={16} />
                {PROFESSOR_TEXT.actions.compare}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
