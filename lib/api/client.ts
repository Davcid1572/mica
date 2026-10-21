import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import type { ApiResult } from "@/lib/auth/api";

const BASE = process.env.MICA_API_URL ?? "https://mica-backend.fly.dev";

export async function authedGet<T>(path: string): Promise<ApiResult<T>> {
  const token = await getAccessToken();
  if (!token) redirect("/session-expired");

  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (res.status === 401) redirect("/session-expired");
    const payload = await res.json().catch(() => null);
    if (!res.ok) return { ok: false, status: res.status, message: "" };
    return { ok: true, data: payload as T };
  } catch (e) {
    // redirect() throws a control-flow error; let it through.
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { ok: false, status: 0, message: "" };
  }
}
