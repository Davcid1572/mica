import { clsx } from "@/components/util";

/**
 * iOS-style status bar strip for screen headers.
 * `tone` flips text color for dark screens.
 */
export function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-porcelain" : "text-ink";
  const border = tone === "light" ? "border-porcelain" : "border-ink";
  return (
    <div className={clsx("flex h-11 items-center justify-between px-7 text-[13px] font-semibold", color)}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <div className={clsx("h-2.5 w-4 rounded-[3px] border-[1.5px]", border)} />
      </div>
    </div>
  );
}
