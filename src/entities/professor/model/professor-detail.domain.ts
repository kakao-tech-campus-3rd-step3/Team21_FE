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

  degree?: string;
  major?: string;
  researchField?: string;

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

  lectures: Array<{
    id: number;
    name: string;
    code?: string;
    semester?: string;
    reviewCount?: number;
  }>;

  recentLectureReviews: Array<{
    id: number;
    lectureId?: number;
    lectureName: string;
    rating?: number;
    comment?: string;
    createdAt?: string;
    semester?: string;
    homework?: number;
    lectureDifficulty?: number;
    gradeDistribution?: number;
    examDifficulty?: number;
    groupProjectRequired?: boolean;
  }>;
};
