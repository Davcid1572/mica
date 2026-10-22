"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitCheckIn } from "@/app/actions/checkin";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { StatusBar } from "@/components/ui/StatusBar";
import { CATEGORIES, INTENSITY } from "@/lib/checkin";
import { MOODS, getMood } from "@/lib/moods";
import { routes } from "@/lib/flow";
import type { CheckInState, MoodKey } from "@/lib/types";

const copy = [
  { title: "How are you, really?", sub: "Pick the one that fits closest." },
  { title: "How strong does it feel?", sub: "There's no right amount." },
  { title: "What's it mostly about?", sub: "A note is optional." },
];

export function CheckInFlow() {
  const [step, setStep] = useState(0);
  const [emotion, setEmotion] = useState<MoodKey | null>(null);
  const [intensity, setIntensity] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [state, action, pending] = useActionState(
    submitCheckIn,
    {} as CheckInState,
  );

  const mood = emotion ? getMood(emotion) : undefined;
  const canContinue =
    step === 0 ? !!emotion : step === 1 ? !!intensity : !!category;

  return (
    <Screen>
      <StatusBar tone="dark" />
      <form action={action}>
        <input type="hidden" name="emotion" value={emotion ?? ""} />
        <input type="hidden" name="intensity" value={intensity ?? ""} />
        <input type="hidden" name="category" value={category ?? ""} />

        <div className="px-6 pb-[150px] pt-1">
          {/* back / close + progress */}
          <div className="mb-4 flex items-center gap-3">
            {step === 0 ? (
              <Link
                href={routes.home}
                aria-label="Close check-in"
                className="-ml-3 grid h-11 w-11 place-items-center text-2xl text-ink"
              >
                ×
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                aria-label="Back"
                className="-ml-3 grid h-11 w-11 place-items-center text-2xl text-ink"
              >
                ‹
              </button>
            )}
            <div
              className="flex flex-1 gap-1.5"
              role="img"
              aria-label={`Step ${step + 1} of 3`}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i <= step ? "bg-pine" : "bg-pine/15"}`}
                />
              ))}
            </div>
          </div>

          <h1 className="font-serif text-[26px] font-normal leading-tight">
            {copy[step].title}
          </h1>
          <p className="mt-1.5 text-[14px] text-stone">{copy[step].sub}</p>

          {/* step 1: mood */}
          {step === 0 && (
            <div
              role="radiogroup"
              aria-label="Mood"
              className="mt-6 grid grid-cols-2 gap-3"
            >
              {MOODS.map((m) => {
                const on = emotion === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setEmotion(m.key)}
                    className={`rounded-[18px] border p-3.5 text-left transition ${
                      on
                        ? "border-pine bg-pine/10"
                        : "border-stone-line bg-white"
                    }`}
                  >
                    <span
                      className="mb-2 block h-3 w-3 rounded-full"
                      style={{ background: m.color }}
                    />
                    <span className="block text-[15px] font-semibold">
                      {m.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-stone">
                      {m.blurb}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* step 2: intensity */}
          {step === 1 && (
            <div className="mt-10">
              <div
                role="radiogroup"
                aria-label="How strong"
                className="flex items-end justify-between"
              >
                {INTENSITY.map((label, i) => {
                  const n = i + 1;
                  const on = intensity === n;
                  const d = 20 + i * 7;
                  return (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      aria-label={`${n} of 5, ${label}`}
                      onClick={() => setIntensity(n)}
                      className="grid h-14 w-[50px] place-items-center"
                    >
                      <span
                        className={`block rounded-full transition ${
                          on
                            ? "ring-2 ring-pine ring-offset-2 ring-offset-porcelain"
                            : ""
                        }`}
                        style={{
                          width: d,
                          height: d,
                          background: mood?.color,
                          opacity: intensity && n <= intensity ? 1 : 0.35,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              <p
                aria-live="polite"
                className="mt-8 h-8 text-center font-serif text-[24px]"
              >
                {intensity ? INTENSITY[intensity - 1] : ""}
              </p>
              {mood && (
                <p className="mt-1 text-center text-[13px] text-stone">
                  Feeling {mood.label.toLowerCase()}
                </p>
              )}
            </div>
          )}

          {/* step 3: category + note */}
          {step === 2 && (
            <div className="mt-6">
              <div
                role="radiogroup"
                aria-label="What it's about"
                className="flex flex-wrap gap-2"
              >
                {CATEGORIES.map((c) => {
                  const on = category === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setCategory(c.key)}
                      className={`h-11 rounded-[14px] border px-4 text-[14px] transition ${
                        on
                          ? "border-pine bg-pine/10 font-semibold"
                          : "border-stone-line bg-white"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              <label
                htmlFor="note"
                className="mb-2 mt-6 block text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-light"
              >
                A note for later
              </label>
              <textarea
                id="note"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Anything you'd like to remember about this moment?"
                className="w-full resize-none rounded-2xl border border-stone-line bg-white p-4 text-[15px] leading-relaxed outline-none placeholder:text-stone-light focus:border-pine"
              />

              {emotion === "heavy" && (intensity ?? 0) >= 4 && (
                <p className="mt-4 rounded-2xl bg-pine/10 px-4 py-3 text-[13px] leading-snug">
                  That sounds like a lot to carry. If you'd like company with
                  it, you can{" "}
                  <Link
                    href={routes.chat}
                    className="font-semibold text-pine underline"
                  >
                    talk to someone
                  </Link>
                  , any time.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-porcelain/95 px-6 pb-6 pt-3 backdrop-blur">
          {state.error && (
            <p
              role="alert"
              className="mb-3 rounded-2xl bg-clay/10 px-4 py-3 text-[13px] leading-snug"
            >
              {state.error}
            </p>
          )}
          {/* Separate keys give each a fresh DOM node, so the click that moves to
              step 3 can't also submit the form. */}
          {step < 2 ? (
            <Button
              key="next"
              disabled={!canContinue}
              onClick={() => setStep(step + 1)}
            >
              Continue
            </Button>
          ) : (
            <Button key="save" type="submit" disabled={!canContinue || pending}>
              {pending ? "Adding…" : "Add to Your Mica"}
            </Button>
          )}
        </div>
      </form>
    </Screen>
  );
}
