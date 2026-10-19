import { cookies } from "next/headers";
import { COOKIE } from "./tokens";

export type SessionUser = { id?: string; name?: string; email?: string };

export async function getCurrentUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE.access)?.value ?? jar.get(COOKIE.refresh)?.value;
  if (!token) return null;
  try {
    const p = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString(),
    );
    return { id: p.sub ?? p.id, name: p.name, email: p.email };
  } catch {
    return null;
  }
}
