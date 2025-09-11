import { Outlet } from "react-router-dom";

import { NavigationBar } from "@/widgets/navigation-bar";
import { Footer } from "@/widgets/site-footer";
import { Header } from "@/widgets/site-header";

export function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-foreground">
      <Header />
      <NavigationBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
