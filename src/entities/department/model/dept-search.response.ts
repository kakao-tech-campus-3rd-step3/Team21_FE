export type DeptSearchResponse = {
  departments: Array<{
    deptSeq: number;
    name: string;
    univName: string;
    description: string;
    studentCount: number;
    rating: number;
    reviewCount: number;
  }>;
  totalCount: number;
};
