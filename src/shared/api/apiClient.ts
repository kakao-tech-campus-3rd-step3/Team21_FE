import axios from "axios";

import { attachAuthInterceptors } from "./interceptors";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const apiFilesClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
});

const redirectToLogin = () => {
  if (location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

attachAuthInterceptors(apiClient, redirectToLogin);
attachAuthInterceptors(apiFilesClient, redirectToLogin);

export default apiClient;
