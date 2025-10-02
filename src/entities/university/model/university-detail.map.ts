import type { UniversityDetail } from "./university-detail.domain";
import type { UniversityDetailRequest } from "./university-detail.request";
import type { UniversityDetailResponse } from "./university-detail.response";

export function toGetDetailRequest(univSeq: number): UniversityDetailRequest {
  return { univSeq };
}

export function mapDetailResponseToDomain(r: UniversityDetailResponse): UniversityDetail {
  const u = r.university;
  return {
    id: u.univSeq,
    name: u.name,
    address: u.address || undefined,
    phone: u.tel || undefined,
    homepage: u.homePage || undefined,
    logoUrl: u.image || undefined,
    foundedYear: u.establishedYear ? Number(u.establishedYear) : undefined,
    studentCount: u.totalStudent ?? undefined,
    campusCount: u.campusCnt ?? undefined,
  };
}
