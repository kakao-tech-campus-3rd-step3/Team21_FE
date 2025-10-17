export type ProfessorDetailResponse = {
  professor: {
    id: number;
    name: string;
    university: { id: number; name: string };
    college: { id: number; name: string };
    department: { id: number; name: string; homepage?: string };
    email?: string;
    imageUrl?: string;
    office?: string;
    position?: string;
    major?: string;
    researchField?: string;
    degree?: string;
    overallRating: number;
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
      engLecYn?: string;
      pnf?: string;
      relYn?: string;
      reviewCount: number;
    }>;
    totalReviewCount: number;
  };
  recentLectureReviews: Array<{
    id: number;
    courseTitle: string;
    semester?: string;
    homework: number;
    lecDifficulty: number;
    gradeDistribution: number;
    examDifficulty: number;
    groupProjReq: string;
    content: string;
    createdDate: string;
  }>;
};
