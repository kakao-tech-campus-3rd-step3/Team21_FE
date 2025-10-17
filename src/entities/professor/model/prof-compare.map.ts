import type { Professor } from "@/entities/professor/model/professors.domain";
import type { CompareProfessor } from "@/entities/professor/model/professors-compare.response";

function parseSemesterOrder(label: string): number {
  const m = /(\d)\s*학년\s*(\d)\s*학기/.exec(label);
  if (!m) return Number.MAX_SAFE_INTEGER;
  const year = Number(m[1]);
  const sem = Number(m[2]);
  return (year - 1) * 2 + (sem === 2 ? 2 : 1);
}

function to1(x: number | undefined) {
  return typeof x === "number" ? Number(x.toFixed(1)) : undefined;
}

export function mapCompareItemToDomain(dto: CompareProfessor): Professor {
  const thesis = dto.scores.theisPerformance;
  const research = dto.scores.researchPerformance;
  const rating = Number((((thesis ?? 0) + (research ?? 0)) / 2).toFixed(1));

  const semesters = (dto.semesterDto ?? [])
    .map((s) => ({
      label: s.semester,
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
    homework: to1(dto.scores.homework),
    lecDifficulty: to1(dto.scores.lectureDifficulty),
    examDifficulty: to1(dto.scores.examDifficulty),
    researchPerf: to1(dto.scores.researchPerformance),
    thesisPerf: to1(dto.scores.theisPerformance),
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
