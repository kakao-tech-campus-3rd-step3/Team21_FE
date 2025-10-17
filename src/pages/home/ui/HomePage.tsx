import { useNavigate } from "react-router-dom";

import { SearchBox } from "@/features/search-control";
import { HOME_TEXT } from "@/pages/home/text";
import { HomeFeatureCards } from "@/pages/home/ui/HomeFeatureCards";
import { ROUTES } from "@/shared/config/routes";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-4xl text-center relative">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            {HOME_TEXT.title}
          </span>
          <br />
          <span className="text-white">{HOME_TEXT.highlight}</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/70">{HOME_TEXT.subtitle}</p>
        <div className="mt-10 relative z-50">
          <SearchBox
            onSelectUniv={(u) => navigate(ROUTES.UNIVERSITY_DETAIL().replace(":id", String(u.id)))}
            onSelectProf={(p) => navigate(ROUTES.PROFESSOR_DETAIL().replace(":id", String(p.id)))}
            onSelectDept={(d) => navigate(ROUTES.DEPARTMENT_DETAIL().replace(":id", String(d.id)))}
          />
        </div>
        <HomeFeatureCards />
      </div>
    </div>
  );
}
