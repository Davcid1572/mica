import Link from "next/link";
import { AuthShell } from "@/components/ui/AuthShell";
import { forgotPassword } from "@/app/actions/auth";
import { routes } from "@/lib/flow";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Let's get you back in"
      subtitle="Enter your email and we'll send a reset link."
      fields={[
        {
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "you@example.com",
          autoComplete: "email",
        },
      ]}
      submitLabel="Send reset link"
      action={forgotPassword}
      footer={
        <Link href={routes.signIn} className="font-semibold text-pine">
          Back to sign in
        </Link>
      }
    />
  );
}
