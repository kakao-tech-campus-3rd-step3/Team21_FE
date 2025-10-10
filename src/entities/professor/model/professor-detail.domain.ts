export type ProfessorDetail = {
  id: number;
  name: string;
  university: { id: number; name: string };
  college: { id: number; name: string };
  department: { id: number; name: string; homepage?: string };
  email?: string;
  imageUrl?: string;
  office?: string;
  position?: string;
  overallRating: number;
  totalReviewCount: number;
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
  lectures: Array<{ id: number; name: string; code?: string; semester?: string }>;
  recentLectureReviews: Array<{
    id: number;
    lectureId: number;
    lectureName: string;
    rating: number;
    comment?: string;
    createdAt?: string;
  }>;
};
