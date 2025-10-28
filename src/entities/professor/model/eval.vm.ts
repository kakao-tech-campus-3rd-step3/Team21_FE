export type ProfessorEvalMetricKey =
  | "thesisPerformance"
  | "researchPerformance"
  | "homework"
  | "lectureDifficulty"
  | "examDifficulty";

export const PROFESSOR_EVAL_AXES = [
  { key: "thesisPerformance", label: "논문 실적" },
  { key: "researchPerformance", label: "연구 실적" },
  { key: "homework", label: "과제량" },
  { key: "lectureDifficulty", label: "강의 난이도" },
  { key: "examDifficulty", label: "시험 난이도" },
] as const;

export type ProfessorEvalRow = {
  axis: (typeof PROFESSOR_EVAL_AXES)[number]["label"];
  value: number;
  avg: number;
};
