import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GlobalLayout } from "@/app/layout/GlobalLayout";
import { UniversitySearchResultPage } from "@/entities/university";
import { CollegeDetailPage } from "@/pages/college";
import { CompareProfessorPage, CompareUniversityPage } from "@/pages/compare";
import { CourseEvalPage } from "@/pages/course-eval";
import { DepartmentDetailPage } from "@/pages/department";
import { HomePage } from "@/pages/home";
import { ProfessorDetailPage } from "@/pages/professor";
import { ProfessorEvalPage } from "@/pages/professor-eval";
import { UniversityDetailPage } from "@/pages/university";
import { UniversityEvalPage } from "@/pages/university-eval";
import { ROUTES } from "@/shared/config/routes";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.PROFESSOR_DETAIL(), element: <ProfessorDetailPage /> },
      { path: ROUTES.UNIVERSITY_DETAIL(), element: <UniversityDetailPage /> },
      { path: ROUTES.COLLEGE_DETAIL(), element: <CollegeDetailPage /> },
      { path: ROUTES.DEPARTMENT_DETAIL(), element: <DepartmentDetailPage /> },
      { path: ROUTES.COMPARE_PROFESSOR(), element: <CompareProfessorPage /> },
      { path: ROUTES.UNIV_SEARCH_RESULT(), element: <UniversitySearchResultPage /> },
      { path: ROUTES.COMPARE_UNIVERSITY(), element: <CompareUniversityPage /> },
      { path: ROUTES.PROFESSOR_EVAL(), element: <ProfessorEvalPage /> },
      { path: ROUTES.UNIVERSITY_EVAL(), element: <UniversityEvalPage /> },
      { path: ROUTES.COURSE_EVAL(), element: <CourseEvalPage /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
