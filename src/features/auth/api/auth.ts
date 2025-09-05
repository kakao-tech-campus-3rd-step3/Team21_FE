import axios from "axios";

import { authStorage } from "@/shared/lib/authStorage";

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

type RefreshResponse = { accessToken: string };

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const { data } = await refreshClient.post<RefreshResponse>("/auth/refresh");
    if (data?.accessToken) {
      authStorage.setAccessToken(data.accessToken);
      return data.accessToken;
    }
    return null;
  } catch {
    return null;
  }
}
