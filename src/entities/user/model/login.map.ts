import type { LoginResponse } from "@/entities/user/model/login.response";

export function mapLogin(res: LoginResponse) {
  const ok = !!res.data?.accessToken;
  return {
    ok,
    token: res.data?.accessToken ?? null,
    userSeq: res.data?.userSeq ?? null,
    userId: res.data?.userId ?? null,
    message: res.message,
  } as const;
}
