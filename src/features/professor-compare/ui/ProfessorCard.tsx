import { X } from "lucide-react";

import type { Professor } from "@/entities/professor/model/professors.domain";
import { Button } from "@/shared/ui/button";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";
import { StarRating } from "@/shared/ui/StarRating";

type props = {
  professor: Professor;
  onRemove: () => void;
};

export const ProfessorCard = ({ professor, onRemove }: props) => (
  <GlassCard className="w-full relative pt-10 h-full isolate" shine={false}>
    {/* 삭제 버튼 */}
    <Button
      variant="ghost"
      size="icon"
      onClick={onRemove}
      className="absolute -top-4 right-2 text-slate-200 hover:text-slate-400 z-10 w-8 h-8 rounded-full"
      type="button"
      aria-label={`Remove ${professor.name}`}
      title={`Remove ${professor.name}`}
    >
      <X size={18} />
    </Button>

    <div className="flex flex-col items-center text-center -mt-6">
      <GlassCardHeader className="w-full text-center pb-0">
        <GlassCardTitle className="relative z-10">{professor.name}</GlassCardTitle>
        <GlassCardDescription className="relative z-10">
          {professor.university}
          <br />
          {professor.department}
        </GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="w-full flex flex-col items-center">
        {/* 평점 */}
        <div className="flex items-center gap-2 my-2">
          <StarRating rating={professor.rating} />
          <span className="font-bold text-slate-100 relative z-10 ">
            {professor.rating.toFixed(1)}
          </span>
        </div>
      </GlassCardContent>
    </div>
  </GlassCard>
);
