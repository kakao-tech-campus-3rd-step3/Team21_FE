import { Star, StarHalf } from "lucide-react";

import type { Professor } from "@/entities/professor/model/ProfessorType";
import { Button } from "@/shared/ui/button";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

export type ProfessorCardProps = {
  professor: Professor;
  onRemove: () => void;
};

const StarRating = ({ rating, size = 20 }: { rating: number; size?: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex items-center text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} fill="currentColor" />
      ))}
      {hasHalfStar && <StarHalf key="half" size={size} fill="currentColor" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-gray-300" fill="currentColor" />
      ))}
    </div>
  );
};

export const ProfessorCard = ({ professor, onRemove }: ProfessorCardProps) => (
  <GlassCard className="w-full max-w-sm relative pt-12">
    {/* 삭제 버튼 */}
    <Button
      variant="ghost"
      size="icon"
      onClick={onRemove}
      className="absolute top-4 right-4 text-slate-200 hover:text-slate-400 z-10 w-8 h-8 rounded-full"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </Button>

    <div className="flex flex-col items-center text-center -mt-6">
      <GlassCardHeader className="w-full text-center pb-0">
        <GlassCardTitle>{professor.name}</GlassCardTitle>
        <GlassCardDescription>
          {professor.university}
          <br />
          {professor.department}
        </GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="w-full flex flex-col items-center">
        {/* 평점 */}
        <div className="flex items-center gap-2 my-2">
          <StarRating rating={professor.rating} />
          <span className="font-bold text-slate-100">{professor.rating.toFixed(1)}</span>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mt-2 w-full justify-center">
          {professor.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-white/20 text-slate-100 text-sm backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCardContent>
    </div>
  </GlassCard>
);
