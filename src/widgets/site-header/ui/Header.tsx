import { HeaderLogin } from "@/widgets/site-header/ui/HeaderLogin";
import { HeaderSearch } from "@/widgets/site-header/ui/HeaderSearch";

export function Header() {
  return (
    <footer className="bg-amber-400">
      <HeaderLogin />
      <HeaderSearch />
    </footer>
  );
}
