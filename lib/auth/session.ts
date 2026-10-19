import { cookies } from "next/headers";
import { COOKIE, cookieOptions } from "./tokens";
import type { Tokens } from "./types";

export async function setSession(t: Tokens) {
  const jar = await cookies();
  jar.set(
    COOKIE.access,
    t.access_token,
    cookieOptions(t.access_token, 15 * 60),
  );
  jar.set(
    COOKIE.refresh,
    t.refresh_token,
    cookieOptions(t.refresh_token, 60 * 60 * 24 * 30),
  );
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE.access);
  jar.delete(COOKIE.refresh);
}

export async function getAccessToken() {
  return (await cookies()).get(COOKIE.access)?.value;
}
