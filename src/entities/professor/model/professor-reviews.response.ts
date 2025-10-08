export type ProfessorReviewsResponse = {
  reviews: Array<{
    id: number;
    courseTitle: string;
    semester: string;
    homework: number;
    lecDifficulty: number;
    gradeDistribution: number;
    examDifficulty: number;
    groupProjReq: "Y" | "N";
    content: string;
    createdDate: [number, number, number, number, number];
  }>;
  hasNext: boolean;
};
