import { Separator } from "@/shared/ui/separator";
import { FOOTER_TEXT } from "@/widgets/site-footer/text";
import { FooterBrand } from "@/widgets/site-footer/ui/FooterBrand";
import { FooterCommunity } from "@/widgets/site-footer/ui/FooterCommunity";
import { FooterFeatures } from "@/widgets/site-footer/ui/FooterFeatures";
import { FooterSocialLinks } from "@/widgets/site-footer/ui/FooterSocialLinks";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950">
      <Separator className="bg-zinc-800/60" />

      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="grid gap-10 py-10 md:grid-cols-3">
          <FooterBrand />
          <FooterFeatures />
          <FooterCommunity />
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <Separator className="bg-zinc-800/60" />
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">{FOOTER_TEXT.bottom.copyright}</p>
            <p className="text-muted-foreground">{FOOTER_TEXT.bottom.disclaimer}</p>
          </div>
          <FooterSocialLinks />
        </div>
      </div>
    </footer>
  );
}
