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
};
