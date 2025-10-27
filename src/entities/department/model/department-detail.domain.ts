export type ProfessorSummary = {
  seq: number;
  name: string;
  email?: string;
  position?: string;
  office?: string;
  imageUrl?: string;
};

export type DepartmentDetail = {
  id: number;
  departmentName: string;
  collegeName: string;
  universityName: string;
  intro?: string;
  homepage?: string;
  address?: string;
  tel?: string;
  fax?: string;
  email?: string;
  foundedYear?: number;
  students?: number;
  professors?: number;

  careerFields: string[];
  logoUrl?: string;

  professorList: ProfessorSummary[];
};
