import axios from "axios";

import { attachAuthInterceptors } from "./interceptors";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  console.warn("[apiClient] VITE_API_BASE_URL is not defined. Requests will use relative URLs.");
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
