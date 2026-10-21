import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, cookieOptions } from "@/lib/auth/tokens";

const API = process.env.MICA_API_URL ?? "https://mica-backend.fly.dev";
const PUBLIC = [
  "/",
  "/onboarding",
  "/sign-up",
  "/sign-in",
  "/forgot-password",
  "/reset-password",
  "/check-email",
  "/session-expired",
];
const GUEST_ONLY = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const access = req.cookies.get(COOKIE.access)?.value;
  const refresh = req.cookies.get(COOKIE.refresh)?.value;
  const to = (path: string) => NextResponse.redirect(new URL(path, req.url));

  if (PUBLIC.includes(pathname)) {
    return refresh && GUEST_ONLY.includes(pathname)
      ? to("/home")
      : NextResponse.next();
  }

  if (access) return NextResponse.next();
  if (!refresh) return to("/sign-in");

  // Access token expired: trade the refresh token for a new pair.
  try {
    const res = await fetch(`${API}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    });
    if (!res.ok) throw new Error("refresh failed");
    const { data } = await res.json();

    // Server components in THIS request can't see cookies set on the response,
    // so forward the new access token on a request header as well.
    const headers = new Headers(req.headers);
    headers.set("x-mica-access", data.access_token);
    const next = NextResponse.next({ request: { headers } });
    next.cookies.set(
      COOKIE.access,
      data.access_token,
      cookieOptions(data.access_token, 15 * 60),
    );
    next.cookies.set(
      COOKIE.refresh,
      data.refresh_token,
      cookieOptions(data.refresh_token, 60 * 60 * 24 * 30),
    );
    return next;
  } catch {
    const out = to("/sign-in");
    out.cookies.delete(COOKIE.access);
    out.cookies.delete(COOKIE.refresh);
    return out;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|.*\\..*).*)"],
};
