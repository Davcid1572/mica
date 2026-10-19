import { TabBar } from "@/components/ui/TabBar";

/**
 * Shell for all primary app screens.
 * Renders the page inside the phone surface and pins the TabBar.
 * Screens that should NOT show the tab bar (check-in, composers, threads)
 * live in their own routes and render their own full-screen surface instead.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-0 sm:p-6">
      <div className="relative mx-auto h-screen w-full overflow-hidden bg-porcelain sm:h-[680px] sm:w-[320px] sm:rounded-phone sm:border sm:border-stone-line sm:shadow-[0_24px_60px_-20px_rgba(33,65,58,0.22)]">
        <div className="no-scrollbar h-full overflow-y-auto pb-[74px]">{children}</div>
        <TabBar />
      </div>
    </div>
  );
}
