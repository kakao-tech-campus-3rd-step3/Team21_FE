import { CollegeGrid } from "@/entities/college";
import { UniversityHero } from "@/entities/university";
import { WriteReviewButton } from "@/features/review-submit";

export function UniversityDetailPage() {
  return (
    <main className="mx-auto">
      <UniversityHero />
      <CollegeGrid />
      <WriteReviewButton />
    </main>
  );
}
