import { Outlet } from "react-router-dom";

import { Footer } from "@/widgets/site-footer";
import { Header } from "@/widgets/site-header";

export function GlobalLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
