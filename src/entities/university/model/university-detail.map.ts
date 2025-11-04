import type { UniversityDetail } from "@/entities/university/model/university-detail.domain";
import type { UniversityDetailRequest } from "@/entities/university/model/university-detail.request";
import type { UniversityDetailResponse } from "@/entities/university/model/university-detail.response";
import { toNumberOrUndef, toUndefIfEmpty } from "@/shared/lib/string-utils";

export function toGetDetailRequest(univSeq: number): UniversityDetailRequest {
  return { univSeq };
}

export function mapDetailResponseToDomain(r: UniversityDetailResponse): UniversityDetail {
  const u = r.university;
  return {
    id: u.univSeq,
    name: u.name,
    address: toUndefIfEmpty(u.address),
    phone: toUndefIfEmpty(u.tel),
    homepage: toUndefIfEmpty(u.homePage),
    logoUrl: toUndefIfEmpty(u.image),
    foundedYear: toNumberOrUndef(u.establishedYear),
    studentCount: u.totalStudent ?? undefined,
    campusCount: u.campusCnt ?? undefined,
    collegeCount: u.collegeCount ?? undefined,
    departmentCount: u.departmentCount ?? undefined,
    averageRating: toNumberOrUndef(u.averageRating),
    reviewCount: u.reviewCount ?? undefined,
  };
}
