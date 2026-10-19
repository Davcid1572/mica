import type { MicaLayer } from "@/lib/types";

/**
 * "Your Mica" — the signature generative stone.
 * Renders accreted check-in layers as concentric translucent discs.
 * The most recent layers sit on the outside, so the stone visibly grows
 * outward with every check-in.
 */
export function MicaStone({
  layers,
  size = 190,
  float = false,
}: {
  layers: MicaLayer[];
  size?: number;
  float?: boolean;
}) {
  // Oldest → innermost. Cap rings so the core stays visible.
  const ordered = [...layers].reverse();
  const ringCount = ordered.length;
  const step = (size / 2 - size * 0.06) / Math.max(ringCount, 1);

  return (
    <div
      className={`relative ${float ? "animate-float" : ""}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Your Mica: ${ringCount} layers`}
    >
      {/* soft aura */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -size * 0.5,
          background:
            "radial-gradient(circle, rgba(95,176,137,0.3), rgba(229,163,95,0.12) 50%, rgba(22,43,37,0) 72%)",
        }}
      />
      {ordered.map((layer, i) => {
        const inset = i * step;
        return (
          <div
            key={layer.id}
            className="absolute rounded-full"
            style={{
              inset,
              background: layer.color,
              opacity: 0.92,
            }}
          />
        );
      })}
      {/* light catch */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.18,
          height: size * 0.13,
          left: size * 0.28,
          top: size * 0.22,
          background: "rgba(255,255,255,0.35)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}
