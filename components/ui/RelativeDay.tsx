"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
const dayStart = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

export function RelativeDay({ iso }: { iso: string }) {
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  if (!mounted) return <time dateTime={iso} />;

  const d = new Date(iso);
  const diff = Math.round((dayStart(new Date()) - dayStart(d)) / 86400000);
  const label =
    diff <= 0
      ? "Today"
      : diff === 1
        ? "Yesterday"
        : diff < 7
          ? d.toLocaleDateString("en", { weekday: "short" })
          : d.toLocaleDateString("en", { day: "numeric", month: "short" });

  return <time dateTime={iso}>{label}</time>;
}
