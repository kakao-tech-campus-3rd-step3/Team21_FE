import type { SignupResponse } from "@/entities/user/model/signup.response";

export function mapSignup(res: SignupResponse) {
  return { ok: true, message: res.message } as const;
}
