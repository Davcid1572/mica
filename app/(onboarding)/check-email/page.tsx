import { LeafMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { StatusBar } from "@/components/ui/StatusBar";
import { routes } from "@/lib/flow";

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return (
    <Screen>
      <StatusBar tone="dark" />
      <div className="px-7 pt-4">
        <LeafMark size={44} tone="light" />
        <h1 className="mt-7 font-serif text-[30px] font-normal leading-tight">
          Check your inbox
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-stone">
          We sent a link to{" "}
          {email ? (
            <span className="font-semibold text-ink">{email}</span>
          ) : (
            "your email"
          )}
          . Open it to finish setting up, then come back and sign in.
        </p>
        <p className="mt-3 text-[13px] text-stone">
          Can't see it? Take a look in your spam folder.
        </p>
      </div>
      <div className="absolute inset-x-7 bottom-9">
        <Button href={routes.signIn}>Go to sign in</Button>
      </div>
    </Screen>
  );
}
