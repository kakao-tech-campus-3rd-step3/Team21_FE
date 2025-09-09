import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GlobalLayout } from "@/app/layout/GlobalLayout";
import HomePage from "@/pages/home";
import { ROUTES } from "@/shared/config/routes";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
