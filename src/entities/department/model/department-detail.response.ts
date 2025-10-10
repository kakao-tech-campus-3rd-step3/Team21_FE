export type DepartmentDetailResponse = {
  univName: string;
  collegeName: string;
  deptSeq: number;
  deptName: string;
  homePage: string | null;
  deptAddress: string | null;
  deptTel: string | null;
  deptFax: string | null;
  deptEmail: string | null;
  deptEstablishedYear: string | null;
  deptIntro: string | null;
  deptStudentNum: number | null;
  professorCount: number | null;
  careerFields: string[] | null;
};
