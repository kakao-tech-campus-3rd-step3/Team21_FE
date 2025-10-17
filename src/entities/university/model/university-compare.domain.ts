export type University = {
  id: number;
  name: string;
  address: string;
  tel: string;
  food: number;
  dorm: number;
  conv: number;
  campus: number;
  welfare: number;
  rating: number;
};

export type UniversityTrendRow = {
  year: string;
  u1: number;
  u2?: number;
};
