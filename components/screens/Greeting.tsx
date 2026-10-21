"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};
const snapshot = () => Math.floor(Date.now() / 60_000);
const serverSnapshot = () => 0;

function salutation(h: number) {
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 17) return "Good afternoon";
  if (h >= 17 && h < 22) return "Good evening";
  return "Hello";
}

export function Greeting({ name }: { name?: string }) {
  const minute = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const now = minute ? new Date(minute * 60_000) : null;
  const hello = now ? salutation(now.getHours()) : "Hello";
  const date = now?.toLocaleDateString("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const first = name?.split(" ")[0];

  return (
    <div>
      <div className="mb-0.5 h-[19px] text-[13px] text-stone-light">{date}</div>
      <h1 className="font-serif text-[25px] font-normal">
        {first ? `${hello}, ${first}` : hello}
      </h1>
    </div>
  );
}
