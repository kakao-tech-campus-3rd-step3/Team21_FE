import type { Department } from "@/entities/department/model/department-list.domain";

import type { DepartmentListResponse } from "./department-list.response";

export function mapDepartmentListResponseToDomain(r: DepartmentListResponse): Department[] {
  return (r.departments ?? []).map((d) => ({
    id: d.deptSeq,
    name: d.deptName,
    intro: d.deptIntro || undefined,
    homepage: d.homePage || undefined,
    address: d.deptAddress || undefined,
    tel: d.deptTel || undefined,
    fax: d.deptFax || undefined,
    email: d.deptEmail || undefined,
    foundedYear: d.deptEstablishedYear ? Number(d.deptEstablishedYear) : undefined,
    students: d.deptStudentNum ?? undefined,
    professors: d.professorCount ?? undefined,
    employmentRate: d.employmentRate ?? undefined,
    tags: [],
  }));
}
