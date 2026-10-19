"use server";

import { redirect } from "next/navigation";
import { authApi } from "@/lib/auth/api";
import { clearSession, getAccessToken, setSession } from "@/lib/auth/session";
import type { AuthState } from "@/lib/auth/types";
import { routes } from "@/lib/flow";

const text = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const OFFLINE =
  "We couldn't reach MICA just now. Check your connection and try again.";
const GENERIC =
  "Something went wrong on our side. Please try again in a moment.";

export async function signIn(_: AuthState, fd: FormData): Promise<AuthState> {
  const email = text(fd, "email");
  const password = String(fd.get("password") ?? "");
  if (!email || !password) {
    return {
      error: "Add your email and password to continue.",
      values: { email },
    };
  }

  const r = await authApi.login(email, password);
  if (!r.ok) {
    const error =
      r.status === 401
        ? "That email and password don't match. Want to try again?"
        : r.status === 403
          ? "Please open the link we emailed you to confirm your account first."
          : r.status === 0
            ? OFFLINE
            : GENERIC;
    return { error, values: { email } };
  }

  await setSession(r.data.data);
  redirect(routes.home);
}

export async function signUp(_: AuthState, fd: FormData): Promise<AuthState> {
  const name = text(fd, "name");
  const email = text(fd, "email");
  const password = String(fd.get("password") ?? "");
  const values = { name, email };

  if (!name || !email)
    return { error: "Tell us your name and email to begin.", values };
  if (password.length < 8) {
    return { error: "Choose a password with at least 8 characters.", values };
  }

  const r = await authApi.register(name, email, password);
  if (!r.ok) {
    const error =
      r.status === 400
        ? r.message || "Please check your details and try again."
        : r.status === 0
          ? OFFLINE
          : GENERIC;
    return { error, values };
  }

  redirect(`${routes.checkEmail}?email=${encodeURIComponent(email)}`);
}

export async function forgotPassword(
  _: AuthState,
  fd: FormData,
): Promise<AuthState> {
  const email = text(fd, "email");
  if (!email)
    return { error: "Add the email you signed up with.", values: { email } };

  const r = await authApi.forgotPassword(email);
  if (!r.ok && r.status === 0) return { error: OFFLINE, values: { email } };

  // Same message either way, so we never reveal which emails have accounts.
  return {
    notice: "If there's an account for that email, a reset link is on its way.",
    values: { email },
  };
}

export async function signOut() {
  const token = await getAccessToken();
  if (token) await authApi.logout(token);
  await clearSession();
  redirect(routes.signIn);
}
