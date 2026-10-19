import Link from "next/link";
import { clsx } from "@/components/util";

type Variant = "primary" | "ghost" | "light";

const base =
  "inline-flex h-[54px] w-full items-center justify-center rounded-2xl text-base font-semibold transition active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-pine text-porcelain hover:bg-pine-soft",
  ghost: "border border-stone-line bg-transparent text-ink hover:bg-paper",
  light: "bg-porcelain text-ink hover:bg-paper",
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const cls = clsx(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
