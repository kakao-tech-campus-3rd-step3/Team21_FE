export type UniversityReview = {
  id: number;
  author: string;
  rating: number; // overallScore
  text: string;
  createdAt: Date;
  scores: {
    food: number;
    dorm: number;
    conv: number;
    campus: number;
  };
};

export type UniversityReviewPage = {
  items: UniversityReview[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
};
