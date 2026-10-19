import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Splash } from "@/components/screens/Splash";
import { COOKIE } from "@/lib/auth/tokens";
import { routes } from "@/lib/flow";

export default async function SplashPage() {
  const jar = await cookies();
  if (jar.get(COOKIE.refresh)) redirect(routes.home);
  return <Splash />;
}
