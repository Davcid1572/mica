"use server";

import { redirect } from "next/navigation";
import { authedRequest } from "@/lib/api/client";
import { CATEGORY_KEYS } from "@/lib/checkin";
import { isMoodKey } from "@/lib/moods";
import type { CheckInState } from "@/lib/types";
import { routes } from "@/lib/flow";

const OFFLINE =
  "We couldn't reach MICA just now. Check your connection and try again.";
const GENERIC =
  "Something went wrong on our side. Please try again in a moment.";
const DEV = process.env.NODE_ENV !== "production";

export async function submitCheckIn(
  _: CheckInState,
  fd: FormData,
): Promise<CheckInState> {
  const emotion = String(fd.get("emotion") ?? "");
  const category = String(fd.get("category") ?? "");
  const intensity = Number(fd.get("intensity"));
  const note = String(fd.get("note") ?? "").trim();

  if (
    !isMoodKey(emotion) ||
    !CATEGORY_KEYS.includes(category) ||
    !Number.isInteger(intensity) ||
    intensity < 1 ||
    intensity > 5
  ) {
    return {
      error: "Something went missing. Step back and check your choices.",
    };
  }

  const r = await authedRequest("POST", "/mica-checkin", {
    emotion,
    intensity,
    category,
    note,
  });
  if (!r.ok) {
    return {
      error:
        r.status === 0
          ? OFFLINE
          : r.status === 400
            ? DEV && r.message
              ? `The server said: ${r.message}`
              : "That didn't save. Please try once more."
            : GENERIC,
    };
  }

  redirect(`${routes.mica}?added=1`);
}
