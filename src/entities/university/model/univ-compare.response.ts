export type UniversityApi = {
  univSeq: number;
  univName: string;
  address: string;
  tel: string;
  scores: {
    foodAvg: number;
    dormitoryAvg: number;
    convenienceAvg: number;
    campusAvg: number;
    welfareAvg: number;
  };
};

export type UniversityTrendApi = {
  trends: {
    year: number;
    scores: { univSeq: number; averageScore: number }[];
  }[];
};
