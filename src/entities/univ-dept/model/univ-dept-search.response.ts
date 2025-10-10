export type UnivDeptSearchResponse = {
  results: Array<{
    univSeq: number;
    univName: string;
    collegeName: string;
    deptName: string;
    description: string;
    studentCount: number;
    rating: number;
    reviewCount: number;
  }>;
  totalCount: number;
};
