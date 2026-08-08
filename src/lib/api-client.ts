import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { paths } from "@/config/paths";
import { useNotifications } from "@/components/notifications/notifications-store";

export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  return config;
}

api.interceptors.request.use(authRequestInterceptor);

let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = async (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/users/refresh")
      .then(() => {})
      .catch((error) => {
        if (error.response?.status === 401) {
          redirectToLogin();
        }
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const redirectToLogin = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const redirectTo = searchParams.get("redirectTo") || window.location.pathname;

  window.location.href = paths.auth.login.getHref(redirectTo);
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

api.interceptors.response.use(
  (response) => response.data,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    const isUnauthorized = error.response?.status === 401;

    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");

    if (
      isUnauthorized &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        return api(originalRequest);
      } catch {
        redirectToLogin();
      }
    }

    const message =
      error.response?.data &&
      typeof error.response.data === "object" &&
      "detail" in error.response.data
        ? String(error.response.data.detail)
        : error.message;

    useNotifications.getState().addNotification({
      type: "error",
      title: "Error",
      message,
    });

    return Promise.reject(error);
  },
);
