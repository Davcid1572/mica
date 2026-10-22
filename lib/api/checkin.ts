import { cache } from "react";
import type { MicaLayer } from "@/lib/types";
import { getMood } from "@/lib/moods";
import { authedGet } from "./client";

type RawLayer = {
  id: string;
  emotion: string;
  noteSnippet: string;
  date: string;
};

/** Newest first. Colours come from OUR mood palette, not the backend's. Null = couldn't load. */
export const getLayers = cache(async (): Promise<MicaLayer[] | null> => {
  const r = await authedGet<{ data: { layers: RawLayer[] } }>(
    "/mica-checkin/layers",
  );
  if (!r.ok) return null;
  return r.data.data.layers
    .flatMap((l) => {
      const mood = getMood(l.emotion);
      if (!mood) return [];
      return [
        {
          id: l.id,
          checkInId: l.id,
          mood: mood.key,
          color: mood.color,
          note: l.noteSnippet || undefined,
          createdAt: l.date,
        } satisfies MicaLayer,
      ];
    })
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
});

export const getTotalLayers = cache(async (): Promise<number | null> => {
  const r = await authedGet<{ data: { totalLayers: number } }>(
    "/mica-checkin/summary",
  );
  return r.ok ? r.data.data.totalLayers : null;
});
