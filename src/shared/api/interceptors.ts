import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";

import { authStorage } from "@/shared/lib/authStorage";

type RefreshFn = () => Promise<string | null>;

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

function onRefreshed(token: string | null) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

function addToQueue(cb: (token: string | null) => void) {
  refreshQueue.push(cb);
}

function setAuthHeader(config: AxiosRequestConfig, token: string) {
  const headers: AxiosRequestHeaders = (config.headers ?? {}) as AxiosRequestHeaders;
  headers.Authorization = `Bearer ${token}`;
  config.headers = headers;
}

type AttachOptions = {
  onUnauthorizedRedirect?: () => void;
  refreshAccessToken?: RefreshFn;
};

export function attachAuthInterceptors(client: AxiosInstance, opts: AttachOptions = {}) {
  const { onUnauthorizedRedirect, refreshAccessToken } = opts;

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = authStorage.getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | (AxiosRequestConfig & { _retry?: boolean })
        | undefined;

      if (!originalRequest || !error.response) {
        return Promise.reject(error);
      }

      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      if (!refreshAccessToken) {
        authStorage.clear();
        onUnauthorizedRedirect?.();
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        authStorage.clear();
        onUnauthorizedRedirect?.();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addToQueue((newToken) => {
            if (!newToken) {
              authStorage.clear();
              onUnauthorizedRedirect?.();
              reject(error);
              return;
            }
            setAuthHeader(originalRequest, newToken);
            resolve(client(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newToken);

        if (!newToken) {
          authStorage.clear();
          onUnauthorizedRedirect?.();
          return Promise.reject(error);
        }

        client.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        setAuthHeader(originalRequest, newToken);
        return client(originalRequest);
      } catch (e) {
        isRefreshing = false;
        onRefreshed(null);
        authStorage.clear();
        onUnauthorizedRedirect?.();
        return Promise.reject(e);
      }
    },
  );
}
