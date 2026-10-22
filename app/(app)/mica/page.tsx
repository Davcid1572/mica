import { Suspense } from "react";
import Link from "next/link";
import { StatusBar } from "@/components/ui/StatusBar";
import { Button } from "@/components/ui/Button";
import { LocalDate } from "@/components/ui/LocalDate";
import { RelativeDay } from "@/components/ui/RelativeDay";
import { MicaStone } from "@/components/brand/MicaStone";
import { getLayers, getTotalLayers } from "@/lib/api/checkin";
import { getProfile } from "@/lib/api/users";
import { getMood } from "@/lib/moods";
import { routes } from "@/lib/flow";

const LOG_LIMIT = 20;

export default function MicaPage({
  searchParams,
}: {
  searchParams: Promise<{ added?: string }>;
}) {
  return (
    <div className="relative flex h-full flex-col bg-pine-deeper">
      <StatusBar tone="light" />

      <div className="absolute inset-x-6 top-[54px] z-10 flex items-center justify-between">
        <Link
          href={routes.home}
          aria-label="Back to home"
          className="-ml-3 grid h-11 w-11 place-items-center text-xl text-porcelain"
        >
          ‹
        </Link>
        <div className="text-[13px] uppercase tracking-[0.16em] text-pine-haze">
          Your Mica
        </div>
        <span className="w-11" />
      </div>

      <Suspense fallback={<MicaSkeleton />}>
        <MicaContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

/** Same silhouette as the real content, so nothing jumps when it arrives. */
function MicaSkeleton() {
  return (
    <>
      <div className="flex h-[300px] shrink-0 items-center justify-center">
        <div className="h-[190px] w-[190px] rounded-full bg-pine-deep" />
      </div>
      <div className="h-[52px] shrink-0" />
      <div
        aria-busy="true"
        className="min-h-0 flex-1 rounded-t-[28px] bg-porcelain"
      />
    </>
  );
}

async function MicaContent({
  searchParams,
}: {
  searchParams: Promise<{ added?: string }>;
}) {
  const { added } = await searchParams;
  const [layers, total, user] = await Promise.all([
    getLayers(),
    getTotalLayers(),
    getProfile(),
  ]);

  const all = layers ?? [];
  const count = total ?? all.length;
  const recent = all.slice(0, LOG_LIMIT);

  return (
    <>
      {/* the stone: fixed size, never squeezed */}
      <div className="relative flex h-[300px] shrink-0 items-center justify-center">
        <MicaStone layers={all.slice(0, 12)} size={190} float />
      </div>
      <div className="-mt-1.5 shrink-0 pb-5 text-center">
        <div className="font-serif text-2xl text-porcelain">
          {count === 0
            ? "Your stone is waiting"
            : `${count} ${count === 1 ? "layer" : "layers"}`}
        </div>
        {user?.joinedAt && count > 0 && (
          <div className="mt-0.5 text-[13px] text-pine-haze">
            your stone since{" "}
            <LocalDate
              iso={user.joinedAt}
              options={{ day: "numeric", month: "long" }}
            />
          </div>
        )}
        {added && (
          <p role="status" className="mt-2 text-[13px] text-pine-haze">
            A new layer joined your stone.
          </p>
        )}
      </div>

      {/* layer log: takes the remaining height and scrolls inside itself */}
      <div className="relative flex min-h-0 flex-1 flex-col rounded-t-[28px] bg-porcelain pt-[22px]">
        {layers === null ? (
          <p className="px-6 pb-7 text-sm leading-relaxed text-stone">
            We couldn't load your layers just now.{" "}
            <Link href={routes.mica} className="font-semibold text-pine">
              Try again
            </Link>
          </p>
        ) : recent.length === 0 ? (
          <div className="px-6 pb-7">
            <p className="mb-4 text-sm leading-relaxed text-stone">
              Your stone begins with your first check-in. It only takes a
              minute.
            </p>
            <Button href={routes.checkIn}>Check in</Button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex shrink-0 items-center justify-between px-6">
              <div className="text-[15px] font-semibold">Recent layers</div>
              <div className="text-[13px] font-medium text-clay-deep">
                This week
              </div>
            </div>
            <ul className="no-scrollbar flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-6 pb-7">
              {recent.map((l) => {
                const mood = getMood(l.mood);
                return (
                  <li key={l.id} className="flex shrink-0 items-center gap-3">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full"
                      style={{ background: l.color }}
                    />
                    <div className="flex-1 truncate">
                      <span className="text-sm font-semibold">
                        {mood?.label}
                      </span>
                      {l.note && (
                        <span className="text-[13px] text-stone">
                          {" "}
                          · “{l.note}”
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-light">
                      <RelativeDay iso={l.createdAt} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
