import type { Professor } from "@/entities/professor/model/professors.domain";
import type { CompareProfessor } from "@/entities/professor/model/professors-compare.response";

function parseSemesterOrder(label: string): number {
  const m = /(\d)\s*학년\s*(\d)\s*학기/.exec(label);
  if (!m) return Number.MAX_SAFE_INTEGER;
  const year = Number(m[1]);
  const sem = Number(m[2]);
  return (year - 1) * 2 + (sem === 2 ? 2 : 1);
}

function toSafeFixed1(x: number | undefined) {
  return typeof x === "number" ? Number(x.toFixed(1)) : undefined;
}

function toCompactYearSemester(label: string): string {
  const ysem = /(\d{2,4})\s*(?:년|년도)?\s*[-/ ]?\s*(\d)\s*(?:학?기|기)?/.exec(label);
  if (ysem) {
    const yearStr = ysem[1];
    const sem = ysem[2];
    if (yearStr.length >= 2) {
      const yy = yearStr.slice(-2);
      return `${yy}년 ${sem}학기`;
    }
  }
  const gradeSem = /(\d)\s*학?년\s*(\d)\s*학?기/.exec(label);
  if (gradeSem) {
    const grade = Number(gradeSem[1]);
    const sem = gradeSem[2];
    const yy = String(20 + (Number.isFinite(grade) ? grade : 0));
    return `${yy}년 ${sem}학기`;
  }
  return label;
}
export function mapCompareItemToDomain(dto: CompareProfessor): Professor {
  const s = dto.scores;
  const components = [
    s.homework,
    s.lectureDifficulty,
    s.examDifficulty,
    s.theisPerformance,
    s.researchPerformance,
  ];
  const rating = Number(
    (components.reduce((sum, v) => sum + (typeof v === "number" ? v : 0), 0) / 5).toFixed(1),
  );
  const semesters = (dto.semesterDto ?? [])
    .map((s) => ({
      label: toCompactYearSemester(s.semester),
      avg: Number(s.overallAvg.toFixed(2)),
      order: parseSemesterOrder(s.semester),
    }))
    .sort((a, b) => a.order - b.order);

  return {
    id: dto.profSeq,
    name: dto.profName,
    university: dto.univName,
    department: dto.deptName,
    rating,
    homework: toSafeFixed1(dto.scores.homework),
    lecDifficulty: toSafeFixed1(dto.scores.lectureDifficulty),
    examDifficulty: toSafeFixed1(dto.scores.examDifficulty),
    researchPerf: toSafeFixed1(dto.scores.researchPerformance),
    thesisPerf: toSafeFixed1(dto.scores.theisPerformance),
    semesters,
  };
}
export const mapCompareListToDomain = (list: CompareProfessor[]) =>
  list.map(mapCompareItemToDomain);
export function buildSemesterLineChartData(professors: Professor[]) {
  const all = new Map<number, string>();
  professors.forEach((p) => (p.semesters ?? []).forEach((s) => all.set(s.order, s.label)));
  const ordered = [...all.entries()].sort((a, b) => a[0] - b[0]);
  return ordered.map(([order, label]) => {
    const row: Record<string, number | string> = { semester: label };
    professors.forEach((p) => {
      const hit = (p.semesters ?? []).find((s) => s.order === order);
      row[p.name] = typeof hit?.avg === "number" ? hit.avg : NaN;
    });
    return row;
  });
}
