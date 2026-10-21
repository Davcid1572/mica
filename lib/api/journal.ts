import { cache } from "react";
import type { JournalEntry, JournalPrompt } from "@/lib/types";
import { getMood } from "@/lib/moods";
import { authedGet } from "./client";

type RawEntry = {
  id: string;
  body: string;
  mood: string;
  createdAt: string;
  updatedAt: string;
};

const toEntry = (r: RawEntry): JournalEntry => ({
  id: r.id,
  body: r.body,
  mood: getMood(r.mood)?.key,
  createdAt: r.createdAt,
  updatedAt: r.updatedAt,
});

export const PAGE_SIZE = 10;

/** null = couldn't load. The API returns no total, so a full page means "maybe more". */
export async function getEntries(page = 1): Promise<JournalEntry[] | null> {
  const r = await authedGet<{ data: RawEntry[] }>(
    `/journal?page=${page}&limit=${PAGE_SIZE}`,
  );
  if (!r.ok) return null;
  return r.data.data
    .map(toEntry)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export const getEntry = cache(
  async (
    id: string,
  ): Promise<{ entry: JournalEntry | null; failed: boolean }> => {
    const r = await authedGet<{ data: RawEntry }>(
      `/journal/${encodeURIComponent(id)}`,
    );
    if (r.ok) return { entry: toEntry(r.data.data), failed: false };
    return { entry: null, failed: r.status !== 404 };
  },
);

export const getTodayPrompt = cache(async (): Promise<JournalPrompt | null> => {
  const r = await authedGet<{ data: JournalPrompt[] }>("/journal/prompt");
  if (!r.ok) return null;
  return r.data.data[0] ?? null;
});
