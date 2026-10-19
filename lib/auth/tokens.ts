export const COOKIE = { access: "mica_at", refresh: "mica_rt" } as const;

function jwtExp(token: string): number | null {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === "number" ? exp : null;
  } catch {
    return null;
  }
}

/** Cookie lives exactly as long as the JWT does. */
export function cookieOptions(token: string, fallbackSeconds: number) {
  const exp = jwtExp(token);
  const maxAge = exp
    ? Math.max(exp - Math.floor(Date.now() / 1000), 0)
    : fallbackSeconds;
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
