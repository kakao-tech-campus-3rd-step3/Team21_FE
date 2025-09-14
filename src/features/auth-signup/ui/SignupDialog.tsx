import { SignupForm } from "@/features/signup-form/ui/SignupForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoLogin: () => void;
};

export function SignupDialog({ open, onOpenChange, onGoLogin }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={[
          "sm:max-w-md w-[90%]",
          "max-h-[90vh] overflow-y-auto",
          "bg-white/5 border border-white/30 backdrop-blur-3xl",
          "rounded-2xl p-6",
        ].join(" ")}
      >
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
        </DialogHeader>
        <SignupForm onGoLogin={onGoLogin} />
      </DialogContent>
    </Dialog>
  );
}
