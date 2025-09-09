import { Outlet } from "react-router-dom";

import { Footer } from "@/widgets/site-footer";

export function GlobalLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
