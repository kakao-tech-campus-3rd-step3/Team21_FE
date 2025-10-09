export type UnivProfSearchResponse = {
  results: Array<{
    univSeq: number;
    univName: string;
    profName: string;
    collegeName: string;
    deptName: string;
    position: string | null;
    rating: number;
    reviewCount: number;
  }>;
  totalCount: number;
};
