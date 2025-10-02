import type { CollegeDetail } from "./college-detail.domain";
import type { GetCollegeDetailRequest } from "./college-detail.request";
import type { CollegeDetailResponse } from "./college-detail.response";

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
  };
}
