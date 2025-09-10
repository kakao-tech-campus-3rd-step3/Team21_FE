import { CollegeGrid } from "@/entities/college";
import {
  UniversityContactSide,
  UniversityHero,
  UniversityMainInfoSide,
  UniversityReviewList,
} from "@/entities/university";
import { WriteReviewButton } from "@/features/review-submit";

export function UniversityDetailPage() {
  return (
    <main className="mx-auto">
      <UniversityHero />
      <CollegeGrid />
      <WriteReviewButton />
      <UniversityMainInfoSide />
      <UniversityContactSide />
      <UniversityReviewList />
    </main>
  );
}
