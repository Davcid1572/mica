"use client";

import { useActionState, useState } from "react";
import { deleteEntry } from "@/app/actions/journal";
import { Button } from "@/components/ui/Button";
import type { JournalState } from "@/lib/types";

export function DeleteEntry({ id }: { id: string }) {
  const [asking, setAsking] = useState(false);
  const [state, action, pending] = useActionState(
    deleteEntry.bind(null, id),
    {} as JournalState,
  );

  if (!asking) {
    return (
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="h-11 w-full text-[15px] font-medium text-clay-deep"
      >
        Delete entry
      </button>
    );
  }

  return (
    <form
      action={action}
      className="rounded-2xl border border-stone-line bg-white p-4"
    >
      <p className="text-[14px] leading-snug">
        Delete this entry? It can't be brought back.
      </p>
      {state.error && (
        <p
          role="alert"
          className="mt-3 rounded-2xl bg-clay/10 px-4 py-3 text-[13px] leading-snug"
        >
          {state.error}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <Button variant="ghost" onClick={() => setAsking(false)}>
          Keep it
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Deleting…" : "Delete"}
        </Button>
      </div>
    </form>
  );
}
