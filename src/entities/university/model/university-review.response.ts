export type UniversityReviewListResponse = {
  content: Array<{
    univReviewSeq: number;
    foodScore: number;
    dormScore: number;
    convScore: number;
    campusScore: number;
    overallScore: number;
    reviewText: string;
    createUser: string;
    createDate: string; // ISO
  }>;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
};
