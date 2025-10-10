export type ProfSearchResponse = {
  professor: Array<{
    profSeq: number;
    name: string;
    position: string | null;
    univName: string;
    collegeName: string;
    deptName: string;
    rating: number;
    reviewCount: number;
  }>;
  totalCount: number;
};
