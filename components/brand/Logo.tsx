import { clsx } from "@/components/util";

/**
 * MICA wordmark — Concept C, the two-tone leaf (APPROVED).
 * Paths and colours sourced directly from public/brand/mica-mark.svg
 * and public/brand/mica-mark-light.svg so code and static assets stay in sync.
 *
 * `tone="light"` — for light/cream backgrounds (deep brand colours).
 * `tone="dark"`  — for dark surfaces (luminous variants).
 */
export function LeafMark({
  size = 48,
  tone = "light",
  className,
}: {
  size?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const cool = tone === "dark" ? "#5DCAA5" : "#0F6E56";
  const warm = "#D4915B";
  return (
    <svg
      width={size}
      height={size}
      viewBox="-55 -47.5 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M0,40 C0,15 -20,-10 -45,-10 C-45,15 -22,40 0,40 Z" fill={cool} />
      <path d="M0,40 C0,10 25,-15 55,-15 C55,15 30,40 0,40 Z" fill={warm} />
    </svg>
  );
}

export function Logo({
  tone = "light",
  size = 34,
  className,
}: {
  tone?: "light" | "dark";
  size?: number;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <LeafMark size={size * 1.4} tone={tone} />
      <span
        className={clsx(
          "font-serif tracking-[0.16em]",
          tone === "dark" ? "text-porcelain" : "text-ink",
        )}
        style={{ fontSize: size }}
      >
        MICA
      </span>
    </div>
  );
}
