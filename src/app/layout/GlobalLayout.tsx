import { Outlet } from "react-router-dom";

import { NavigationBar } from "@/widgets/navigation-bar";
import { Footer } from "@/widgets/site-footer";
import { Header } from "@/widgets/site-header";

export function GlobalLayout() {
  return (
    <>
      <Header />
      <NavigationBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
