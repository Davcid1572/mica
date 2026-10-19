import Link from "next/link";
import { StatusBar } from "@/components/ui/StatusBar";
import { MicaStone } from "@/components/brand/MicaStone";
import { micaLayers } from "@/lib/mock-data";
import { MOOD_BY_KEY } from "@/lib/moods";

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const today = new Date("2026-06-17");
  const diff = Math.round((+today - +new Date(d.toDateString())) / 86400000);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString("en", { weekday: "short" });
}

/**
 * "Your Mica" — the signature generative-stone screen.
 * The stone grows a new layer per check-in; the log lists recent layers.
 */
export default function MicaPage() {
  const recent = micaLayers.slice(0, 4);
  return (
    <div className="relative h-full bg-pine-deeper">
      <StatusBar tone="light" />

      <div className="absolute inset-x-6 top-[54px] z-10 flex items-center justify-between">
        <Link href="/home" className="text-xl text-porcelain">
          ‹
        </Link>
        <div className="text-[13px] uppercase tracking-[0.16em] text-pine-haze">Your Mica</div>
        <button className="text-lg text-porcelain">⤴</button>
      </div>

      {/* the stone */}
      <div className="relative flex h-[300px] items-center justify-center">
        <MicaStone layers={micaLayers} size={190} float />
      </div>
      <div className="-mt-1.5 text-center">
        <div className="font-serif text-2xl text-porcelain">{micaLayers.length} layers</div>
        <div className="mt-0.5 text-[13px] text-[#7E948A]">your stone since 5 June</div>
      </div>

      {/* layer log */}
      <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-porcelain px-6 pb-7 pt-[22px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[15px] font-semibold">Recent layers</div>
          <div className="text-[13px] font-medium text-clay">This week</div>
        </div>
        <ul className="flex flex-col gap-3.5">
          {recent.map((l) => {
            const mood = MOOD_BY_KEY[l.mood];
            return (
              <li key={l.id} className="flex items-center gap-3">
                <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: l.color }} />
                <div className="flex-1 truncate">
                  <span className="text-sm font-semibold">{mood.label}</span>
                  {l.note && <span className="text-[13px] text-stone"> · “{l.note}”</span>}
                </div>
                <div className="text-xs text-stone-light">{dayLabel(l.createdAt)}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
