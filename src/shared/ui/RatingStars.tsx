import { Star as StarIcon } from "lucide-react";

import { calcStarCounts } from "@/shared/lib/rating";
import { cn } from "@/shared/lib/utils";

type Props = {
  rating: number;
  max?: number;
  allowHalf?: boolean;
  className?: string;
  size?: number;
  showValue?: boolean;
  valueClassName?: string;
};

export function RatingStars({
  rating,
  max = 5,
  allowHalf = false,
  className,
  size = 16,
  showValue = false,
  valueClassName,
}: Props) {
  const { full, half, empty } = calcStarCounts(rating, max, allowHalf);

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      {Array.from({ length: full }).map((_, i) => (
        <StarIcon
          key={`f${i}`}
          className="h-4 w-4 fill-yellow-400 stroke-yellow-400"
          style={{ width: size, height: size }}
        />
      ))}
      {Array.from({ length: half }).map((_, i) => (
        <StarIcon
          key={`h${i}`}
          className="h-4 w-4 text-yellow-400"
          style={{ width: size, height: size }}
        />
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <StarIcon
          key={`e${i}`}
          className="h-4 w-4 text-zinc-600"
          style={{ width: size, height: size }}
        />
      ))}
      {showValue && (
        <span className={cn("ml-2 font-medium", valueClassName)}>{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
