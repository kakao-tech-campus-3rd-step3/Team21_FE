export const ROUTES = {
  HOME: "/",

  PROFESSOR_DETAIL: (id: string | number = ":id") => `/professor/${id}`,
  UNIVERSITY_DETAIL: (id: string | number = ":id") => `/university/${id}`,
  COLLEGE_DETAIL: (id: string | number = ":id") => `/college/${id}`,
  DEPARTMENT_DETAIL: (id: string | number = ":id") => `/department/${id}`,
  COMPARE_PROFESSOR: `/compare/professor`,
  COMPARE_PROF_ONE: (id: string | number = ":id") => `/compare/professor/${id}`,
  COMPARE_PROF_TWO: (a: string | number = ":a", b: string | number = ":b") =>
    `/compare/professor/${a}/${b}`,
  COMPARE_PROF_THREE: (
    a: string | number = ":a",
    b: string | number = ":b",
    c: string | number = ":c",
  ) => `/compare/professor/${a}/${b}/${c}`,
  UNIV_SEARCH_RESULT: (id: string | number = ":id") => `/search-result/university/${id}`,
  COMPARE_UNIVERSITY: `/compare/university`,
  COMPARE_UNIV_ONE: (id: string | number = ":id") => `/compare/university/${id}`,
  COMPARE_UNIV_TWO: (a: string | number = ":a", b: string | number = ":b") =>
    `/compare/university/${a}/${b}`,
  PROFESSOR_EVAL: (id: string | number = ":id") => `/professor/${id}/evaluate`,
  UNIVERSITY_EVAL: (id: string | number = ":id") => `/university/${id}/evaluate`,
  COURSE_EVAL: (lecSeq: string | number = ":lecSeq") => `/course/${lecSeq}/evaluate`,
} as const;
