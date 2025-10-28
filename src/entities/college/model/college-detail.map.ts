import type { CollegeDetail } from "@/entities/college/model/college-detail.domain";
import type { GetCollegeDetailRequest } from "@/entities/college/model/college-detail.request";
import type { CollegeDetailResponse } from "@/entities/college/model/college-detail.response";

export function toGetCollegeDetailRequest(collegeSeq: number): GetCollegeDetailRequest {
  return { collegeSeq };
}

export function mapCollegeDetailResponseToDomain(r: CollegeDetailResponse): CollegeDetail {
  return {
    id: r.collegeSeq,
    name: r.collegeName,
    students: r.collegeStudentNum ?? undefined,
    foundedYear: r.collegeEstablishedYear ? Number(r.collegeEstablishedYear) : undefined,
    tel: r.collegeTel || undefined,
    homepage: r.collegeHomePage || undefined,
    intro: r.collegeIntro || undefined,
    professors: r.professorCount ?? undefined,
    logoUrl: r.image_url || undefined,
    universityName: r.univName || undefined,
  };
}
