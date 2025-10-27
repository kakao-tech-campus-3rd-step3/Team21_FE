export type SemesterStatDto = {
  semester: string;
  overallAvg: number;
};

export type CompareProfessor = {
  profSeq: number;
  profName: string;
  univName: string;
  deptName: string;
  scores: {
    theisPerformance: number;
    researchPerformance: number;
    homework: number;
    lectureDifficulty: number;
    examDifficulty: number;
  };
  semesterDto?: SemesterStatDto[];
};

export type ProfessorList = CompareProfessor[];
