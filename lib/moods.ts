import type { Mood, MoodKey } from "./types";

/** Canonical mood definitions used by check-in + Your Mica. */
export const MOODS: Mood[] = [
  {
    key: "growth",
    label: "Good",
    blurb: "Steady, content, at ease",
    color: "#86B28C",
  },
  {
    key: "joy",
    label: "Joyful",
    blurb: "Bright, grateful, energised",
    color: "#E8B964",
  },
  {
    key: "calm",
    label: "Calm",
    blurb: "Clear, slow, settled",
    color: "#7FA8C9",
  },
  {
    key: "tender",
    label: "Tender",
    blurb: "Sensitive, low, in need of care",
    color: "#D2917A",
  },
  {
    key: "rest",
    label: "Rest",
    blurb: "Tired, quiet, winding down",
    color: "#8488B8",
  },
  {
    key: "heavy",
    label: "Heavy",
    blurb: "Anxious, overwhelmed, weary",
    color: "#5E6B8A",
  },
];

export const MOOD_BY_KEY: Record<MoodKey, Mood> = MOODS.reduce(
  (acc, m) => ({ ...acc, [m.key]: m }),
  {} as Record<MoodKey, Mood>,
);

export function moodColor(key: MoodKey): string {
  return MOOD_BY_KEY[key]?.color ?? "#7FA8C9";
}

export function isMoodKey(k: string): k is MoodKey {
  return MOODS.some((m) => m.key === k);
}

export function getMood(k?: string): Mood | undefined {
  return k && isMoodKey(k) ? MOOD_BY_KEY[k] : undefined;
}
