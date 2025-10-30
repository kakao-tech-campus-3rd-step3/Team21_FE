import type { DepartmentDetail } from "@/entities/department/model/department-detail.domain";
import type { DepartmentDetailRequest } from "@/entities/department/model/department-detail.request";
import type { DepartmentDetailResponse } from "@/entities/department/model/department-detail.response";
import { toNumberOrUndef, toUndefIfEmpty } from "@/shared/lib/string-utils";

export function toGetDepartmentDetailRequest(deptSeq: number): DepartmentDetailRequest {
  return { deptSeq };
}

export function mapDepartmentDetailResponseToDomain(r: DepartmentDetailResponse): DepartmentDetail {
  const careerFields =
    r.careerFields
      ?.map((c) => c.fieldName?.trim())
      .filter((v): v is string => !!v && v.length > 0) ?? [];

  const professorList =
    r.professors?.map((p) => ({
      seq: p.profSeq,
      name: p.profName,
      email: toUndefIfEmpty(p.profEmail),
      position: toUndefIfEmpty(p.position),
      office: toUndefIfEmpty(p.office),
      imageUrl: toUndefIfEmpty(p.imageUrl),
    })) ?? [];

  const professorCount = r.professorCount ?? professorList.length ?? undefined;

  return {
    id: r.deptSeq,
    departmentName: r.deptName,
    collegeName: r.collegeName,
    universityName: r.univName,

    intro: toUndefIfEmpty(r.deptIntro),
    homepage: toUndefIfEmpty(r.homePage),
    address: toUndefIfEmpty(r.deptAddress),
    tel: toUndefIfEmpty(r.deptTel),
    fax: toUndefIfEmpty(r.deptFax),
    email: toUndefIfEmpty(r.deptEmail),
    foundedYear: toNumberOrUndef(r.deptEstablishedYear),
    students: r.deptStudentNum,
    professors: professorCount,

    careerFields,
    logoUrl: toUndefIfEmpty(r.imageUrl),

    professorList,
  };
}
