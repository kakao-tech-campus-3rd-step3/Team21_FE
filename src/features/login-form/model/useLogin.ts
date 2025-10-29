import { useMutation } from "@tanstack/react-query";

import { loginApi, mapLogin } from "@/entities/user";
import { authStorage } from "@/shared/lib/authStorage";

export function useLogin(onSuccessClose?: () => void) {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res, variables) => {
      const mapped = mapLogin(res);
      if (mapped.ok && mapped.token) {
        authStorage.set({ token: mapped.token, userName: variables.userId, isAuthed: true });
        onSuccessClose?.();
      } else {
        console.warn(mapped.message);
      }
    },
    onError: (e) => console.error(e),
  });
}
