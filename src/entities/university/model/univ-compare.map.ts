import type {
  UniversityApi,
  UniversityTrendApi,
} from "@/entities/university/model/univ-compare.response";
import type {
  University,
  UniversityTrendRow,
} from "@/entities/university/model/university-compare.domain";

export function mapUniversityFromResponse(u: UniversityApi): University {
  const { foodAvg, dormitoryAvg, convenienceAvg, campusAvg, welfareAvg } = u.scores;
  const rating = (foodAvg + dormitoryAvg + convenienceAvg + campusAvg + welfareAvg) / 5;

  return {
    id: u.univSeq,
    name: u.univName,
    address: u.address,
    tel: u.tel,
    food: foodAvg,
    dorm: dormitoryAvg,
    conv: convenienceAvg,
    campus: campusAvg,
    welfare: welfareAvg,
    rating,
  };
}

export function mapTrendsToRows(
  trendApi: UniversityTrendApi,
  u1Seq?: number,
  u2Seq?: number,
): UniversityTrendRow[] {
  return trendApi.trends.map((t) => {
    const u1 = u1Seq ? (t.scores.find((s) => s.univSeq === u1Seq)?.averageScore ?? 0) : 0;
    const u2 = u2Seq ? (t.scores.find((s) => s.univSeq === u2Seq)?.averageScore ?? 0) : undefined;
    return { year: String(t.year), u1, ...(u2Seq ? { u2 } : {}) };
  });
}
