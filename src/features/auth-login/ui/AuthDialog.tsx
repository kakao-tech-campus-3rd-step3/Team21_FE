import { LoginForm } from "@/features/login-form/ui/LoginForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoSignup: () => void;
};

export function AuthDialog({ open, onOpenChange, onGoSignup }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/5 border border-white/30 backdrop-blur-3xl">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
        </DialogHeader>
        <LoginForm onGoSignup={onGoSignup} />
      </DialogContent>
    </Dialog>
  );
}
