import { useMutation } from "@tanstack/react-query";

import { sendEmailCodeApi, verifyEmailCodeApi } from "@/entities/user";

export function useSendEmailCode() {
  return useMutation({
    mutationFn: (email: string) => sendEmailCodeApi(email),
  });
}

export function useVerifyEmailCode() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyEmailCodeApi(email, code),
  });
}
