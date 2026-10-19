import Link from "next/link";
import { StatusBar } from "@/components/ui/StatusBar";
import { resources } from "@/lib/mock-data";
import { routes } from "@/lib/flow";

const CATEGORIES = ["For you", "Anxiety", "Sleep", "Burnout"];

const coverFor = (kind: string) =>
  kind === "article"
    ? "repeating-linear-gradient(135deg,#E2EAE3 0 12px,#EAF0EA 12px 24px)"
    : kind === "audio"
      ? "repeating-linear-gradient(135deg,#F3E6DC 0 9px,#F7EFE7 9px 18px)"
      : "repeating-linear-gradient(135deg,#EAF0F2 0 9px,#F1F5F6 9px 18px)";

export default function LibraryPage() {
  const featured = resources.find((r) => r.featured)!;
  const rest = resources.filter((r) => !r.featured);

  return (
    <>
      <StatusBar tone="dark" />
      <div className="px-6 pt-2">
        <h1 className="mb-4 font-serif text-[28px] font-normal">Learn</h1>

        <div className="mb-[18px] flex h-11 items-center gap-2.5 rounded-[14px] border border-stone-line bg-white px-4">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-stone-light" />
          <span className="text-sm text-stone-light">Search wellbeing topics</span>
        </div>

        <div className="mb-[22px] flex flex-wrap gap-2.5">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              className={`rounded-[11px] px-[15px] py-2 text-[13px] ${i === 0 ? "bg-pine font-medium text-porcelain" : "border border-stone-line bg-white text-[#3A352F]"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* featured */}
        <Link
          href={routes.resource(featured.slug)}
          className="mb-[18px] block overflow-hidden rounded-[20px] border border-stone-line bg-white"
        >
          <div className="grid h-[130px] place-items-center" style={{ background: coverFor(featured.kind) }}>
            <span className="font-mono text-[11px] tracking-wide text-[#7E948A]">[ cover image ]</span>
          </div>
          <div className="px-[18px] py-4">
            <div className="mb-1.5 text-[11px] uppercase tracking-[0.12em] text-clay">
              Featured · {featured.durationMin} min {featured.kind === "article" ? "read" : ""}
            </div>
            <div className="font-serif text-[19px] leading-[1.25]">{featured.title}</div>
          </div>
        </Link>

        {/* list */}
        <div className="flex flex-col gap-3.5">
          {rest.map((r) => (
            <Link key={r.slug} href={routes.resource(r.slug)} className="flex items-center gap-3.5">
              <div className="h-[54px] w-[54px] shrink-0 rounded-[13px]" style={{ background: coverFor(r.kind) }} />
              <div className="flex-1">
                <div className="mb-0.5 text-[11px] uppercase tracking-[0.1em] text-stone-light">
                  {r.kind} · {r.durationMin} min
                </div>
                <div className="text-sm font-semibold leading-tight">{r.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
