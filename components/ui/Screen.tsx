import { clsx } from "@/components/util";

/**
 * Screen — a fixed phone-sized surface (320×680) that every page renders into.
 * Keeps the approved mobile proportions and centers the screen in the viewport
 * during development. In production you can drop the outer centering wrapper and
 * let the screen fill the device.
 */
export function Screen({
  children,
  tone = "porcelain",
  hasTabBar = false,
  className,
}: {
  children: React.ReactNode;
  tone?: "porcelain" | "pine" | "pineDeep" | "stone";
  hasTabBar?: boolean;
  className?: string;
}) {
  const bg = {
    porcelain: "bg-porcelain",
    pine: "bg-pine-deep",
    pineDeep: "bg-pine-deeper",
    stone: "bg-[#EFEAE1]",
  }[tone];

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-0 sm:p-6">
      <div
        className={clsx(
          "relative mx-auto h-screen w-full overflow-hidden sm:h-[680px] sm:w-[320px] sm:rounded-phone sm:border sm:border-stone-line sm:shadow-[0_24px_60px_-20px_rgba(33,65,58,0.28)]",
          bg,
          className,
        )}
      >
        <div className={clsx("no-scrollbar h-full overflow-y-auto", hasTabBar && "pb-[74px]")}>
          {children}
        </div>
      </div>
    </div>
  );
}
