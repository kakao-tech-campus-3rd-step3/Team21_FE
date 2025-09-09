import { FooterDescription } from "@/widgets/site-footer/ui/FooterDescription";
import { FooterSocialLinks } from "@/widgets/site-footer/ui/FooterSocialLinks";

export function Footer() {
  return (
    <footer className="bg-amber-400">
      <FooterDescription />
      <FooterSocialLinks />
    </footer>
  );
}
