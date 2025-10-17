export type Professor = {
  university?: string;
  id: number;
  name: string;
  department: string;
  rating: number;
  homework?: number;
  lecDifficulty?: number;
  examDifficulty?: number;
  researchPerf?: number;
  thesisPerf?: number;
  semesters?: Array<{ label: string; avg: number; order: number }>;
};
