"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Screen } from "@/components/ui/Screen";
import { ONBOARDED_KEY } from "@/lib/onboarding";
import { routes } from "@/lib/flow";

export function Splash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      let seen = false;
      try {
        seen = localStorage.getItem(ONBOARDED_KEY) === "1";
      } catch {}
      router.replace(seen ? routes.signIn : routes.onboarding);
    }, 1600);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <Screen tone="pineDeep">
      <div className="relative grid h-full place-items-center">
        <div
          className="absolute h-[320px] w-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(95,176,137,0.28), rgba(22,43,37,0) 70%)",
          }}
        />
        <div className="relative flex animate-fade-in flex-col items-center gap-4">
          <Logo tone="dark" size={36} />
          <p className="text-[13px] text-pine-haze">Check in with yourself</p>
        </div>
      </div>
    </Screen>
  );
}
