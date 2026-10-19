import Link from "next/link";
import { AuthShell } from "@/components/ui/AuthShell";
import { signIn } from "@/app/actions/auth";
import { routes } from "@/lib/flow";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Pick up where you left off."
      fields={[
        {
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "you@example.com",
          autoComplete: "email",
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "Your password",
          autoComplete: "current-password",
        },
      ]}
      submitLabel="Sign in"
      action={signIn}
      aside={
        <Link
          href={routes.forgotPassword}
          className="inline-flex h-11 items-center text-[13px] font-semibold text-pine"
        >
          Forgot password?
        </Link>
      }
      footer={
        <>
          New here?{" "}
          <Link href={routes.signUp} className="font-semibold text-pine">
            Create an account
          </Link>
        </>
      }
    />
  );
}
