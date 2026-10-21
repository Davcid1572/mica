"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

export function LocalDate({
  iso,
  options,
}: {
  iso: string;
  options: Intl.DateTimeFormatOptions;
}) {
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  return (
    <time dateTime={iso}>
      {mounted ? new Date(iso).toLocaleString("en", options) : ""}
    </time>
  );
}
