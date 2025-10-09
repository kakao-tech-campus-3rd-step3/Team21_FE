import { searchDepartmentApi } from "@/entities/department/api";

export async function resolveDeptIdByName(
  univName: string,
  deptName: string,
): Promise<number | null> {
  const res = await searchDepartmentApi({ keyword: deptName, page: 0, size: 20 });
  const match = res.departments.find((d) => d.univName === univName && d.name === deptName);
  return match ? match.deptSeq : null;
}
