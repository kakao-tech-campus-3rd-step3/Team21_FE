import { LoginForm } from "@/features/login-form/ui/LoginForm";
import { cn } from "@/shared/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoSignup: () => void;
};

export function AuthDialog({ open, onOpenChange, onGoSignup }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent
        className={cn(
          "sm:max-w-md w-[90%]",
          "max-h-[90vh] overflow-y-auto",
          "bg-white/5 border border-white/30 backdrop-blur-3xl",
          "rounded-2xl p-6",
        )}
      >
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
        </DialogHeader>
        <LoginForm onGoSignup={onGoSignup} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
