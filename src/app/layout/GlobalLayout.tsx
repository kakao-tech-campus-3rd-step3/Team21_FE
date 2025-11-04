import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { BreadcrumbProvider } from "@/features/nav-trail";
import { BackgroundDecor } from "@/shared/ui/BackgroundDecor";
import { NavigationBar } from "@/widgets/navigation-bar";
import { Footer } from "@/widgets/site-footer";
import { Header } from "@/widgets/site-header";

export function GlobalLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return (
    <div className="flex flex-col min-h-screen relative text-foreground">
      <BackgroundDecor />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <BreadcrumbProvider>
          <NavigationBar />
          <main className="flex-1">
            <Outlet />
          </main>
        </BreadcrumbProvider>
        <Footer />
      </div>
    </div>
  );
}
