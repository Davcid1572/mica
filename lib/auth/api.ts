import type { Tokens } from "./types";

const BASE = process.env.MICA_API_URL ?? "https://mica-backend.fly.dev";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string }; // status 0 = network failure

async function request<T>(
  path: string,
  init: { form?: Record<string, string>; token?: string },
): Promise<ApiResult<T>> {
  try {
    const headers: Record<string, string> = {};
    let body: BodyInit | undefined;
    if (init.form) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      body = new URLSearchParams(init.form);
    }
    if (init.token) headers.Authorization = `Bearer ${init.token}`;

    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });
    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      const m = payload?.message;
      const message = Array.isArray(m)
        ? m.join("; ")
        : typeof m === "string"
          ? m
          : "";
      return { ok: false, status: res.status, message };
    }
    return { ok: true, data: payload as T };
  } catch {
    return { ok: false, status: 0, message: "" };
  }
}

export const authApi = {
  register: (name: string, email: string, password: string) =>
    request<{ success: boolean; message: string }>("/auth/register", {
      form: { name, email, password },
    }),
  login: (email: string, password: string) =>
    request<{ success: boolean; data: Tokens }>("/auth/login", {
      form: { email, password },
    }),
  forgotPassword: (email: string) =>
    request<{ success: boolean; message: string }>("/auth/forgot-password", {
      form: { email },
    }),
  logout: (token: string) =>
    request<unknown>("/auth/logout", { form: {}, token }),
  resetPassword: (
    email: string,
    token: string,
    newPassword: string,
    confirmPassword: string,
  ) =>
    request<{ success: boolean; message: string }>("/auth/reset-password", {
      form: { email, token, newPassword, confirmPassword },
    }),
};
