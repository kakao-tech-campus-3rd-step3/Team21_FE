import { X } from "lucide-react";

import type { Professor } from "@/entities/professor/model/professors";
import { Button } from "@/shared/ui/button";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";
import { StarRating } from "@/shared/ui/StarRating";

export type ProfessorCardProps = {
  professor: Professor;
  onRemove: () => void;
};

export const ProfessorCard = ({ professor, onRemove }: ProfessorCardProps) => (
  <GlassCard className="w-full relative pt-10 h-full" shine={false}>
    {/* 삭제 버튼 */}
    <Button
      variant="ghost"
      size="icon"
      onClick={onRemove}
      className="absolute -top-4 right-2 text-slate-200 hover:text-slate-400 z-10 w-8 h-8 rounded-full"
    >
      <X size={18} />
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
