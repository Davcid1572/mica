"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LeafMark } from "@/components/brand/Logo";
import { MicaStone } from "@/components/brand/MicaStone";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { StatusBar } from "@/components/ui/StatusBar";
import { micaLayers } from "@/lib/mock-data";
import { ONBOARDED_KEY } from "@/lib/onboarding";
import { routes } from "@/lib/flow";

const panes = [
  {
    eyebrow: "Welcome",
    title: "A quiet place to check in",
    body: "A few honest minutes with yourself, whenever you need them.",
    art: (
      <div className="grid h-[150px] w-[150px] place-items-center rounded-full bg-pine/10">
        <LeafMark size={76} tone="light" />
      </div>
    ),
  },
  {
    eyebrow: "Your Mica",
    title: "Watch your stone grow",
    body: "Every check-in adds a soft layer. No scores, just a picture of you over time.",
    art: <MicaStone layers={micaLayers.slice(0, 6)} size={150} float />,
  },
  {
    eyebrow: "Yours alone",
    title: "Private, and always yours",
    body: "MICA is a companion, not a therapist. If things feel like too much, a real person is always one tap away.",
    art: (
      <div className="grid h-[150px] w-[150px] place-items-center rounded-full bg-clay/15">
        <div className="grid h-[96px] w-[96px] place-items-center rounded-full bg-clay/25">
          <LeafMark size={52} tone="light" />
        </div>
      </div>
    ),
  },
];

export function OnboardingCarousel() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const last = i === panes.length - 1;

  function leave(dest: string) {
    try {
      localStorage.setItem(ONBOARDED_KEY, "1");
    } catch {}
    router.push(dest);
  }

  return (
    <Screen>
      <StatusBar tone="dark" />
      <div className="flex justify-end px-4">
        <button
          onClick={() => leave(routes.signUp)}
          className="h-11 px-3 text-[14px] text-stone"
        >
          Skip
        </button>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {panes.map((p, idx) => (
            <section
              key={p.title}
              aria-hidden={idx !== i}
              className="w-full shrink-0 px-7"
            >
              <div className="grid h-[210px] place-items-center">{p.art}</div>
              <div className="mb-2.5 mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-deep">
                {p.eyebrow}
              </div>
              <h1 className="font-serif text-[28px] font-normal leading-tight">
                {p.title}
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-stone">
                {p.body}
              </p>
            </section>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-7 bottom-6">
        <nav aria-label="Intro progress" className="mb-3 flex justify-center">
          {panes.map((p, idx) => (
            <button
              key={p.title}
              onClick={() => setI(idx)}
              aria-label={`Go to step ${idx + 1}`}
              aria-current={idx === i}
              className="grid h-11 w-7 place-items-center"
            >
              <span
                className={`h-2 rounded-full transition-all ${idx === i ? "w-5 bg-pine" : "w-2 bg-pine/25"}`}
              />
            </button>
          ))}
        </nav>
        <Button onClick={() => (last ? leave(routes.signUp) : setI(i + 1))}>
          {last ? "Get started" : "Continue"}
        </Button>
        <div className={`mt-1 text-center ${last ? "" : "invisible"}`}>
          <Link
            href={routes.signIn}
            onClick={() => {
              try {
                localStorage.setItem(ONBOARDED_KEY, "1");
              } catch {}
            }}
            className="inline-flex h-11 items-center text-[13px] font-semibold text-pine"
          >
            I already have an account
          </Link>
        </div>
      </div>
    </Screen>
  );
}
