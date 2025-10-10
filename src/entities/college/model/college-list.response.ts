export type CollegeListResponse = {
  colleges: Array<{
    collegeSeq: number;
    collegeName: string;
    departmentCount: number;
    collegeIntro: string;
  }>;
};
