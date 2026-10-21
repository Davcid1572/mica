import { JournalComposer } from "@/components/screens/JournalComposer";
import { getTodayPrompt } from "@/lib/api/journal";

export default async function NewEntryPage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const { prompt: promptId } = await searchParams;
  const today = promptId ? await getTodayPrompt() : null;
  const prompt = today && today.id === promptId ? today : null;
  return <JournalComposer prompt={prompt} />;
}
