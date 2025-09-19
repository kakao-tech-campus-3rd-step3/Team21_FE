import { useParams } from "react-router-dom";

import { contact, sideBar, univs } from "@/__MOCK__/mockData";
import cnulogo from "@/assets/cnulogo.svg";
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

export function UniversityDetailPage() {
  const { id } = useParams();
  const univSeq = Number(id);

  // TODO: api hook 또는 map 호출로 변경
  const univ = univs.find((u) => u.univSeq === univSeq);
  const stats = sideBar;
  const sideContact = contact;

  // TODO: ErrorBoundary 적용
  if (!univ) return <div className="p-6 text-center">해당 대학 정보를 찾을 수 없습니다.</div>;

  const heroData: UniversityHeroData = {
    id: univ.univSeq,
    name: univ.name,
    logoUrl: univ.univSeq === 100 ? cnulogo : univ.image,
    address: univ.address,
    foundedYear: Number(univ.year),
    rating: univ.rating,
    ratingCount: univ.ratingCount,
    students: univ.studentNum,
  };

  const sideBarData: UniversityMainInfo = {
    campuses: stats.campuses,
    colleges: stats.colleges,
    departments: stats.departments,
    students: stats.students,
  };

  const contactData: UniversitySideContact = {
    tel: sideContact.tel,
    web: sideContact.web,
    email: sideContact.email,
  };

  return (
    <main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-6 space-y-6">
      <UniversityHero data={heroData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CollegeSection univId={univSeq} />
          <UniversityReviewList univSeq={univSeq} />
        </div>

        <div className="space-y-6">
          <UniversityMainInfoSide data={sideBarData} />
          <UniversityContactSide data={contactData} />
        </div>
      </div>
    </main>
  );
}
