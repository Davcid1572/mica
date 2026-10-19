"use server";

import { redirect } from "next/navigation";
import { authApi } from "@/lib/auth/api";
import { PASSWORD_MIN, signUpMessage } from "@/lib/auth/rules";
import { clearSession, getAccessToken, setSession } from "@/lib/auth/session";
import type { AuthState } from "@/lib/auth/types";
import { routes } from "@/lib/flow";

const text = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const OFFLINE =
  "We couldn't reach MICA just now. Check your connection and try again.";
const GENERIC =
  "Something went wrong on our side. Please try again in a moment.";
const BAD_EMAIL = "That email doesn't look quite right. Mind checking it?";

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
      r.status === 400
        ? BAD_EMAIL
        : r.status === 401 || r.status === 403
          ? "That email and password don't match, or your email isn't confirmed yet. Check your inbox for our link."
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
  if (password.length < PASSWORD_MIN) {
    return {
      error: `Choose a password with at least ${PASSWORD_MIN} characters.`,
      values,
    };
  }

  const r = await authApi.register(name, email, password);
  if (!r.ok) {
    const error =
      r.status === 409
        ? "There's already an account with that email. Want to sign in instead?"
        : r.status === 400
          ? signUpMessage(r.message)
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
  if (!r.ok && r.status === 400) return { error: BAD_EMAIL, values: { email } };

  // Same message either way, so we never reveal which emails have accounts.
  return {
    notice: "If there's an account for that email, a reset link is on its way.",
    values: { email },
  };
}

export async function resetPassword(
  _: AuthState,
  fd: FormData,
): Promise<AuthState> {
  const email = text(fd, "email");
  const token = text(fd, "token");
  const newPassword = String(fd.get("newPassword") ?? "");
  const confirmPassword = String(fd.get("confirmPassword") ?? "");

  if (newPassword.length < PASSWORD_MIN) {
    return {
      error: `Choose a password with at least ${PASSWORD_MIN} characters.`,
    };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Those two passwords don't match yet." };
  }

  const r = await authApi.resetPassword(
    email,
    token,
    newPassword,
    confirmPassword,
  );
  if (!r.ok) {
    return {
      error:
        r.status === 400
          ? "This link has expired or was already used. You can ask for a new one."
          : r.status === 0
            ? OFFLINE
            : GENERIC,
    };
  }
  redirect(`${routes.signIn}?reset=1`);
}

export async function signOut() {
  const token = await getAccessToken();
  await clearSession();
  if (token) await authApi.logout(token);
  redirect(routes.signIn);
}
