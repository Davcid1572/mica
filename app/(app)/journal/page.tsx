import Link from "next/link";
import { StatusBar } from "@/components/ui/StatusBar";
import { journalEntries, todayPrompt } from "@/lib/mock-data";
import { MOOD_BY_KEY } from "@/lib/moods";
import { routes } from "@/lib/flow";

function entryDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en", { weekday: "short", day: "numeric" });
}

export default function JournalPage() {
  return (
    <>
      <StatusBar tone="dark" />
      <div className="px-6 pt-2">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-serif text-[28px] font-normal">Journal</h1>
          <Link
            href={routes.journalNew}
            className="grid h-[38px] w-[38px] place-items-center rounded-full bg-pine text-[22px] font-light text-white"
          >
            +
          </Link>
        </div>

        {/* today's prompt */}
        <Link
          href={routes.journalNew}
          className="relative mb-6 block overflow-hidden rounded-[22px] bg-gradient-to-br from-pine to-pine-soft p-[22px]"
        >
          <div
            className="absolute -bottom-8 -right-5 h-[120px] w-[120px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(232,185,100,0.3), rgba(33,65,58,0) 70%)" }}
          />
          <div className="relative">
            <div className="mb-2.5 text-[11px] uppercase tracking-[0.16em] text-pine-haze">Today's prompt</div>
            <div className="mb-4 font-serif text-[22px] leading-[1.3] text-porcelain">{todayPrompt.text}</div>
            <span className="inline-flex items-center gap-2 rounded-xl bg-porcelain/15 px-4 py-2.5 text-sm font-medium text-porcelain">
              Start writing →
            </span>
          </div>
        </Link>

        {/* earlier entries */}
        <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-light">
          Earlier entries
        </div>
        <div className="flex flex-col gap-3.5">
          {journalEntries.map((e) => {
            const mood = e.mood ? MOOD_BY_KEY[e.mood] : null;
            return (
              <Link
                key={e.id}
                href={routes.journalEntry(e.id)}
                className="rounded-[18px] border border-stone-line bg-white px-[18px] py-4"
              >
                <div className="mb-2 flex items-center gap-2.5">
                  {mood && <span className="h-2.5 w-2.5 rounded-full" style={{ background: mood.color }} />}
                  <span className="text-xs text-stone-light">
                    {entryDate(e.createdAt)}
                    {mood && ` · ${mood.label}`}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-[#3A352F]">“{e.body}”</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
