import type { CollegeDetail } from "@/entities/college/model/college-detail.domain";
import type { GetCollegeDetailRequest } from "@/entities/college/model/college-detail.request";
import type { CollegeDetailResponse } from "@/entities/college/model/college-detail.response";
import { toNumberOrUndef, toUndefIfEmpty } from "@/shared/lib/string-utils";

export function toGetCollegeDetailRequest(collegeSeq: number): GetCollegeDetailRequest {
  return { collegeSeq };
}

export function mapCollegeDetailResponseToDomain(r: CollegeDetailResponse): CollegeDetail {
  return {
    id: r.collegeSeq,
    name: r.collegeName,
    students: r.collegeStudentNum ?? undefined,
    foundedYear: toNumberOrUndef(r.collegeEstablishedYear),
    tel: toUndefIfEmpty(r.collegeTel),
    homepage: toUndefIfEmpty(r.collegeHomePage),
    intro: toUndefIfEmpty(r.collegeIntro),
    professors: r.professorCount ?? undefined,
    logoUrl: toUndefIfEmpty(r.image_url),
    universityName: toUndefIfEmpty(r.univName),
  };
}
