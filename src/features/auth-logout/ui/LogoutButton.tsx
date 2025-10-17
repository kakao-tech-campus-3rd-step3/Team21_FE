import { useLogout } from "@/features/auth-logout/model/useLogout";
import { Button } from "@/shared/ui/button";

type Props = {
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

export function LogoutButton({ className, size = "sm", variant = "outline" }: Props) {
  const { logout } = useLogout();

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={logout}
      aria-label="로그아웃"
      title="로그아웃"
    >
      로그아웃
    </Button>
  );
}
