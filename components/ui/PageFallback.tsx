import { Screen } from "@/components/ui/Screen";
import { StatusBar } from "@/components/ui/StatusBar";

/** Full-frame placeholder for routes that render their own Screen. */
export function FrameFallback() {
  return (
    <Screen>
      <StatusBar tone="dark" />
    </Screen>
  );
}

/** In-panel placeholder for tab-bar screens. Static, no pulsing. */
export function PanelFallback() {
  return (
    <div aria-busy="true" className="px-6 pt-[54px]">
      <div className="mb-5 h-8 w-40 rounded-xl bg-stone-line/60" />
      <div className="mb-4 h-[120px] rounded-[24px] bg-stone-line/40" />
      <div className="h-[76px] rounded-[20px] bg-stone-line/40" />
    </div>
  );
}
