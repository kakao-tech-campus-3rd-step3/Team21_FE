import type { DepartmentDetail } from "./department-detail.domain";
import type { DepartmentDetailRequest } from "./department-detail.request";
import type { DepartmentDetailResponse } from "./department-detail.response";

export function toGetDepartmentDetailRequest(deptSeq: number): DepartmentDetailRequest {
  return { deptSeq };
}

export function mapDepartmentDetailResponseToDomain(r: DepartmentDetailResponse): DepartmentDetail {
  const professorList =
    (r.professors ?? []).map((p) => ({
      seq: p.profSeq,
      name: p.profName,
      email: p.profEmail ?? undefined,
      position: p.position ?? undefined,
      office: p.office ?? undefined,
      imageUrl: p.imageUrl ?? undefined,
    })) ?? [];

  const profCountFromArray = professorList.length > 0 ? professorList.length : undefined;

  return {
    id: r.deptSeq,
    departmentName: r.deptName,
    collegeName: r.collegeName,
    universityName: r.univName,

    intro: r.deptIntro || undefined,
    homepage: r.homePage || undefined,
    address: r.deptAddress || undefined,
    tel: r.deptTel || undefined,
    fax: r.deptFax || undefined,
    email: r.deptEmail || undefined,
    foundedYear: r.deptEstablishedYear ? Number(r.deptEstablishedYear) : undefined,
    students: r.deptStudentNum ?? undefined,

    professors: r.professorCount ?? profCountFromArray,

    careerFields: r.careerFields ?? [],
    professorList,
  };
}
