export type Professor = {
  university?: string;
  id: number;
  name: string;
  department: string;
  //logoUrl: string; 학교 로고 이미지를 넣을지 말지 고민
  rating: number;
  tags: string[];
  homework?: number;
  lecDifficulty?: number;
  examDifficulty?: number;
  gradeDistribution?: number;
  researchPerf?: number;
};
