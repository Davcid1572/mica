import Link from "next/link";
import { StatusBar } from "@/components/ui/StatusBar";
import { conversations } from "@/lib/mock-data";
import { routes } from "@/lib/flow";

function ago(iso: string): string {
  const d = new Date(iso);
  const now = new Date("2026-06-17T19:00:00Z");
  const hrs = Math.round((+now - +d) / 3600000);
  if (hrs < 24) return `${Math.max(hrs, 1)}h`;
  return d.toLocaleDateString("en", { weekday: "short" });
}

/** Conversation list — separable threads, like Claude / ChatGPT. */
export default function ChatListPage() {
  return (
    <>
      <StatusBar tone="dark" />
      <div className="px-6 pt-2">
        <h1 className="mb-1.5 font-serif text-[28px] font-normal">Talk to MICA</h1>
        <p className="mb-[18px] text-sm text-stone">A gentle, private space to think out loud.</p>

        <Link
          href={routes.chatNew}
          className="mb-6 flex items-center gap-3.5 rounded-2xl bg-pine px-[18px] py-[15px]"
        >
          <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-porcelain/15 text-[22px] font-light text-porcelain">
            +
          </span>
          <span className="flex-1">
            <span className="block text-[15px] font-semibold text-porcelain">New conversation</span>
            <span className="block text-xs text-pine-haze">Start fresh, any time</span>
          </span>
        </Link>

        <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-light">Recent</div>
        <div className="flex flex-col gap-1.5">
          {conversations.map((c) => (
            <Link
              key={c.id}
              href={routes.conversation(c.id)}
              className="rounded-2xl border border-stone-line bg-white px-4 py-[15px]"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <div className="text-[15px] font-semibold">{c.title}</div>
                <div className="text-[11px] text-stone-light">{ago(c.updatedAt)}</div>
              </div>
              <div className="line-clamp-1 text-[13px] leading-snug text-stone">“{c.preview}”</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
