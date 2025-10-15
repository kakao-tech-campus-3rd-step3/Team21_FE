import { useMutation } from "@tanstack/react-query";

import { mapSignup, signupApi } from "@/entities/user";
import { AUTH_SIGNUP_ERROR } from "@/features/signup-form/text";

export function useSignup(onSuccessGoLogin?: () => void) {
  return useMutation({
    mutationFn: signupApi,
    onSuccess: (res) => {
      const mapped = mapSignup(res);
      if (mapped.ok) onSuccessGoLogin?.();
      else console.warn(AUTH_SIGNUP_ERROR.signupFail);
    },
    onError: (e) => console.error(e),
  });
}
