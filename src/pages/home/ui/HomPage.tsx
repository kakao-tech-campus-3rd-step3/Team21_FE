import { SearchBox } from "@/features/search-control";
import { HomeFeatureCards } from "@/pages/home/ui/HomeFeatureCards";

import { homeText } from "../text";

export function HomePage() {
  return (
    <div className="flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            {homeText.title}
          </span>
          <br />
          <span className="text-white">{homeText.highlight}</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/70">{homeText.subtitle}</p>

        <div className="mt-10">
          <SearchBox placeholder={homeText.search.placeholder} />
        </div>
        <HomeFeatureCards />
      </div>
    </div>
  );
}
