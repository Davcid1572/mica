import { LeafMark } from "./Logo";

/**
 * MICA app icon — the leaf mark on the dark "stone" gradient.
 * Use for launch icon, splash, and avatar contexts.
 */
export function AppIcon({ size = 96 }: { size?: number }) {
  return (
    <div
      className="relative grid place-items-center overflow-hidden shadow-[0_14px_32px_-12px_rgba(24,48,42,0.55)]"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.24,
        background:
          "radial-gradient(120% 120% at 30% 18%, #24463D 0%, #18302A 74%)",
      }}
    >
      <LeafMark size={size * 0.6} tone="dark" />
    </div>
  );
}
