/**
 * Shared domain types for MICA.
 * These map cleanly onto a backend schema — swap mock-data.ts for API calls.
 */

export type MoodKey = "calm" | "growth" | "joy" | "tender" | "rest" | "heavy";

export interface Mood {
  key: MoodKey;
  label: string;
  blurb: string;
  /** Tailwind token name under `mood.*`, or a hex for `heavy`. */
  color: string;
}

export interface CheckIn {
  id: string;
  mood: MoodKey;
  /** 1–5 intensity */
  intensity: number;
  note?: string;
  tags: string[];
  createdAt: string; // ISO
}

/** A single accreted layer of "Your Mica". One per check-in. */
export interface MicaLayer {
  id: string;
  checkInId: string;
  mood: MoodKey;
  color: string; // resolved hex for rendering
  note?: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  title?: string;
  body: string;
  mood?: MoodKey;
  promptId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JournalPrompt {
  id: string;
  text: string;
}

export interface Resource {
  slug: string;
  title: string;
  kind: "article" | "audio" | "video";
  durationMin: number;
  category: string;
  excerpt: string;
  body?: string;
  featured?: boolean;
}

export type ChatRole = "user" | "mica";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  /** Optional quick-reply chips MICA offers after a message. */
  suggestions?: string[];
  createdAt: string;
}

/** A separable conversation thread (like Claude/ChatGPT). */
export interface Conversation {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  streakDays: number;
  joinedAt: string;
}

export type JournalState = {
  error?: string;
  values?: { body?: string; mood?: string };
};

export type CheckInState = { error?: string };
