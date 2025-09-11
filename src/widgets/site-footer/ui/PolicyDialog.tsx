import { ScrollText, Shield } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import privacyMD from "@/assets/privacy.md?raw";
import termsMD from "@/assets/terms.md?raw";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { ScrollArea } from "@/shared/ui/scroll-area";

export type PolicyKey = "privacy" | "terms";

type Props = {
  type: PolicyKey | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PolicyDialog({ type, open, onOpenChange }: Props) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "개인정보처리방침" : type === "terms" ? "이용약관" : "";
  const body = isPrivacy ? privacyMD : termsMD;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className={cn(
          "sm:max-w-3xl rounded-2xl bg-zinc-900/95 border border-zinc-700 shadow-2xl backdrop-blur-md ring-1 ring-white/5",
          "[&_button]:opacity-100 [&_button_svg]:text-white [&_button_svg]:h-6 [&_button_svg]:w-6",
        )}
      >
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-xl ring-1 ring-inset ring-white/10",
                isPrivacy ? "bg-sky-500/15 text-sky-300" : "bg-emerald-500/15 text-emerald-300",
              )}
              aria-hidden
            >
              {isPrivacy ? <Shield className="h-4 w-4" /> : <ScrollText className="h-4 w-4" />}
            </span>
            <DialogTitle className="text-base font-semibold tracking-tight text-white">
              {title}
            </DialogTitle>
          </div>
          <div className="h-px w-full bg-white/10" />
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-3">
          <div
            className={cn(
              "prose prose-sm max-w-none prose-invert",
              "prose-headings:text-white prose-strong:text-white prose-a:text-sky-300",
              "prose-li:marker:text-white prose-p:text-zinc-100",
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
