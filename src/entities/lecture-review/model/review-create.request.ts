export type LectureReviewCreateRequest = {
  lecSeq: number;
  year: number;
  semester: number;
  lecDifficulty?: number;
  gradeDistribution?: number;
  examDifficulty?: number;
  homework?: number;
  groupProjReq?: string;
  overallReview?: string;
};
