import type { CollegesRequest } from "./college-list.request";
import type { CollegeListResponse } from "./college-list.response";
import type { College } from "./college.domain";

export function toGetCollegesRequest(univSeq: number): CollegesRequest {
  return { univSeq };
}

export function mapCollegeListResponseToDomain(r: CollegeListResponse): College[] {
  return (r.colleges ?? []).map((c) => ({
    id: c.collegeSeq,
    name: c.collegeName,
    departmentCount: c.departmentCount,
    intro: c.collegeIntro,
  }));
}
