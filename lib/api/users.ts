import { cache } from "react";
import { authedGet } from "./client";

export type Profile = {
  name: string;
  email: string;
  avatarUrl: string | null;
  joinedAt: string;
  streakDays: number;
};

/** Cached per request, so layout + page share one call. Null if the backend is unreachable. */
export const getProfile = cache(async (): Promise<Profile | null> => {
  const r = await authedGet<{ success: boolean; data: Profile }>("/users/me");
  return r.ok ? r.data.data : null;
});
