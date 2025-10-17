import type { LoginRequest } from "@/entities/user/model/login.request";
import type { LoginResponse } from "@/entities/user/model/login.response";
import type { SignupRequest } from "@/entities/user/model/signup.request";
import type { SignupResponse } from "@/entities/user/model/signup.response";
import { apiClient } from "@/shared/api/apiClient";

export async function signupApi(body: SignupRequest) {
  const { data } = await apiClient.post<SignupResponse>("/api/users/signup", body);
  return data;
}

export async function loginApi(body: LoginRequest) {
  const { data } = await apiClient.post<LoginResponse>("/api/users/login", body);
  return data;
}

export async function sendEmailCodeApi(email: string) {
  await apiClient.post<void>("/api/users/email/send-code", { email });
}

export async function verifyEmailCodeApi(email: string, code: string) {
  await apiClient.post<void>("/api/users/email/verify-code", { email, code });
}

// GET 메서드 생기면 추가
// export async function checkUserIdApi(userId: string) {
//   const res = await apiClient.get("/api/users/check-id", { params: { userId } });
//   return res.status;
// }
