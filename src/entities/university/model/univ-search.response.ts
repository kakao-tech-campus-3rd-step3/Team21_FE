export type UnivSearchResponse = {
  universities: Array<{
    univSeq: number;
    name: string;
    address: string;
    imageUrl: string | null;
    rating: number;
    reviewCount: number;
  }>;
  totalCount: number;
};
