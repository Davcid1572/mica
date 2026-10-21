import { notFound, redirect } from "next/navigation";
import { JournalComposer } from "@/components/screens/JournalComposer";
import { getEntry } from "@/lib/api/journal";
import { routes } from "@/lib/flow";

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { entry, failed } = await getEntry(id);
  if (!entry) {
    if (failed) redirect(routes.journalEntry(id)); // shows the "try again" state
    notFound();
  }
  return (
    <JournalComposer
      entry={{ id: entry.id, body: entry.body, mood: entry.mood }}
    />
  );
}
