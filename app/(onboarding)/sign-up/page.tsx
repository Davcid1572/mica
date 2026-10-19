import Link from "next/link";
import { AuthShell } from "@/components/ui/AuthShell";
import { signUp } from "@/app/actions/auth";
import { routes } from "@/lib/flow";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Begin gently"
      subtitle="Create your account. It's just for you."
      fields={[
        {
          label: "Name",
          name: "name",
          type: "text",
          placeholder: "What should we call you?",
          autoComplete: "given-name",
        },
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
          placeholder: "At least 8 characters",
          autoComplete: "new-password",
        },
      ]}
      submitLabel="Create account"
      action={signUp}
      footer={
        <>
          Already here?{" "}
          <Link href={routes.signIn} className="font-semibold text-pine">
            Sign in
          </Link>
        </>
      }
    />
  );
}
