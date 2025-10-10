export type ProfessorDetailResponse = {
  professor: {
    id: number;
    name: string;
    university: { id: number; name: string };
    college: { id: number; name: string };
    department: { id: number; name: string; homepage: string | null };
    email: string | null;
    imageUrl: string | null;
    office: string | null;
    position: string | null;
    overallRating: number | null;
    ratingBreakdown: {
      thesisPerformance: number;
      researchPerformance: number;
      homework: number;
      lectureDifficulty: number;
      examDifficulty: number;
    };
    departmentAverage: {
      thesisPerformance: number;
      researchPerformance: number;
      homework: number;
      lectureDifficulty: number;
      examDifficulty: number;
    };
    lectures: Array<{ id: number; name: string; code?: string | null; semester?: string | null }>;
    totalReviewCount: number;
  };
  recentLectureReviews: Array<{
    id: number;
    lectureId: number;
    lectureName: string;
    rating: number;
    comment?: string | null;
    createdAt?: string | null;
  }>;
};
