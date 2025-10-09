import { searchProfessorApi } from "@/entities/professor/api";

export async function resolveProfIdByName(
  univName: string,
  profName: string,
): Promise<number | null> {
  const res = await searchProfessorApi({ keyword: profName, page: 0, size: 20 });
  const match = res.professor.find((p) => p.univName === univName && p.name === profName);
  return match ? match.profSeq : null;
}
