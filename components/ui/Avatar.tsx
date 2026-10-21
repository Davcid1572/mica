export function Avatar({
  name,
  src,
  size = 42,
}: {
  name?: string;
  src?: string | null;
  size?: number;
}) {
  const box = { width: size, height: size };
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img src={src} alt="" className="rounded-full object-cover" style={box} />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="grid place-items-center rounded-full bg-gradient-to-br from-mood-growth to-clay font-semibold text-ink"
      style={{ ...box, fontSize: size * 0.38 }}
    >
      {name?.[0]?.toUpperCase() ?? "·"}
    </div>
  );
}
