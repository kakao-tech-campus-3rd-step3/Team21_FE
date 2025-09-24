export type ProfessorEvalMetricKey =
  | "lecture"
  | "studentAvg"
  | "labPerf"
  | "homework"
  | "paperWork";

export const PROFESSOR_EVAL_AXES = [
  { key: "lecture", label: "강의 평점" },
  { key: "studentAvg", label: "학생 평균 성적" },
  { key: "labPerf", label: "연구실 실적" },
  { key: "homework", label: "과제량" },
  { key: "paperWork", label: "논문 실적" },
] as const;

export type ProfessorEvalRow = {
  axis: (typeof PROFESSOR_EVAL_AXES)[number]["label"];
  value: number;
  avg: number;
};
