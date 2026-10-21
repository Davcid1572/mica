"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveEntry } from "@/app/actions/journal";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { StatusBar } from "@/components/ui/StatusBar";
import { MOODS } from "@/lib/moods";
import { routes } from "@/lib/flow";
import type { JournalState } from "@/lib/types";

export function JournalComposer({
  entry,
  prompt,
}: {
  entry?: { id: string; body: string; mood?: string };
  prompt?: { id: string; text: string } | null;
}) {
  const [state, action, pending] = useActionState(
    saveEntry,
    {} as JournalState,
  );
  // After a failed save React resets the form, so restore what was typed.
  const body = state.values?.body ?? entry?.body ?? "";
  const mood = state.values?.mood ?? entry?.mood;

  return (
    <Screen>
      <StatusBar tone="dark" />
      <form action={action}>
        {entry && <input type="hidden" name="id" value={entry.id} />}
        {!entry && prompt && (
          <input type="hidden" name="promptId" value={prompt.id} />
        )}

        <div className="px-6 pb-[150px] pt-1">
          <div className="mb-3 flex items-center gap-1">
            <Link
              href={entry ? routes.journalEntry(entry.id) : routes.journal}
              aria-label="Back"
              className="-ml-3 grid h-11 w-11 place-items-center text-2xl text-ink"
            >
              ‹
            </Link>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-light">
              {entry ? "Edit entry" : "New entry"}
            </span>
          </div>

          {prompt && !entry && (
            <p className="mb-4 font-serif text-[22px] leading-[1.3]">
              {prompt.text}
            </p>
          )}

          <label htmlFor="body" className="sr-only">
            Your entry
          </label>
          <textarea
            id="body"
            name="body"
            defaultValue={body}
            rows={7}
            placeholder="Write whatever is here…"
            className="w-full resize-none bg-transparent font-serif text-[18px] leading-relaxed text-ink outline-none placeholder:text-stone-light"
          />

          <fieldset className="mt-5">
            <legend className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-light">
              How does it feel?
            </legend>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <label key={m.key} className="cursor-pointer" title={m.blurb}>
                  <input
                    type="radio"
                    name="mood"
                    value={m.key}
                    defaultChecked={mood === m.key}
                    className="peer sr-only"
                  />
                  <span className="flex h-11 items-center gap-2 rounded-[14px] border border-stone-line bg-white px-3.5 text-[13px] peer-checked:border-pine peer-checked:bg-pine/10 peer-focus-visible:ring-2 peer-focus-visible:ring-pine">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: m.color }}
                    />
                    {m.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-porcelain/95 px-6 pb-6 pt-3 backdrop-blur">
          {state.error && (
            <p
              role="alert"
              className="mb-3 rounded-2xl bg-clay/10 px-4 py-3 text-[13px] leading-snug text-ink"
            >
              {state.error}
            </p>
          )}
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : entry ? "Save changes" : "Save entry"}
          </Button>
        </div>
      </form>
    </Screen>
  );
}
