import Link from "next/link";
import { StatusBar } from "@/components/ui/StatusBar";
import { Avatar } from "@/components/ui/Avatar";
import { signOut } from "@/app/actions/auth";
import { getProfile } from "@/lib/api/users";
import { micaLayers, journalEntries } from "@/lib/mock-data";
import { routes } from "@/lib/flow";

const rows = [
  { label: "Settings", href: routes.settings },
  { label: "Privacy & data", href: routes.settings },
  { label: "Notifications", href: routes.settings },
  { label: "Get support", href: routes.chat },
];

export default async function ProfilePage() {
  const user = await getProfile();

  const stats = [
    { value: user?.streakDays ?? 0, label: "Day streak" },
    { value: micaLayers.length, label: "Mica layers" },
    { value: journalEntries.length, label: "Journal entries" },
  ];

  return (
    <>
      <StatusBar tone="dark" />
      <div className="px-6 pt-2">
        <h1 className="mb-5 font-serif text-[28px] font-normal">You</h1>

        {/* identity */}
        <div className="mb-6 flex items-center gap-4">
          <Avatar name={user?.name} src={user?.avatarUrl} size={64} />
          <div className="min-w-0">
            <div className="truncate font-serif text-[22px]">
              {user?.name ?? "Your account"}
            </div>
            <div className="truncate text-[13px] text-stone-light">
              {user?.email ?? "We couldn't load your details just now."}
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-stone-line bg-white px-3 py-4 text-center"
            >
              <div className="font-serif text-[26px] text-pine">{s.value}</div>
              <div className="mt-0.5 text-[11px] leading-tight text-stone-light">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* menu */}
        <div className="overflow-hidden rounded-2xl border border-stone-line bg-white">
          {rows.map((r, i) => (
            <Link
              key={r.label}
              href={r.href}
              className={`flex items-center justify-between px-[18px] py-4 ${i > 0 ? "border-t border-stone-line" : ""}`}
            >
              <span className="text-[15px]">{r.label}</span>
              <span className="text-stone-light">›</span>
            </Link>
          ))}
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="mt-4 block h-11 w-full rounded-2xl text-center text-[15px] font-medium text-clay-deep"
          >
            Sign out
          </button>
        </form>
      </div>
    </>
  );
}
