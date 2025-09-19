import { apiClient } from "@/shared/api/apiClient";

type LoginReq = { userId: string; password: string };
type LoginRes = { success: boolean; message: string };

type SignupReq = { email: string; userId: string; password: string };
type SignupRes = { success: boolean };

export async function loginApi(body: LoginReq) {
  const res = await apiClient.post<LoginRes>("/api/users/login", body, {
    // 토큰 응답 추가 시 authStorage.set({ token }) + apiClient 인터셉터에서 자동 부착하도록 확장
    // headers: { Authorization: `Bearer ${authStorage.get().token ?? ""}` },
  });
  return res.data;
}

export async function signupApi(body: SignupReq) {
  const res = await apiClient.post<SignupRes>("/api/users/signup", body, {
    // headers: { Authorization: `Bearer ${authStorage.get().token ?? ""}` },
  });
  return res.data;
}
