import { Outlet } from "react-router-dom";

import { BackgroundDecor } from "@/shared/ui/BackgroundDecor";
import { NavigationBar } from "@/widgets/navigation-bar";
import { Footer } from "@/widgets/site-footer";
import { Header } from "@/widgets/site-header";

export function GlobalLayout() {
  return (
    <div className="relative min-h-screen text-foreground">
      <BackgroundDecor />
      <div className="relative z-10">
        <Header />
        <NavigationBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
