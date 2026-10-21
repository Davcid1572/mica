import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LocalDate } from "@/components/ui/LocalDate";
import { Screen } from "@/components/ui/Screen";
import { StatusBar } from "@/components/ui/StatusBar";
import { DeleteEntry } from "@/components/screens/DeleteEntry";
import { getEntry } from "@/lib/api/journal";
import { getMood } from "@/lib/moods";
import { routes } from "@/lib/flow";

export default async function EntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { entry, failed } = await getEntry(id);
  if (!entry && !failed) notFound();

  const mood = getMood(entry?.mood);

  return (
    <Screen>
      <StatusBar tone="dark" />
      <div className="px-6 pb-8 pt-1">
        <Link
          href={routes.journal}
          aria-label="Back to journal"
          className="-ml-3 mb-2 grid h-11 w-11 place-items-center text-2xl text-ink"
        >
          ‹
        </Link>

        {!entry ? (
          <div className="rounded-[18px] border border-stone-line bg-white px-[18px] py-5 text-sm leading-relaxed text-stone">
            We couldn't load this entry just now.{" "}
            <Link
              href={routes.journalEntry(id)}
              className="font-semibold text-pine"
            >
              Try again
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2.5">
              {mood && (
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: mood.color }}
                />
              )}
              <span className="text-xs text-stone-light">
                <LocalDate
                  iso={entry.createdAt}
                  options={{
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    hour: "numeric",
                    minute: "2-digit",
                  }}
                />
                {mood && ` · ${mood.label}`}
              </span>
            </div>

            <p className="whitespace-pre-wrap break-words font-serif text-[18px] leading-relaxed">
              {entry.body}
            </p>

            <div className="mt-8 flex flex-col gap-2">
              <Button variant="ghost" href={routes.journalEdit(entry.id)}>
                Edit entry
              </Button>
              <DeleteEntry id={entry.id} />
            </div>
          </>
        )}
      </div>
    </Screen>
  );
}
