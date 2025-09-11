import { Link } from "react-router";

import { Button } from "@/shared/ui/button";

type Props = { isAuthed?: boolean; userName?: string };

export default function AuthGate({ isAuthed, userName }: Props) {
  if (!isAuthed) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/auth/login">
          <Button variant="outline" className="h-9 border-cyan-300/60 text-zinc-50">
            로그인
          </Button>
        </Link>
      </div>
    );
  }

  return <div className="text-sm text-zinc-200">{userName} 님</div>;
}
