import { univReviews, univs, univTags } from "@/__MOCK__/mockData";
import type { University } from "@/entities/university/model/university";
import { getAverage } from "@/shared/lib/getAverage";

export const mapUnivToUniversity = (univSeq: number): University | null => {
  const univ = univs.find((u) => u.univSeq === univSeq);
  if (!univ) return null;

  //해당 대학 리뷰 가져오기
  const reviews = univReviews.filter((r) => r.univSeq === univSeq);

  //각 항목 평균
  const avgFood = getAverage(reviews.map((r) => r.food));
  const avgDorm = getAverage(reviews.map((r) => r.dorm));
  const avgConv = getAverage(reviews.map((r) => r.conv));
  const avgCampus = getAverage(reviews.map((r) => r.campus));
  const avgOverall = getAverage(reviews.map((r) => r.overall));

  const tags = univTags[univSeq] ?? [];

  return {
    id: univ.univSeq,
    name: univ.name,
    address: univ.address,
    tel: univ.tel,
    homePage: univ.homePage,
    image: univ.image,
    year: univ.year,
    studentNum: univ.studentNum,
    rating: parseFloat(avgOverall.toFixed(1)),
    tags,
    food: parseFloat(avgFood.toFixed(1)),
    dorm: parseFloat(avgDorm.toFixed(1)),
    conv: parseFloat(avgConv.toFixed(1)),
    campus: parseFloat(avgCampus.toFixed(1)),
  };
};
