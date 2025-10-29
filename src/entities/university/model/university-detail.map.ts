import type { UniversityDetail } from "@/entities/university/model/university-detail.domain";
import type { UniversityDetailRequest } from "@/entities/university/model/university-detail.request";
import type { UniversityDetailResponse } from "@/entities/university/model/university-detail.response";

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
    collegeCount: u.collegeCount ?? undefined,
    departmentCount: u.departmentCount ?? undefined,
    averageRating: u.averageRating ? Number(u.averageRating) : undefined,
    reviewCount: u.reviewCount ?? undefined,
  };
}
