import cnulogo from "@/assets/cnulogo.svg";
import type { UnivSearchResult } from "@/entities/university/model/univ-search-result";
import { UNIVERSITY_TEXT } from "@/entities/university/text";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";
import { StarRating } from "@/shared/ui/StarRating";
type Props = {
  university: UnivSearchResult;
};

export const UniversityCard = ({ university }: Props) => {
  return (
    <GlassCard shine={false} className="w-full">
      <GlassCardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="w-24 h-24 flex items-center justify-center">
          <img src={cnulogo} alt={`${university.name} logo`} className="w-24 h-24 object-contain" />
        </div>

        <div className="ml-3 flex-1">
          <GlassCardTitle className="mt-5">{university.name}</GlassCardTitle>
          <GlassCardDescription className="mt-5">{university.address}</GlassCardDescription>
        </div>

        {/* 평점 */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <StarRating rating={university.rating} size={16} />
            <span className="text-sm font-semibold text-slate-800">
              {university.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {UNIVERSITY_TEXT.reviewCount} {university.reviewCount.toLocaleString()}
          </p>
        </div>
      </GlassCardHeader>
      <GlassCardContent />
    </GlassCard>
  );
};
