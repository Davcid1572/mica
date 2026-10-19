import Link from "next/link";
import { StatusBar } from "@/components/ui/StatusBar";
import { MicaStone } from "@/components/brand/MicaStone";
import { routes } from "@/lib/flow";
import { currentUser, micaLayers } from "@/lib/mock-data";

const tools = [
  { href: routes.journal, label: "Journal", bg: "bg-[#EAF0EA]", dot: "bg-pine" },
  { href: routes.chat, label: "Talk to MICA", bg: "bg-[#F3E6DC]", dot: "bg-clay" },
  { href: routes.library, label: "Breathe", bg: "bg-[#F1ECF2]", dot: "bg-mood-rest" },
  { href: routes.library, label: "Learn", bg: "bg-[#EAF0F2]", dot: "bg-mood-calm" },
];

export default function HomePage() {
  const greeting = "Good evening";
  return (
    <>
      <StatusBar tone="dark" />
      <div className="px-6 pt-2">
        {/* greeting */}
        <header className="mb-5 flex items-center justify-between">
          <div>
            <div className="mb-0.5 text-[13px] text-stone-light">Tuesday, 17 June</div>
            <h1 className="font-serif text-[25px] font-normal">
              {greeting}, {currentUser.name}
            </h1>
          </div>
          <Link
            href={routes.profile}
            className="grid h-[42px] w-[42px] place-items-center rounded-full bg-gradient-to-br from-mood-growth to-clay text-[15px] font-semibold text-white"
          >
            {currentUser.name[0]}
          </Link>
        </header>

        {/* Your Mica hero */}
        <Link
          href={routes.mica}
          className="relative mb-4 flex items-center gap-[18px] overflow-hidden rounded-[24px] bg-pine-deep p-[22px]"
        >
          <div
            className="absolute -right-8 -top-5 h-[180px] w-[180px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(95,176,137,0.32), rgba(24,48,42,0) 70%)" }}
          />
          <div className="relative shrink-0">
            <MicaStone layers={micaLayers} size={96} float />
          </div>
          <div className="relative">
            <div className="mb-1.5 text-[11px] uppercase tracking-[0.16em] text-pine-haze">Your Mica</div>
            <div className="mb-2 font-serif text-[22px] leading-tight text-porcelain">
              {micaLayers.length} layers, and growing
            </div>
            <div className="text-[13px] text-[#A8BDB4]">
              {currentUser.streakDays}-day streak · tap to explore
            </div>
          </div>
        </Link>

        {/* check-in CTA */}
        <Link
          href={routes.checkIn}
          className="mb-[18px] flex items-center justify-between rounded-[20px] border border-stone-line bg-white px-5 py-[18px]"
        >
          <div>
            <div className="mb-0.5 text-base font-semibold">How are you, really?</div>
            <div className="text-[13px] text-stone">Your evening check-in</div>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-full bg-clay text-[22px] text-white">→</div>
        </Link>

        {/* tools */}
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-light">Tools</div>
        <div className="grid grid-cols-2 gap-3">
          {tools.map((t, i) => (
            <Link key={i} href={t.href} className={`rounded-[18px] ${t.bg} p-4`}>
              <div className={`mb-6 h-[26px] w-[26px] rounded-lg ${t.dot}`} />
              <div className="text-sm font-semibold">{t.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
