import { useCallback } from "react";

import { authStorage } from "@/shared/lib/authStorage";

export function useLogout() {
  const logout = useCallback(() => {
    authStorage.clear();
  }, []);
  return { logout };
}
