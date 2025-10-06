export const ROUTES = {
  HOME: "/",

  PROFESSOR_DETAIL: (id: string | number = ":id") => `/professor/${id}`,
  UNIVERSITY_DETAIL: (id: string | number = ":id") => `/university/${id}`,
  COLLEGE_DETAIL: (id: string | number = ":id") => `/college/${id}`,
  DEPARTMENT_DETAIL: (id: string | number = ":id") => `/department/${id}`,
  COMPARE_PROFESSOR: (id: string | number = ":id") => `/compare/professor/${id}`,
  UNIV_SEARCH_RESULT: (id: string | number = ":id") => `/search-result/university/${id}`,
  COMPARE_UNIVERSITY: (id: string | number = ":id") => `/compare/university/${id}`,
  PROFESSOR_EVAL: (id: string | number = ":id") => `/professor/${id}/evaluate`,
  UNIVERSITY_EVAL: (id: string | number = ":id") => `/university/${id}/evaluate`,
  COURSE_EVAL: (lecSeq: string | number = ":lecSeq") => `/course/${lecSeq}/evaluate`,
} as const;
