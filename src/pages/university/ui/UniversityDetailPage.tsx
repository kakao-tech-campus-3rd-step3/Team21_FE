import { useParams } from "react-router-dom";

import { CollegeSection } from "@/entities/college/ui/CollegeSection";
import {
  UniversityContactSide,
  UniversityHero,
  UniversityMainInfoSide,
  UniversityReviewList,
} from "@/entities/university";
import type { UniversityHeroData } from "@/entities/university/model/hero.vm";
import type { UniversitySideContact } from "@/entities/university/model/university-contact.vm";
import type { UniversityMainInfo } from "@/entities/university/model/university-maininfo.vm";

import { useUniversityDetail } from "@/entities/university/hooks/useUniversityDetail";

export function UniversityDetailPage() {
  const { id } = useParams();
  const univSeq = Number(id);

  const { data, isLoading, isError } = useUniversityDetail(univSeq);

  if (!Number.isFinite(univSeq)) {
    return <div className="p-6 text-center">잘못된 접근입니다.</div>;
  }
  if (isLoading) {
    return <div className="p-6 text-center">불러오는 중…</div>;
  }
  if (isError || !data) {
    return <div className="p-6 text-center">해당 대학 정보를 불러오지 못했습니다.</div>;
  }

  const heroData: UniversityHeroData = {
    id: data.id,
    name: data.name,
    logoUrl: data.logoUrl ?? "", // API
    address: data.address ?? "",
    foundedYear: data.foundedYear ?? 0,
    rating: 0, // API에 없음 → 임시 0
    ratingCount: 0, // API에 없음 → 임시 0
    students: data.studentCount ?? 0,
  };

  const sideBarData: UniversityMainInfo = {
    campuses: data.campusCount ?? 0,
    colleges: 0, // API에 없음 → 임시 0 (추후 연동)
    departments: 0, // API에 없음 → 임시 0 (추후 연동)
    students: data.studentCount ?? 0,
  };

  const contactData: UniversitySideContact = {
    tel: data.phone ?? "",
    web: data.homepage ?? "",
    email: "", // API에 없음
  };

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <UniversityHero data={heroData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CollegeSection univId={data.id} />
          <UniversityReviewList univSeq={data.id} />
        </div>

        <div className="space-y-6">
          <UniversityMainInfoSide data={sideBarData} />
          <UniversityContactSide data={contactData} />
        </div>
      </div>
    </main>
  );
}
