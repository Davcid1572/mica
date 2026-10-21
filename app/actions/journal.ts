"use server";

import { redirect } from "next/navigation";
import { authedRequest } from "@/lib/api/client";
import { isMoodKey } from "@/lib/moods";
import type { JournalState } from "@/lib/types";
import { routes } from "@/lib/flow";

const OFFLINE =
  "We couldn't reach MICA just now. Check your connection and try again.";
const GENERIC =
  "Something went wrong on our side. Please try again in a moment.";
const DEV = process.env.NODE_ENV !== "production";

/** Creates a new entry, or updates one when a hidden `id` is present. */
export async function saveEntry(
  _: JournalState,
  fd: FormData,
): Promise<JournalState> {
  const id = String(fd.get("id") ?? "");
  const body = String(fd.get("body") ?? "").trim();
  const mood = String(fd.get("mood") ?? "");
  const rawPrompt = String(fd.get("promptId") ?? "");
  const values = { body, mood };

  if (!body)
    return { error: "Write a line or two. Anything at all is enough.", values };
  if (!isMoodKey(mood))
    return { error: "Pick the word that fits best right now.", values };

  const payload: Record<string, unknown> = { body, mood };
  // The docs say integer, but prompt ids are strings. Send whichever we have.
  if (rawPrompt)
    payload.promptId = /^\d+$/.test(rawPrompt) ? Number(rawPrompt) : rawPrompt;

  const r = await authedRequest(
    id ? "PATCH" : "POST",
    id ? `/journal/${encodeURIComponent(id)}` : "/journal",
    payload,
  );

  if (!r.ok) {
    const error =
      r.status === 0
        ? OFFLINE
        : r.status === 404
          ? "We couldn't find that entry any more."
          : r.status === 400
            ? DEV && r.message
              ? `The server said: ${r.message}`
              : "That didn't save. Please check it and try once more."
            : GENERIC;
    return { error, values };
  }

  redirect(id ? routes.journalEntry(id) : routes.journal);
}

export async function deleteEntry(
  id: string,
  _: JournalState,
  __: FormData,
): Promise<JournalState> {
  const r = await authedRequest("DELETE", `/journal/${encodeURIComponent(id)}`);
  if (!r.ok && r.status !== 404) {
    return { error: r.status === 0 ? OFFLINE : GENERIC };
  }
  redirect(routes.journal);
}
