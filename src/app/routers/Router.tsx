import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GlobalLayout } from "@/app/layout/GlobalLayout";
import { UniversitySearchResultPage } from "@/entities/university";
import { CollegeDetailPage } from "@/pages/college";
import { CompareProfessorPage } from "@/pages/compare";
import { DepartmentDetailPage } from "@/pages/department";
import { HomePage } from "@/pages/home";
import { ProfessorDetailPage } from "@/pages/professor";
import { UniversityDetailPage } from "@/pages/university";
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
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
