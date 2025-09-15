import { Star, StarHalf } from "lucide-react";

type StarRatingProps = {
  rating: number;
  size?: number;
};

export const StarRating = ({ rating, size = 20 }: StarRatingProps) => {
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
