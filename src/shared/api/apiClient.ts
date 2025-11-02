import axios from "axios";

import { attachAuthInterceptors } from "./interceptors";

// CI 환경에서는 환경변수 사용, 프로덕션에서는 상대 경로 (Vercel 프록시)
// const baseURL = import.meta.env.VITE_API_BASE_URL || "";
const baseURL = "";

if (!baseURL) {
  console.warn("[apiClient] VITE_API_BASE_URL is not defined. Using relative URLs (Vercel proxy).");
}

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

export const apiFilesClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: false,
  headers: { "Content-Type": "multipart/form-data" },
});

const redirectToLogin = () => {
  if (location.pathname !== "/auth/login") {
    window.location.href = "/auth/login";
  }
};

attachAuthInterceptors(apiClient, { onUnauthorizedRedirect: redirectToLogin });
attachAuthInterceptors(apiFilesClient, { onUnauthorizedRedirect: redirectToLogin });

export default apiClient;
