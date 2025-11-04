import { useMutation } from "@tanstack/react-query";

import { checkUserIdApi } from "@/entities/user";

export function useCheckUserId() {
  return useMutation({
    mutationFn: (userId: string) => checkUserIdApi(userId),
  });
}
