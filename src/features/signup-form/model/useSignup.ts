import { useMutation } from "@tanstack/react-query";

import { signupApi } from "@/features/auth/api/auth";
import { AUTH_SIGNUP_ERROR } from "@/features/signup-form/text";

export function useSignup(onSuccessGoLogin?: () => void) {
  return useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      if (data.success) onSuccessGoLogin?.();
      else console.warn(AUTH_SIGNUP_ERROR.signupFail);
    },
    onError: (e) => console.error(e),
  });
}
