import Link from "next/link";
import { StatusBar } from "@/components/ui/StatusBar";
import { LocalDate } from "@/components/ui/LocalDate";
import { getEntries, getTodayPrompt, PAGE_SIZE } from "@/lib/api/journal";
import { todayPrompt as fallbackPrompt } from "@/lib/mock-data";
import { getMood } from "@/lib/moods";
import { routes } from "@/lib/flow";

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: p } = await searchParams;
  const page = Math.max(1, parseInt(p ?? "1", 10) || 1);
  const [entries, prompt] = await Promise.all([
    getEntries(page),
    getTodayPrompt(),
  ]);

  const promptText = prompt?.text ?? fallbackPrompt.text;
  const promptHref = prompt
    ? `${routes.journalNew}?prompt=${encodeURIComponent(prompt.id)}`
    : routes.journalNew;

  return (
    <>
      <StatusBar tone="dark" />
      <div className="px-6 pt-2">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-serif text-[28px] font-normal">Journal</h1>
          <Link
            href={routes.journalNew}
            aria-label="New entry"
            className="grid h-11 w-11 place-items-center rounded-full bg-pine text-[22px] font-light text-white"
          >
            +
          </Link>
        </div>

        {/* today's prompt */}
        {page === 1 && (
          <Link
            href={promptHref}
            className="relative mb-6 block overflow-hidden rounded-[22px] bg-gradient-to-br from-pine to-pine-soft p-[22px]"
          >
            <div
              className="absolute -bottom-8 -right-5 h-[120px] w-[120px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,185,100,0.3), rgba(33,65,58,0) 70%)",
              }}
            />
            <div className="relative">
              <div className="mb-2.5 text-[11px] uppercase tracking-[0.16em] text-pine-haze">
                Today's prompt
              </div>
              <div className="mb-4 font-serif text-[22px] leading-[1.3] text-porcelain">
                {promptText}
              </div>
              <span className="inline-flex h-11 items-center gap-2 rounded-xl bg-porcelain/15 px-4 text-sm font-medium text-porcelain">
                Start writing →
              </span>
            </div>
          </Link>
        )}

        <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-light">
          {page === 1 ? "Earlier entries" : `Page ${page}`}
        </div>

        {entries === null ? (
          <div className="rounded-[18px] border border-stone-line bg-white px-[18px] py-5 text-sm leading-relaxed text-stone">
            We couldn't load your entries just now.{" "}
            <Link
              href={`${routes.journal}?page=${page}`}
              className="font-semibold text-pine"
            >
              Try again
            </Link>
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-[18px] border border-stone-line bg-white px-[18px] py-5 text-sm leading-relaxed text-stone">
            {page === 1
              ? "Nothing here yet. Your first entry can be a single line."
              : "That's everything for now."}
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {entries.map((e) => {
              const mood = getMood(e.mood);
              return (
                <Link
                  key={e.id}
                  href={routes.journalEntry(e.id)}
                  className="rounded-[18px] border border-stone-line bg-white px-[18px] py-4"
                >
                  <div className="mb-2 flex items-center gap-2.5">
                    {mood && (
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: mood.color }}
                      />
                    )}
                    <span className="text-xs text-stone-light">
                      <LocalDate
                        iso={e.createdAt}
                        options={{
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        }}
                      />
                      {mood && ` · ${mood.label}`}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed text-[#3A352F]">
                    “{e.body}”
                  </p>
                </Link>
              );
            })}
          </div>
        )}

        {entries && (page > 1 || entries.length === PAGE_SIZE) && (
          <div className="mt-4 flex items-center justify-between text-[13px] font-semibold text-pine">
            {page > 1 ? (
              <Link
                href={`${routes.journal}?page=${page - 1}`}
                className="inline-flex h-11 items-center"
              >
                ‹ Newer
              </Link>
            ) : (
              <span />
            )}
            {entries.length === PAGE_SIZE && (
              <Link
                href={`${routes.journal}?page=${page + 1}`}
                className="inline-flex h-11 items-center"
              >
                Older ›
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
