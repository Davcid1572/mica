/**
 * MICA — navigation flow & route map
 * =================================================================
 * File-based routing means the folder structure IS the flow.
 * This file documents the intended user journey for quick reference
 * and exports route constants so links stay typo-safe.
 *
 * FLOW
 * -----------------------------------------------------------------
 *  Launch
 *    /                         Splash (auto-advances)
 *      → first run            → /onboarding → /sign-up
 *      → returning, signed in → /home
 *      → returning, signed out→ /sign-in
 *
 *  Auth & intro            (route group: app/(onboarding))
 *    /onboarding               3-pane intro carousel
 *    /sign-up                  Create account
 *    /sign-in                  Return
 *
 *  Main app                (route group: app/(app), shares TabBar shell)
 *    /home                     Dashboard — greeting, Your Mica, check-in CTA, tools
 *      → /check-in             3-step mood check-in  → writes a CheckIn + MicaLayer
 *    /mica                     "Your Mica" — the signature growing stone + layer log
 *    /journal                  Entries list + today's prompt
 *      → /journal/new          Composer
 *      → /journal/[id]         Read one entry
 *    /library                  Resource library (filterable)
 *      → /library/[slug]       Article / audio / video detail
 *    /chat                     Conversation list (separable threads)
 *      → /chat/new             Starts a fresh thread, redirects into it
 *      → /chat/[id]            A single conversation thread
 *    /profile                  You — stats, streak, account
 *      → /settings             Preferences, privacy, notifications
 *
 * BACKEND INTEGRATION
 * -----------------------------------------------------------------
 *  - Swap lib/mock-data.ts exports for real fetches.
 *  - Each `CheckIn` should also create a `MicaLayer` (see lib/types.ts).
 *  - /chat/[id] is where you connect your LLM / support backend.
 *  - Auth screens are UI-only stubs; wire to your provider of choice.
 */

export const routes = {
  splash: "/",
  onboarding: "/onboarding",
  signUp: "/sign-up",
  signIn: "/sign-in",
  home: "/home",
  checkIn: "/check-in",
  mica: "/mica",
  journal: "/journal",
  journalNew: "/journal/new",
  journalEntry: (id: string) => `/journal/${id}`,
  library: "/library",
  resource: (slug: string) => `/library/${slug}`,
  chat: "/chat",
  chatNew: "/chat/new",
  conversation: (id: string) => `/chat/${id}`,
  profile: "/profile",
  settings: "/settings",
  forgotPassword: "/forgot-password",
  checkEmail: "/check-email",
  journalEdit: (id: string) => `/journal/${id}/edit`,
} as const;
