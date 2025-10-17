export type DepartmentDetailResponse = {
  deptSeq: number;
  deptName: string;
  homePage: string;
  deptAddress: string;
  deptTel: string;
  deptFax: string;
  deptEmail: string;
  deptEstablishedYear: string;
  deptIntro: string;
  univName: string;
  imageUrl: string;
  collegeName: string;
  deptStudentNum: number;
  professorCount: number;

  careerFields?: CareerFieldResponse[];
  professors?: ProfessorResponse[];
};

export type CareerFieldResponse = {
  careerFieldSeq: number;
  fieldName: string;
};

export type ProfessorResponse = {
  profSeq: number;
  profName: string;
  profEmail: string;
  position: string;
  office: string;
  imageUrl: string;
};
