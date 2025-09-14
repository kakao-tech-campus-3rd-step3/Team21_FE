import { useAuthFlow } from "@/features/auth-login/model/useAuthFlow";
import { AuthDialog } from "@/features/auth-login/ui/AuthDialog";
import { SignupDialog } from "@/features/auth-signup/ui/SignupDialog";
import { Button } from "@/shared/ui/button";

type Props = { isAuthed?: boolean; userName?: string };

export default function AuthGate({ isAuthed, userName }: Props) {
  const { loginOpen, signupOpen, openLogin, closeLogin, closeSignup, goSignup, goLogin } =
    useAuthFlow();

  if (!isAuthed) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="h-9 border-cyan-300/60 text-zinc-50"
          onClick={openLogin}
        >
          로그인
        </Button>

        <AuthDialog
          open={loginOpen}
          onOpenChange={(v) => (v ? openLogin() : closeLogin())}
          onGoSignup={goSignup}
        />

        <SignupDialog
          open={signupOpen}
          onOpenChange={(v) => (v ? goSignup() : closeSignup())}
          onGoLogin={goLogin}
        />
      </div>
    );
  }

  return <div className="text-sm text-zinc-200">{userName} 님</div>;
}
