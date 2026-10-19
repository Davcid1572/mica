"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/flow";
import { clsx } from "@/components/util";

type Item = { href: string; label: string; icon: (active: boolean) => React.ReactNode };

const items: Item[] = [
  {
    href: routes.home,
    label: "Home",
    icon: (a) => <div className={clsx("h-5 w-5 rounded-md", a ? "bg-pine" : "bg-stone-light")} />,
  },
  {
    href: routes.mica,
    label: "Mica",
    icon: (a) => (
      <div className="relative h-5 w-5">
        <span className={clsx("absolute left-[3px] bottom-[1px] h-3.5 w-2 origin-bottom-right -rotate-[20deg] rounded-bl-full rounded-tr-full", a ? "bg-pine-glow" : "bg-stone-light")} />
        <span className={clsx("absolute right-[3px] bottom-[1px] h-3.5 w-2 origin-bottom-left rotate-[20deg] rounded-br-full rounded-tl-full", a ? "bg-clay" : "bg-stone-light")} />
      </div>
    ),
  },
  {
    href: routes.chat,
    label: "Chat",
    icon: (a) => <div className={clsx("h-[18px] w-5 rounded-lg rounded-bl-sm", a ? "bg-pine" : "bg-stone-light")} />,
  },
  {
    href: routes.library,
    label: "Library",
    icon: (a) => (
      <div className="flex items-end gap-0.5">
        <div className={clsx("h-3.5 w-[5px] rounded-sm", a ? "bg-pine" : "bg-stone-light")} />
        <div className={clsx("h-[18px] w-[5px] rounded-sm", a ? "bg-pine" : "bg-stone-light")} />
        <div className={clsx("h-2.5 w-[5px] rounded-sm", a ? "bg-pine" : "bg-stone-light")} />
      </div>
    ),
  },
  {
    href: routes.profile,
    label: "You",
    icon: (a) => <div className={clsx("h-5 w-5 rounded-full", a ? "bg-pine" : "bg-stone-light")} />,
  },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="absolute inset-x-0 bottom-0 flex h-[74px] items-start justify-between border-t border-stone-line bg-porcelain/90 px-6 pt-[11px] backdrop-blur">
      {items.map((it) => {
        const active = pathname === it.href || pathname.startsWith(it.href + "/");
        return (
          <Link key={it.href} href={it.href} className="flex flex-col items-center gap-1.5">
            {it.icon(active)}
            <span className={clsx("text-[10px]", active ? "font-semibold text-pine" : "text-stone-light")}>
              {it.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
