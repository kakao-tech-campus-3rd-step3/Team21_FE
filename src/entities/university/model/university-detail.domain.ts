/**
 * NOTE:
 * 도메인 모델을 정의합니다.
 * api 요청에 대한 응답은 ~~Response 로 따로 정의합니다.
 * Response -> 도메인 모델 -> 뷰 모델
 *
 * 서버 스키마를 그대로 받는건 ~~Response
 * 프론트엔드의 도메인 스키마는 university-detail
 * 특정 섹션에서만 사용하는 데이터는 뷰 모델
 */

export type UniversityKeyStats = {
  campuses: number;
  colleges: number;
  departments: number;
  students: number;
};

export type UniversityContact = {
  tel?: string;
  website?: string;
  email?: string;
  address?: string;
};

export type UniversityReview = {
  id: string | number;
  nickname: string;
  rating: number;
  date: string;
  content: string;
  tags?: string[];
  likes?: number;
};

export type UniversityBriefCollege = {
  name: string;
  desc?: string;
  majorsCount?: number;
  noteRight?: string;
};

export type UniversityDetail = {
  id: string | number;
  name: string;
  logoUrl?: string;
  address?: string;
  avgTuition?: string;
  foundedYear?: number;
  rating?: number;
  ratingCount?: number;

  keyStats: UniversityKeyStats;
  contact: UniversityContact;

  colleges: UniversityBriefCollege[];
  reviews: UniversityReview[];
};
