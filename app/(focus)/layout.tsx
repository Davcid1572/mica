import { Suspense } from "react";
import { FrameFallback } from "@/components/ui/PageFallback";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<FrameFallback />}>{children}</Suspense>;
}
