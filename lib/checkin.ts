export const CATEGORIES = [
  { key: "work", label: "Work" },
  { key: "relationships", label: "Relationships" },
  { key: "health", label: "Health" },
  { key: "money", label: "Money" },
  { key: "rest", label: "Rest" },
  { key: "myself", label: "Myself" },
] as const;

export const CATEGORY_KEYS: string[] = CATEGORIES.map((c) => c.key);

/** Strength of a feeling, not a score. Deliberately neutral. */
export const INTENSITY = [
  "Faint",
  "Gentle",
  "Noticeable",
  "Strong",
  "Intense",
] as const;
