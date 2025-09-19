import { useMutation } from "@tanstack/react-query";

import { loginApi } from "@/features/auth/api/auth";
import { authStorage } from "@/shared/lib/authStorage";

export function useLogin(onSuccessClose?: () => void) {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data, variables) => {
      if (data.success) {
        authStorage.set({ isAuthed: true, userName: variables.userId });
        onSuccessClose?.();
      } else {
        console.warn(data.message);
      }
    },
    onError: (e) => console.error(e),
  });
}
