import type {
  User,
  MicaLayer,
  JournalEntry,
  JournalPrompt,
  Resource,
  Conversation,
} from "./types";

/**
 * Mock data for screen development.
 * Replace each export with a data-fetching call (server component, route
 * handler, or your client of choice) when wiring the backend.
 */

export const currentUser: User = {
  id: "u_emmanuel",
  name: "Emmanuel",
  email: "emmanuel@example.com",
  streakDays: 5,
  joinedAt: "2026-06-05T08:00:00Z",
};

export const micaLayers: MicaLayer[] = [
  { id: "l12", checkInId: "c12", mood: "calm", color: "#7FA8C9", note: "Walked at sunrise, felt clear.", createdAt: "2026-06-17T07:10:00Z" },
  { id: "l11", checkInId: "c11", mood: "heavy", color: "#5E6B8A", note: "Hard day, asked for help.", createdAt: "2026-06-16T21:00:00Z" },
  { id: "l10", checkInId: "c10", mood: "growth", color: "#86B28C", note: "Reconnected with a friend.", createdAt: "2026-06-15T19:30:00Z" },
  { id: "l9", checkInId: "c9", mood: "joy", color: "#E8B964", note: "Grandma's recipe night.", createdAt: "2026-06-14T20:00:00Z" },
  { id: "l8", checkInId: "c8", mood: "rest", color: "#8488B8", createdAt: "2026-06-13T22:15:00Z" },
  { id: "l7", checkInId: "c7", mood: "tender", color: "#D2917A", createdAt: "2026-06-12T18:00:00Z" },
  { id: "l6", checkInId: "c6", mood: "calm", color: "#7FA8C9", createdAt: "2026-06-11T08:30:00Z" },
  { id: "l5", checkInId: "c5", mood: "growth", color: "#86B28C", createdAt: "2026-06-10T19:00:00Z" },
  { id: "l4", checkInId: "c4", mood: "joy", color: "#E8B964", createdAt: "2026-06-09T12:00:00Z" },
  { id: "l3", checkInId: "c3", mood: "rest", color: "#8488B8", createdAt: "2026-06-08T22:00:00Z" },
  { id: "l2", checkInId: "c2", mood: "calm", color: "#7FA8C9", createdAt: "2026-06-06T09:00:00Z" },
  { id: "l1", checkInId: "c1", mood: "tender", color: "#D2917A", createdAt: "2026-06-05T20:00:00Z" },
];

export const todayPrompt: JournalPrompt = {
  id: "p_today",
  text: "What gave you a moment of peace today?",
};

export const journalEntries: JournalEntry[] = [
  {
    id: "j3",
    body: "Took the long way home and let myself breathe. The city felt softer than usual, and I didn't rush a single street.",
    mood: "growth",
    createdAt: "2026-06-17T18:40:00Z",
    updatedAt: "2026-06-17T18:55:00Z",
  },
  {
    id: "j2",
    body: "Deadlines piling up. Naming it here helped more than I expected — it's smaller on the page than in my head.",
    mood: "heavy",
    createdAt: "2026-06-15T22:10:00Z",
    updatedAt: "2026-06-15T22:25:00Z",
  },
  {
    id: "j1",
    body: "Grandma's recipe, the whole family loud and laughing. I want to remember the warmth of that kitchen.",
    mood: "joy",
    createdAt: "2026-06-14T20:30:00Z",
    updatedAt: "2026-06-14T20:45:00Z",
  },
];

export const resources: Resource[] = [
  {
    slug: "understanding-stress",
    title: "Understanding stress before it understands you",
    kind: "article",
    durationMin: 6,
    category: "Burnout",
    excerpt: "Stress isn't the enemy — it's a signal. Learn to read yours early.",
    featured: true,
    body: "Stress is your body asking for attention. This piece walks through the early physical and emotional signals, and three small responses you can practise before overwhelm sets in.",
  },
  {
    slug: "breathing-space",
    title: "A breathing space for busy minds",
    kind: "audio",
    durationMin: 8,
    category: "Anxiety",
    excerpt: "An eight-minute guided pause you can take anywhere.",
  },
  {
    slug: "talking-to-someone",
    title: "Talking to someone you trust",
    kind: "video",
    durationMin: 4,
    category: "Connection",
    excerpt: "How to open a hard conversation — and why it helps.",
  },
  {
    slug: "wind-down-ritual",
    title: "Building a wind-down ritual",
    kind: "article",
    durationMin: 5,
    category: "Sleep",
    excerpt: "Sleep starts an hour before bed. Here's a gentle routine.",
  },
];

export const conversations: Conversation[] = [
  {
    id: "conv_work",
    title: "Feeling overwhelmed at work",
    preview: "Let's break it into what's yours to carry today…",
    updatedAt: "2026-06-17T17:00:00Z",
    messages: [
      { id: "m1", role: "user", text: "I've got three deadlines tomorrow and I can't focus on any of them.", createdAt: "2026-06-17T16:50:00Z" },
      { id: "m2", role: "mica", text: "That sounds like a lot to hold at once — no wonder focus feels hard. Before we plan, take one slow breath with me. Which of the three feels heaviest right now?", createdAt: "2026-06-17T16:50:30Z" },
      { id: "m3", role: "user", text: "The presentation, definitely.", createdAt: "2026-06-17T16:51:00Z" },
      {
        id: "m4",
        role: "mica",
        text: "Okay. Let's make it smaller. What's the very first tiny step — not the whole thing, just the first 10 minutes?",
        suggestions: ["Help me start", "Just listen", "Talk to a human"],
        createdAt: "2026-06-17T16:51:20Z",
      },
    ],
  },
  {
    id: "conv_sleep",
    title: "Trouble sleeping lately",
    preview: "That wind-down ritual sounds worth trying again…",
    updatedAt: "2026-06-15T23:30:00Z",
    messages: [
      { id: "m1", role: "user", text: "I keep waking up at 3am with my mind racing.", createdAt: "2026-06-15T23:20:00Z" },
      { id: "m2", role: "mica", text: "Three a.m. wakings are often the mind catching up on unprocessed worry. What's usually waiting for you when you wake?", suggestions: ["Work", "Relationships", "I'm not sure"], createdAt: "2026-06-15T23:21:00Z" },
    ],
  },
  {
    id: "conv_win",
    title: "A win I want to remember",
    preview: "Hold onto this feeling — you earned it.",
    updatedAt: "2026-06-12T13:00:00Z",
    messages: [
      { id: "m1", role: "user", text: "I finally finished the project I'd been avoiding for weeks.", createdAt: "2026-06-12T12:55:00Z" },
      { id: "m2", role: "mica", text: "That's worth pausing on. Avoidance is heavy, and you moved through it. Hold onto this feeling — you earned it. Want me to save this as a layer in Your Mica?", suggestions: ["Yes, save it", "Maybe later"], createdAt: "2026-06-12T12:56:00Z" },
    ],
  },
];

export function getConversation(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id);
}

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getJournalEntry(id: string): JournalEntry | undefined {
  return journalEntries.find((j) => j.id === id);
}
