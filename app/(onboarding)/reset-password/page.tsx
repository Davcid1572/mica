import Link from "next/link";
import { AuthShell } from "@/components/ui/AuthShell";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { StatusBar } from "@/components/ui/StatusBar";
import { resetPassword } from "@/app/actions/auth";
import { routes } from "@/lib/flow";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { token, email } = await searchParams;

  if (!token || !email) {
    return (
      <Screen>
        <StatusBar tone="dark" />
        <div className="px-7 pt-4">
          <h1 className="mt-7 font-serif text-[30px] font-normal leading-tight">
            This link looks incomplete
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-stone">
            Try opening it again from your email, or ask for a fresh one.
          </p>
        </div>
        <div className="absolute inset-x-7 bottom-9">
          <Button href={routes.forgotPassword}>Send a new link</Button>
        </div>
      </Screen>
    );
  }

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Make it one you'll remember."
      fields={[
        {
          label: "New password",
          name: "newPassword",
          type: "password",
          placeholder: "At least 8 characters",
          autoComplete: "new-password",
        },
        {
          label: "Confirm password",
          name: "confirmPassword",
          type: "password",
          placeholder: "Type it once more",
          autoComplete: "new-password",
        },
      ]}
      hidden={{ token, email }}
      submitLabel="Save password"
      action={resetPassword}
      footer={
        <Link href={routes.signIn} className="font-semibold text-pine">
          Back to sign in
        </Link>
      }
    />
  );
}
