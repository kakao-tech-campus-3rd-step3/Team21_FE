import type { College } from "@/entities/college/model/college.domain";
import type { CollegesRequest } from "@/entities/college/model/college-list.request";
import type { CollegeListResponse } from "@/entities/college/model/college-list.response";

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
